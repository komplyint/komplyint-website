"""Check actual PDF text against the exact exported website messages."""
import json
import re
import unicodedata
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
NAMES = {'fi':'Komplyint_Palveluesite_FI.pdf','en':'Komplyint_Service_Portfolio_EN.pdf','sv':'Komplyint_Tjanstebroschyr_SV.pdf'}

def normalized(value):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFC', value).replace('\u00ad', '')).strip()

def main():
    source = json.loads((ROOT/'.cache/public-portfolio.json').read_text(encoding='utf-8'))
    results=[]
    for lang,name in NAMES.items():
        reader=PdfReader(ROOT/'public/downloads'/name)
        text=normalized(' '.join(page.extract_text() or '' for page in reader.pages))
        expected=source['locales'][lang]
        if len(reader.pages)!=7:
            raise AssertionError(f'{lang}: expected seven pages')
        if reader.trailer['/Root'].get('/Lang') != expected['language']:
            raise AssertionError(f'{lang}: wrong PDF document language')
        phrases=[expected[key] for key in ['title','subtitle','lead','strapline','businessIdLine','overviewLead','contacts','contactcopy','note']]
        phrases.extend(part for step in expected['steps'] for part in step)
        for title,intro,tasks,delivery,limit in expected['services']:
            phrases.extend([title,intro,*tasks,delivery,limit])
        for phrase in phrases:
            if normalized(phrase) not in text:
                raise AssertionError(f'{lang}: website text missing from PDF: {phrase}')
        for phrase in (expected['consulting'][key] for key in ['title','lead','projectHeading','projectText','consultantHeading','consultantText','languageHeading','languageLead','languageNote','trainingHeading','trainingText']):
            if isinstance(phrase,str) and normalized(phrase) not in text:
                raise AssertionError(f'{lang}: consulting brochure text missing: {phrase}')
        results.append({'locale':lang,'pages':7,'matched_phrases':len(phrases),'result':'PASS'})
    target=ROOT/'document-preview'
    target.mkdir(exist_ok=True)
    evidence={'schema':'komplyint-portfolio-copy-parity.v1','results':results,'sourceHashes':source['sourceHashes'],'independent_native_review':'NOT_RECORDED'}
    (target/'copy-parity-evidence.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'result':'PASS','verified_phrases':sum(r['matched_phrases'] for r in results),'languages':list(NAMES)}))

if __name__=='__main__':
    main()
