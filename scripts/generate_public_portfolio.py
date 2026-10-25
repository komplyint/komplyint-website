"""Build public Komplyint brochures from reviewed service records.
Outputs are reproducible PDFs and an integrity-checked ZIP for the public website.
Do not put the 127-item INTERNAL catalogue on the public website.
"""
from __future__ import annotations
import os
import json
import zipfile
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

OUT=Path("public/downloads")
OUT.mkdir(parents=True,exist_ok=True)
W,H=595.276,841.89
INK=colors.HexColor("#122A1D")
DEEP=colors.HexColor("#0D1E17")
PAPER=colors.HexColor("#F7F8F4")
MUTED=colors.HexColor("#526458")
GREEN=colors.HexColor("#124C35")
ACCENT=colors.HexColor("#9FCFA8")
RULE=colors.HexColor("#D5E3D9")
WHITE=colors.HexColor("#F8FCF5")

regular="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
serif="/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
if all(Path(f).exists() for f in (regular,bold,serif)):
    pdfmetrics.registerFont(TTFont("KRegular",regular))
    pdfmetrics.registerFont(TTFont("KBold",bold))
    pdfmetrics.registerFont(TTFont("KSerif",serif))
else:
    raise RuntimeError("Missing bundled OS fonts, cannot safely render Finnish content")

D={
"fi":{
"title":"Digipalvelut yrityksille",
"subtitle":"Data, automaatio ja ohjelmistoratkaisut",
"lead":"Pienetkin tekniset ongelmat vievät aikaa. Komplyint auttaa selkeyttämään raportointia, vähentämään käsityötä ja parantamaan olemassa olevien työkalujen toimivuutta.",
"kicker":"PALVELUESITE · SUOMI · 2026",
"overview":"Kuusi käytännöllistä palvelualuetta",
"overviewLead":"Valitsemme yhdessä tehtävään sopivan laajuuden. Kaikki toimeksiannot arvioidaan ja sovitaan erikseen.",
"tasks":"Tyypillisiä tehtäviä",
"deliverable":"Toimitus",
"limit":"Rajaus",
"approach":"Näin työ etenee",
"steps":[("01 / Kartoitus","Kuvaile nykyinen ongelma ja toivottu lopputulos."),("02 / Rajaus","Sovimme työn sisällön, hinnan, vastuut ja aikataulun."),("03 / Toteutus","Hyödynnämme olemassa olevia työkaluja ja testaamme ratkaisun."),("04 / Luovutus","Toimitamme sovitut tiedostot tai ohjelmiston sekä käyttöohjeet.")],
"contacts":"Kerro mitä haluat saada toimimaan paremmin",
"contactcopy":"Sähköpostitse voit kuvata tilanteen lyhyesti. Älä lähetä arkaluonteisia tietoja ensimmäisessä viestissä.",
"note":"Komplyint ei tällä hetkellä tarjoa vaatimustenmukaisuuskonsultointia. Tämä ei ole sertifiointi, tietoturva-auditointi eikä lupaus rajattomasta ylläpidosta.",
"services":[
("Excel, data ja raportointi","Excel-korjaukset, Power Query, tietojen yhdistäminen ja Power BI -raportointi.",["Excel-kaavat ja tiedostojen korjaus","Tietojen puhdistus ja yhdistäminen","Power BI -raportit ja päivitettävä raportointipohja"],"Toimiva tiedosto tai raportti, tarkistukset ja lyhyt käyttöohje.","Tietojen oikeellisuus, lisenssit ja käyttöoikeudet tarkistetaan ennen työtä."),
("Microsoft 365 ja automaatio","Sujuvammat toistuvat työvaiheet yrityksen omilla Microsoft-työkaluilla.",["Forms-, Lists- ja SharePoint-työvaiheet","Power Automate -ilmoitukset ja hyväksynnät","Teams-, Outlook- ja OneDrive-työnkulut"],"Rajattu toimiva automaatio, testaus ja ylläpito-ohje.","Lisenssit, oikeudet ja järjestelmien rajoitukset vaikuttavat toteutukseen."),
("Verkkosivut ja ylläpito","Pienet korjaukset ja sivustojen käytettävyyden kehittäminen.",["Sisältö- ja mobiilikäytettävyyskorjaukset","Yhteydenottolomakkeen ja navigaation testaus","Sovitut sivustopäivitykset"],"Sovitut muutokset sekä toimivuustarkistus.","Hosting, päivystys ja tietoturvavastuut sovitaan erikseen."),
("Pienet ohjelmistot ja integraatiot","Tarkoituksenmukaisia työkaluja ilman tarpeetonta laajuutta.",["Seuranta-, lomake- ja laskurityökalut","Rajatut verkkosovellukset","Soveltuviin rajapintoihin perustuvat integraatiot"],"Sovitut ominaisuudet, testit ja luovutustiedot.","Kriittiset järjestelmät ja laajat alustat edellyttävät erillistä arviota."),
("Ohjelmistotestaus ja laadunvarmistus","Verkkosivujen ja pienten sovellusten toiminnallisten ongelmien löytäminen.",["Toiminnallinen ja selainpohjainen testaus","Bugien toistaminen ja dokumentointi","Korjausten jälkitarkistus"],"Priorisoitu havaintolista ja testausyhteenveto.","Ei korvaa tietoturva-auditointia eikä takaa virheettömyyttä."),
("Digitaalinen toimistotuki","Asiakirja- ja raportointitehtäviä selkeällä toimitussisällöllä.",["PowerPoint- ja Word-pohjien viimeistely","Tiedostojen ja taulukkopohjien järjestäminen","Ohjeet, raportit ja yksinkertaiset dokumentit"],"Muokattavat tiedostot ja toimitustiedot.","Jatkuva assistenttityö ja henkilötiedot edellyttävät erillistä sopimista.")
]},
"en":{
"title":"Digital services for business",
"subtitle":"Data, automation and software solutions",
"lead":"Small technical problems consume real business time. Komplyint helps teams simplify reporting, reduce manual repetition and improve the tools they already use.",
"kicker":"SERVICE PORTFOLIO · ENGLISH · 2026",
"overview":"Six practical service areas",
"overviewLead":"We agree on a sensible scope for each project. Every engagement is assessed and quoted separately.",
"tasks":"Typical requests",
"deliverable":"Deliverable",
"limit":"Scope and limitations",
"approach":"How we work",
"steps":[("01 / Discover","Explain the current problem and the outcome you need."),("02 / Scope","Agree on deliverables, pricing, responsibilities and timing."),("03 / Implement","Reuse suitable tools, make improvements and verify functionality."),("04 / Handover","Receive the agreed files or software, plus practical usage notes.")],
"contacts":"Tell us what you need to make work better",
"contactcopy":"Send us a short description by email. Please do not send sensitive customer information in an initial enquiry.",
"note":"Komplyint does not currently provide compliance consulting. Our services do not imply certification, formal security auditing or unlimited maintenance.",
"services":[
("Excel, data & reporting","Clearer reporting, fewer spreadsheet errors and structured data.",["Excel formulas and workbook repair","Data cleaning and consolidation","Power BI dashboards and repeatable reporting"],"A functional report or file, verification and handover notes.","Data quality, permissions and licence requirements are confirmed first."),
("Microsoft 365 & automation","Make repeated business steps easier using tools your team already owns.",["Forms, Lists and SharePoint processes","Power Automate notifications and approvals","Teams, Outlook and OneDrive workflows"],"A scoped automation with functional tests and maintenance notes.","Available licences and permissions determine what can be automated."),
("Websites & maintenance","Useful updates and improvements to existing business websites.",["Content and mobile usability fixes","Contact-form and navigation verification","Agreed website updates"],"Defined improvements and functional checks.","Hosting, on-call availability and security responsibilities require agreement."),
("Small software & integrations","Focused internal tools and improvements, without unnecessary platform complexity.",["Internal trackers, forms and calculators","Scoped web applications","Integrations through suitable supported APIs"],"Agreed functionality, tests and deployment notes.","Critical integrations and enterprise systems need a separate assessment."),
("Software testing & QA","Make functional issues visible before release.",["Website and form functional tests","Reproduction and documentation of defects","Verification of fixes"],"Prioritised issue list and a test summary.","Not a security audit or a guarantee that software contains no defects."),
("Digital office support","Well-defined document and information-management tasks.",["PowerPoint and Word template preparation","Organising files and spreadsheet templates","Reports, instructions and simple documentation"],"Editable documents and clear handover.","Ongoing assistant work and personal data handling require separate agreement.")
]}
}

# Extend the original reviewed FI/EN ReportLab engine, not a parallel PDF renderer.
D['sv']=json.loads((Path(__file__).parent/'portfolio_sv.json').read_text(encoding='utf-8'))

def heading(c,text,y,size=29,color=INK,font="KSerif"):
    c.setFillColor(color);c.setFont(font,size);c.drawString(54,y,text)

def para(c,text,x,y,width,size=11,color=INK,leading=17,bold=False):
    style=ParagraphStyle("body",fontName="KBold" if bold else "KRegular",fontSize=size,leading=leading,textColor=color,spaceAfter=0,alignment=TA_LEFT)
    item=Paragraph(escape(text).replace("\n","<br/>"),style)
    _,h=item.wrap(width,1000)
    item.drawOn(c,x,y-h)
    return y-h

def top(c,n,kicker,t=None):
    t=t or {}
    c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(DEEP);c.rect(0,H-91,W,91,fill=1,stroke=0)
    c.setFont("KBold",17);c.setFillColor(WHITE);c.drawString(52,H-48,"KOMPLYINT")
    c.setFont("KRegular",8);c.setFillColor(ACCENT);c.drawRightString(W-51,H-46,t.get("strapline","DATA / AUTOMATION / SOFTWARE"))
    c.setStrokeColor(RULE);c.line(53,49,W-53,49)
    c.setFont("KRegular",8);c.setFillColor(MUTED)
    c.drawString(53,30,t.get("businessIdLine","Komplyint Oy · Y-tunnus / Business ID 3588595-3"))
    c.drawRightString(W-53,30,f"{n:02d} / 06")
    c.setFillColor(GREEN);c.setFont("KBold",9);c.drawString(54,H-126,kicker)

def cover(c,t):
    c.setFillColor(DEEP);c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(ACCENT);c.setFont("KBold",19);c.drawString(54,H-82,"KOMPLYINT OY")
    c.setStrokeColor(ACCENT);c.setLineWidth(1);c.line(54,H-105,W-54,H-105)
    c.setFillColor(WHITE);c.setFont("KSerif",30 if t["kicker"].startswith("SERVICE") else 34)
    y=H-255
    for line in t["title"].split(" / "):
        c.drawString(54,y,line);y-=46
    y=para(c,t["subtitle"],54,y-22,W-110,19,ACCENT,27)
    y=para(c,t["lead"],54,y-52,W-130,13,WHITE,21)
    c.setStrokeColor(colors.HexColor("#456957"))
    for i in range(4):
        x=54+i*130
        c.line(x,220,x+75,220)
        c.setFillColor(ACCENT);c.setFont("KRegular",8);c.drawString(x,198,f"0{i+1} / {t.get('deliveryLabel','DELIVERY')}")
    c.setFillColor(WHITE);c.setFont("KRegular",9);c.drawString(54,88,t["kicker"])
    c.drawString(54,65,"www.komplyint.fi   /   info@komplyint.fi")
    c.showPage()

def service_card(c,svc,n,x,y,w,h,lang):
    title,overview,tasks,delivery,limit=svc
    c.setFillColor(WHITE);c.roundRect(x,y-h,w,h,11,stroke=0,fill=1)
    c.setStrokeColor(RULE);c.roundRect(x,y-h,w,h,11,stroke=1,fill=0)
    c.setFillColor(GREEN);c.setFont("KBold",9);c.drawString(x+18,y-29,f"0{n}")
    yy=para(c,title,x+18,y-45,w-35,12.4,INK,18,True)
    para(c,overview,x+18,yy-9,w-36,9,MUTED,15)

def overview(c,t):
    top(c,2,t["kicker"],t);heading(c,t["overview"],H-177,27)
    para(c,t["overviewLead"],54,H-195,W-110,11,MUTED,18)
    w=(W-127)/2;h=157;gap=19
    for i,svc in enumerate(t["services"]):
        col=i%2;row=i//2
        x=54+col*(w+19);y=H-262-row*(h+gap)
        service_card(c,svc,i+1,x,y,w,h,"")
    c.showPage()

def detailed(c,t,lang,start,page):
    top(c,page,t["kicker"],t)
    heading(c,t["overview"],H-176,27)
    c.setStrokeColor(RULE)
    c.line(54,H-208,W-54,H-208)
    colw=(W-126)/2
    for offset in (0,1):
        i=start+offset
        title,overview,tasks,delivery,limit=t["services"][i]
        x=54+offset*(colw+18)
        y=H-248
        if offset:
            c.setStrokeColor(RULE)
            c.line(W/2,114,W/2,H-224)
        c.setFillColor(GREEN);c.setFont("KBold",10)
        c.drawString(x,y,f"{i+1:02d} / {t.get('serviceLabel','SERVICE')}")
        y=para(c,title,x,y-22,colw-14,15.2,INK,22,True)-11
        y=para(c,overview,x,y,colw-12,9.5,MUTED,15)-28
        c.setFillColor(GREEN);c.setFont("KBold",9)
        c.drawString(x,y,t["tasks"])
        y-=18
        for task in tasks:
            c.setFillColor(ACCENT);c.circle(x+4,y-2,2.5,fill=1,stroke=0)
            y=para(c,task,x+14,y+7,colw-24,9.5,INK,14)-11
        y-=9
        c.setFillColor(GREEN);c.setFont("KBold",9)
        c.drawString(x,y,t["deliverable"])
        y=para(c,delivery,x,y-8,colw-15,9.5,INK,14)-25
        c.setFillColor(GREEN);c.setFont("KBold",9)
        c.drawString(x,y,t["limit"])
        y=para(c,limit,x,y-8,colw-15,9.5,MUTED,14)-10
        if y<103:raise RuntimeError(f"Page {page} service {i+1} overflows footer at y={y}")
    c.showPage()

def finish(c,t):
    top(c,6,t["kicker"],t);heading(c,t["approach"],H-179,29)
    y=H-223
    for i,(name,description) in enumerate(t["steps"]):
        yy=y-i*99
        c.setStrokeColor(RULE);c.line(54,yy+7,W-54,yy+7)
        c.setFillColor(GREEN);c.setFont("KBold",12);c.drawString(54,yy-25,name)
        para(c,description,54,yy-35,W-110,10,MUTED,16)
    c.setFillColor(DEEP);c.roundRect(54,101,W-108,150,13,fill=1,stroke=0)
    para(c,t["contacts"],75,233,W-156,18,WHITE,21)
    para(c,t["contactcopy"],75,190,W-154,9.5,WHITE,15)
    c.setFillColor(ACCENT);c.setFont("KBold",14);c.drawString(75,128,"info@komplyint.fi")
    para(c,t["note"],54,91,W-110,8.3,MUTED,12)
    c.showPage()

def build(lang,out):
    t=D[lang]
    cv=canvas.Canvas(str(out),pagesize=(W,H),pageCompression=1)
    cv.setTitle("Komplyint Oy - "+t["title"])
    cv.setAuthor("Komplyint Oy")
    cv.setSubject(t.get("subject","Service portfolio, business delivery and scope"))
    cover(cv,t);overview(cv,t)
    for n,start in [(3,0),(4,2),(5,4)]:
        detailed(cv,t,lang,start,n)
    finish(cv,t)
    cv.save()

fi=OUT/"Komplyint_Palveluesite_FI.pdf"
en=OUT/"Komplyint_Service_Portfolio_EN.pdf"
sv=OUT/"Komplyint_Tjanstebroschyr_SV.pdf"
build("fi",fi);build("en",en);build("sv",sv)
with zipfile.ZipFile(OUT/"Komplyint_Service_Documents.zip","w",compression=zipfile.ZIP_DEFLATED) as z:
    for f in (fi,en,sv): z.write(f,f.name)
    z.writestr("README.txt","Komplyint Oy public service brochures in Finnish, English and Swedish (Finland). These are general illustrative service descriptions, not client case studies.\\nContact: info@komplyint.fi\\n")
with zipfile.ZipFile(OUT/"Komplyint_Service_Documents.zip") as z:
    if z.testzip() is not None: raise RuntimeError("Bad public ZIP")
    assert len([f for f in z.namelist() if f.endswith(".pdf")])==3, "All three language PDFs must be included"
print("Created",[(f.name, f.stat().st_size) for f in (fi,en,sv,OUT/"Komplyint_Service_Documents.zip")])
