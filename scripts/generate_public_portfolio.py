"""Reuse the ReportLab portfolio with the website's FI/EN/SV copy.

First run: node scripts/export-public-portfolio.mjs
The source fingerprints are checked before any public output is replaced.
"""
from __future__ import annotations
import hashlib
import json
import os
from html import escape
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/downloads'
W, H = 595.276, 841.89
INK, DEEP = colors.HexColor('#171B1F'), colors.HexColor('#101418')
PAPER, MUTED = colors.HexColor('#F7F6F2'), colors.HexColor('#536068')
GREEN, ACCENT = colors.HexColor('#124C35'), colors.HexColor('#A4DDBA')
RULE, WHITE = colors.HexColor('#D6DBD8'), colors.HexColor('#FFFFFF')
NAMES = {'fi':'Komplyint_Palveluesite_FI.pdf', 'en':'Komplyint_Service_Portfolio_EN.pdf', 'sv':'Komplyint_Tjanstebroschyr_SV.pdf'}
SOURCES = {'src/lib/commercial.ts','src/lib/i18n-sv.ts','src/lib/i18n-ui.ts','src/lib/i18n.ts','src/lib/business-offers.ts'}
for name, filename in [('KRegular','DejaVuSans.ttf'),('KBold','DejaVuSans-Bold.ttf'),('KSerif','DejaVuSerif.ttf')]:
    path = Path('/usr/share/fonts/truetype/dejavu') / filename
    if not path.is_file():
        raise RuntimeError('Missing the original portfolio font: ' + filename)
    pdfmetrics.registerFont(TTFont(name, str(path)))


def load_copy(path: Path) -> dict:
    payload = json.loads(path.read_text(encoding='utf-8'))
    if payload.get('schema') != 'komplyint-public-portfolio.v3':
        raise ValueError('Run the canonical website copy exporter first')
    if set(payload.get('sourceHashes', {})) != SOURCES:
        raise ValueError('Missing canonical source fingerprints')
    for filename, expected in payload['sourceHashes'].items():
        actual = hashlib.sha256((ROOT / filename).read_bytes()).hexdigest()
        if actual != expected:
            raise ValueError('Stale brochure source: ' + filename)
    data = payload['locales']
    if set(data) != set(NAMES):
        raise ValueError('All three website languages are required')
    for lang, value in data.items():
        if len(value['services']) != 6 or len(value['steps']) != 4:
            raise ValueError('Incomplete service catalogue: ' + lang)
        if len(value.get('business',{}).get('packages',[])) != 6 or len(value['business'].get('services',[])) != 27:
            raise ValueError('Missing expanded trilingual business catalogue: '+lang)
        if len(value.get('capabilities',{}).get('stack',[])) != 12:
            raise ValueError('Missing featured full-stack engineer skills: '+lang)
        for key in ['title','kicker','overview','serviceLabel','strapline','businessIdLine','subject','deliveryLabel','email']:
            if not isinstance(value.get(key), str) or not value[key].strip():
                raise ValueError('Missing translated label: ' + lang + '/' + key)
    return data


def para(c, text, x, y, width, size=11, color=INK, leading=17, bold=False, font=None):
    style = ParagraphStyle('body', fontName=font or ('KBold' if bold else 'KRegular'), fontSize=size, leading=leading, textColor=color)
    item = Paragraph(escape(text).replace('\n','<br/>'), style)
    _, height = item.wrap(width, 1000)
    item.drawOn(c, x, y-height)
    return y-height


def top(c, number, t):
    c.setFillColor(PAPER); c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(DEEP); c.rect(0,H-91,W,91,fill=1,stroke=0)
    c.setFillColor(WHITE); c.setFont('KBold',17); c.drawString(52,H-48,'KOMPLYINT')
    c.setFillColor(ACCENT); c.setFont('KRegular',8); c.drawRightString(W-51,H-46,t['strapline'])
    c.setStrokeColor(RULE); c.line(53,49,W-53,49)
    c.setFillColor(MUTED); c.setFont('KRegular',8); c.drawString(53,30,t['businessIdLine'])
    c.drawRightString(W-53,30,f'{number:02d} / 10')
    c.setFillColor(GREEN); c.setFont('KBold',9); c.drawString(54,H-126,t['kicker'])


def cover(c, t):
    c.setFillColor(DEEP); c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(ACCENT); c.setFont('KBold',19); c.drawString(54,H-82,'KOMPLYINT OY')
    c.setStrokeColor(ACCENT); c.line(54,H-105,W-54,H-105)
    y = para(c,t['title'],54,H-215,W-108,32,WHITE,40,font='KSerif')
    y = para(c,t['subtitle'],54,y-28,W-110,19,ACCENT,27)
    y = para(c,t['lead'],54,y-30,W-120,12,WHITE,19)
    if y < 305:
        raise RuntimeError('Cover copy exceeds reserved space for full-stack highlight')
    feature=t['capabilities']
    para(c,feature['fullstackTitle']+'  /  '+feature['fullstackSubtitle'],54,min(y-21,300),W-108,13,ACCENT,19,True)
    c.setStrokeColor(colors.HexColor('#456957'))
    for i in range(4):
        x = 54+i*125
        c.line(x,220,x+75,220)
        c.setFillColor(ACCENT); c.setFont('KRegular',8)
        c.drawString(x,198,f'{i+1:02d}')
    c.setFillColor(WHITE); c.setFont('KRegular',9); c.drawString(54,88,t['kicker'])
    c.drawString(54,65,'www.komplyint.fi   /   '+t['email'])
    c.linkURL('https://www.komplyint.fi', (54,60,160,78), relative=0)
    c.linkURL('mailto:'+t['email'], (170,60,330,78), relative=0)
    c.showPage()


def service_card(c, service, index, x, y, width, height, url):
    title, intro, _, _, _ = service
    c.setFillColor(WHITE); c.setStrokeColor(RULE)
    c.roundRect(x,y-height,width,height,11,fill=1,stroke=1)
    c.setFillColor(GREEN); c.setFont('KBold',9); c.drawString(x+18,y-29,f'{index:02d}')
    bottom = para(c,title,x+18,y-45,width-35,12.4,INK,18,True)
    bottom = para(c,intro,x+18,bottom-9,width-36,8.8,MUTED,13.7)
    if bottom < y-height+10:
        raise RuntimeError(f'Service overview card {index} clips text')
    c.linkURL(url,(x,y-height,x+width,y),relative=0)


def overview(c, t):
    top(c,2,t)
    y = para(c,t['overview'],54,H-151,W-108,27,INK,33,font='KSerif')
    y = para(c,t['overviewLead'],54,y-12,W-110,10.5,MUTED,16)
    grid_top = min(H-252,y-24)
    width, height, gap = (W-127)/2, 163, 10
    for i,service in enumerate(t['services']):
        x = 54+(i%2)*(width+19)
        y = grid_top-(i//2)*(height+gap)
        if y-height < 65:
            raise RuntimeError('Overview grid overlaps footer')
        service_card(c,service,i+1,x,y,width,height,t['serviceUrls'][i])
    c.showPage()


def detailed(c, t, start, page):
    top(c,page,t)
    para(c,t['overview'],54,H-150,W-108,27,INK,33,font='KSerif')
    c.setStrokeColor(RULE); c.line(54,H-208,W-54,H-208)
    colw = (W-126)/2
    for offset in (0,1):
        i = start+offset
        title,intro,tasks,delivery,limit = t['services'][i]
        x,y = 54+offset*(colw+18),H-240
        if offset:
            c.setStrokeColor(RULE); c.line(W/2,103,W/2,H-224)
        c.setFillColor(GREEN); c.setFont('KBold',10); c.drawString(x,y,f'{i+1:02d} / '+t['serviceLabel'])
        y = para(c,title,x,y-19,colw-14,15.2,INK,22,True)-10
        y = para(c,intro,x,y,colw-12,9.5,MUTED,15)-20
        y = para(c,t['tasks'],x,y,colw-14,9,GREEN,13,True)-8
        for task in tasks:
            c.setFillColor(ACCENT); c.circle(x+4,y-7,2.5,fill=1,stroke=0)
            y = para(c,task,x+14,y,colw-24,9.5,INK,14)-9
        y = para(c,t['deliverable'],x,y-5,colw-14,9,GREEN,13,True)-7
        y = para(c,delivery,x,y,colw-15,9.5,INK,14)-18
        y = para(c,t['limit'],x,y,colw-14,9,GREEN,13,True)-7
        y = para(c,limit,x,y,colw-15,9.5,MUTED,14)
        if y < 76:
            raise RuntimeError(f'Page {page}, service {i+1}: footer overflow at {y}')
    c.showPage()




def engineering_page(c, t):
    """Actual buyer problems and delivery approaches, not a skills billboard."""
    top(c,6,t)
    v=t['capabilities']
    y=para(c,v['title'],54,H-152,W-108,26,INK,31,font='KSerif')
    y=para(c,v['lead'],54,y-10,W-108,9.2,MUTED,14)
    grid_top=min(y-20,H-284)
    width=(W-126)/2
    height=219
    gap=14
    if grid_top-(height*2+gap) < 90:
        raise RuntimeError('Buyer problem page introduction is too long')
    for i,case in enumerate(v['problems']):
        col,row=i%2,i//2
        x=54+col*(width+18)
        top_y=grid_top-row*(height+gap)
        bottom=top_y-height
        dark=i==0
        c.setFillColor(DEEP if dark else WHITE)
        c.setStrokeColor(colors.HexColor('#43534C') if dark else RULE)
        c.roundRect(x,bottom,width,height,9,fill=1,stroke=1)
        ink=WHITE if dark else INK
        body=colors.HexColor('#DBE2DD') if dark else MUTED
        accent=ACCENT if dark else GREEN
        c.setFillColor(accent);c.setFont('KBold',8)
        c.drawString(x+14,top_y-19,f'{i+1:02d}')
        yy=para(c,case['title'],x+14,top_y-29,width-28,11.3,ink,15,True)-7
        yy=para(c,case['problem'],x+14,yy,width-28,8.2,body,11.4)-10
        c.setStrokeColor(colors.HexColor('#40514A') if dark else RULE)
        c.line(x+14,yy+4,x+width-14,yy+4)
        yy=para(c,case['solution'],x+14,yy-8,width-28,8.35,ink,11.6)-8
        yy=para(c,case['outcome'],x+14,yy,width-28,8.1,accent,11.1,True)
        if yy < bottom+9:
            raise RuntimeError(f'Buyer problem card {t["language"]}/{i+1} overflows by {round(bottom+9-yy,1)} pt')
    c.showPage()


def consulting_page(c, t):
    """Dedicated specialist/engagement page; all descriptions come from localized website content."""
    top(c,7,t)
    e=t['consulting']
    y=para(c,e['title'],54,H-151,W-108,26,INK,33,font='KSerif')
    y=para(c,e['lead'],54,y-12,W-108,10,MUTED,16)
    if y < H-265:
        raise RuntimeError('Consulting page introduction exceeds its allotted region')
    gap=18
    card_width=(W-126)/2
    top_y=H-275
    for index,(heading,description) in enumerate([
        (e['projectHeading'],e['projectText']),
        (e['consultantHeading'],e['consultantText']),
    ]):
        x=54+index*(card_width+gap)
        c.setFillColor(WHITE);c.setStrokeColor(RULE)
        c.roundRect(x,top_y-168,card_width,168,10,fill=1,stroke=1)
        c.setFillColor(GREEN);c.setFont('KBold',9)
        c.drawString(x+16,top_y-25,f'{index+1:02d}')
        card_y=para(c,heading,x+16,top_y-40,card_width-32,12.8,INK,18,True)
        card_y=para(c,description,x+16,card_y-9,card_width-32,9,MUTED,14)
        if card_y < top_y-158:
            raise RuntimeError('Consulting engagement card overflows')
    y=para(c,e['languageHeading'],54,H-490,W-108,16,INK,23,True)
    y=para(c,e['languageLead'],54,y-12,W-108,10,MUTED,16)
    y=para(c,e['languageNote'],54,y-10,W-108,8.6,MUTED,13)
    if y < 160:
        raise RuntimeError('Working-language description overlaps professional development')
    c.setStrokeColor(RULE);c.line(54,155,W-54,155)
    y=para(c,e['trainingHeading'],54,141,W-108,12,GREEN,18,True)
    y=para(c,e['trainingText'],54,y-7,W-108,9,MUTED,14)
    if y < 61:
        raise RuntimeError('Professional development copy overlaps PDF footer')
    c.showPage()



def business_packages_page(c, t):
    """Six outcome-led buyer packages, generated from the same site dictionary."""
    top(c, 8, t)
    v=t['business']
    y=para(c,v['packageTitle'],54,H-151,W-108,25,INK,32,font='KSerif')
    y=para(c,v['packageIntro'],54,y-9,W-108,9.6,MUTED,15)
    grid_top=min(H-249,y-22)
    width=(W-126)/2
    height,gap=139,11
    for i,offer in enumerate(v['packages']):
        col,row=i%2,i//2
        x=54+col*(width+18)
        top_y=grid_top-row*(height+gap)
        bottom=top_y-height
        if bottom<109:
            raise RuntimeError(f'Business package {t["language"]}/{i+1}: footer overlap {bottom:.1f}')
        c.setFillColor(WHITE if i%2 else colors.HexColor('#EEF3EF'))
        c.setStrokeColor(RULE)
        c.roundRect(x,bottom,width,height,10,fill=1,stroke=1)
        c.setFillColor(GREEN)
        c.setFont('KBold',8)
        c.drawString(x+14,top_y-19,f'{i+1:02d}')
        yy=para(c,offer['name'],x+14,top_y-31,width-27,11.3,INK,16,True)-8
        yy=para(c,offer['description'],x+14,yy,width-27,9.1,MUTED,13.7)
        if yy<bottom+11:
            raise RuntimeError(f'Business package {t["language"]}/{i+1} clips by {bottom+11-yy:.1f}pt')
        c.linkURL('https://www.komplyint.fi'+('' if t['language']=='fi' else '/'+t['language'][:2])+'/services/'+offer['route'],(x,bottom,x+width,top_y),relative=0)
    para(c,v['toolsIntro'],54,100,W-108,8.2,MUTED,12.5)
    c.showPage()


def business_services_page(c, t):
    """Four customer-process areas with 27 selectable service examples."""
    top(c, 9, t)
    v=t['business']
    y=para(c,v['tasksTitle'],54,H-149,W-108,25,INK,31,font='KSerif')
    y=para(c,v['tasksIntro'],54,y-9,W-108,9.3,MUTED,14)
    grid_top=min(H-241,y-19)
    width=(W-126)/2
    panels=[('analytics',0,0),('processes',1,0),('operations',0,1),('workplace',1,1)]
    upper_height=272
    lower_height=185
    gap=13
    for area,col,row in panels:
        x=54+col*(width+18)
        top_y=grid_top if row==0 else grid_top-upper_height-gap
        height=upper_height if row==0 else lower_height
        bottom=top_y-height
        if bottom<81:
            raise RuntimeError('Service groups exceed page height: '+t['language']+'/'+area)
        c.setFillColor(WHITE)
        c.setStrokeColor(RULE)
        c.roundRect(x,bottom,width,height,9,fill=1,stroke=1)
        yy=para(c,v['areas'][area],x+12,top_y-13,width-24,11.2,GREEN,15,True)-10
        offers=[item for item in v['services'] if item['area']==area]
        for item in offers:
            c.setFillColor(GREEN)
            c.circle(x+16,yy-5,1.6,fill=1,stroke=0)
            yy=para(c,item['name'],x+25,yy,width-37,8.55,INK,12)-6
        if yy < bottom+9:
            raise RuntimeError(f'Service group {t["language"]}/{area} clipped by {bottom+9-yy:.1f}pt')
    # Platform breadth is already searchable in the website; brochure points there
    # rather than promising immediate proficiency in every named tool.
    c.setFillColor(GREEN)
    c.setFont('KBold',8.3)
    c.drawString(54,80,'www.komplyint.fi/services')
    c.linkURL('https://www.komplyint.fi/services',(54,73,254,91),relative=0)
    c.showPage()


def finish(c, t):
    top(c,10,t)
    para(c,t['approach'],54,H-151,W-108,27,INK,33,font='KSerif')
    for i,(name,description) in enumerate(t['steps']):
        y = H-210-i*83
        c.setStrokeColor(RULE); c.line(54,y+7,W-54,y+7)
        y = para(c,name,54,y-8,W-110,12,GREEN,17,True)
        y = para(c,description,54,y-8,W-110,10,MUTED,15)
        if y < 282:
            raise RuntimeError('Process text overlaps contact panel')
    c.setFillColor(DEEP); c.roundRect(54,128,W-108,145,13,fill=1,stroke=0)
    y = para(c,t['contacts'],75,256,W-156,18,WHITE,22)
    y = para(c,t['contactcopy'],75,y-10,W-154,9.5,WHITE,15)
    if y < 164:
        raise RuntimeError('Contact note overlaps email link')
    c.setFillColor(ACCENT); c.setFont('KBold',14); c.drawString(75,147,t['email'])
    c.linkURL('mailto:'+t['email'],(75,141,W-75,163),relative=0)
    y = para(c,t['note'],54,110,W-110,8.3,MUTED,12)
    if y < 56:
        raise RuntimeError('Scope note overlaps footer')
    c.showPage()


def build(lang, t, path):
    cv = canvas.Canvas(str(path),pagesize=(W,H),pageCompression=1,invariant=1)
    cv.setTitle('Komplyint Oy - '+t['title']); cv.setAuthor('Komplyint Oy')
    cv.setSubject(t['subject']); cv._doc.Catalog.Lang = PDFString(t['language'])
    cover(cv,t); overview(cv,t)
    for page,start in [(3,0),(4,2),(5,4)]:
        detailed(cv,t,start,page)
    engineering_page(cv,t)
    consulting_page(cv,t)
    business_packages_page(cv,t)
    business_services_page(cv,t)
    finish(cv,t); cv.save()


def main():
    data = load_copy(Path(os.environ.get('PORTFOLIO_COPY',ROOT/'.cache/public-portfolio.json')))
    OUT.mkdir(parents=True,exist_ok=True)
    for lang,name in NAMES.items():
        build(lang,data[lang],OUT/name)
    readme = '\n\n'.join(data[lang]['kicker']+'\n'+data[lang]['title']+'\n'+data[lang]['note'] for lang in NAMES)
    readme += '\n\nKomplyint Oy\ninfo@komplyint.fi\nhttps://www.komplyint.fi\n'
    archive_path = OUT/'Komplyint_Service_Documents.zip'
    with ZipFile(archive_path,'w',compression=ZIP_DEFLATED) as archive:
        for name in [*NAMES.values(),'README.txt']:
            entry = ZipInfo(name,date_time=(2026,1,1,0,0,0)); entry.compress_type=ZIP_DEFLATED
            archive.writestr(entry,readme.encode('utf-8') if name=='README.txt' else (OUT/name).read_bytes())
    with ZipFile(archive_path) as archive:
        assert archive.testzip() is None
        assert len([name for name in archive.namelist() if name.endswith('.pdf')]) == 3
    print(json.dumps({'result':'PASS','languages':list(NAMES),'pages':30,'copy':'canonical website dictionaries'},ensure_ascii=False))


if __name__ == '__main__':
    main()
