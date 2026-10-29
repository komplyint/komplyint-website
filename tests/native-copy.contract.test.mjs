import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read=path=>readFileSync(path,'utf8')
const sources={
 fi:[read('src/lib/commercial.ts'),read('src/lib/i18n-ui.ts')],
 en:[read('src/lib/commercial.ts'),read('src/lib/i18n-ui.ts')],
 sv:[read('src/lib/i18n-sv.ts'),read('src/lib/i18n-ui.ts')]
}
const rejected={
 fi:['ALOITETAAN SOPIVAN KOKOISESTI','Käytännöllistä digiapua. Selkeillä toimituksilla.','Selkeyttä työhön. Varmuutta toteutukseen.','Työvaihe, joka etenee','Ei keksittyjä referenssejä','Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.'],
 en:['START WITH SOMETHING MANAGEABLE','Clarity for your work. Care in every delivery.','No invented client stories','A workflow that moves forward','Your enquiry has been accepted for processing'],
 sv:['BÖRJA I LAGOM SKALA','Mer klarhet i arbetet. Trygghet i leveransen.','Även små problem förtjänar en bra lösning.','Inga påhittade referenser','Ett arbetsflöde som går framåt','Integritetsinformation']
}
const approved={
 fi:['Ohjelmistokehitystä, testausta ja toimivia integraatioita.','Ohjelmistokehitys, data ja digipalvelut samasta paikasta.','OTA YHTEYTTÄ','Kerro, missä tarvitset apua.','Esimerkit ovat kuvitteellisia','Lue tietosuojaseloste','Helsinki, Suomi'],
 en:['Software development, testing and reliable integrations.','Software delivery, analytics and digital services.','GET IN TOUCH','Tell us what you need help with.','These examples are fictional','Read our privacy notice','Helsinki, Finland'],
 sv:['Programutveckling, testning och fungerande integrationer.','Programutveckling, analys och digitala tjänster.','KONTAKTA OSS','Berätta vad ni behöver hjälp med.','Exemplen är fiktiva','Läs vår dataskyddsbeskrivning','Helsingfors, Finland']
}
for(const locale of ['fi','en','sv']){
 test(locale+': literal translationese cannot return',()=>{
  const text=sources[locale].join('\n')
  for(const phrase of rejected[locale])assert.equal(text.includes(phrase),false,locale+' still contains '+phrase)
 })
 test(locale+': approved business copy is retained',()=>{
  const text=sources[locale].join('\n')
  for(const phrase of approved[locale])assert.ok(text.includes(phrase),locale+' missing '+phrase)
 })
}
test('footer, contact privacy, feature summary and city use real localized copy',()=>{
 const page=read('src/app/page.tsx')
 const featured=read('src/components/FeaturedWork.tsx')
 const form=read('src/components/ContactForm.tsx')
 const ui=read('src/lib/i18n-ui.ts')
 const fi=read('src/lib/commercial.ts')
 const sv=read('src/lib/i18n-sv.ts')
 assert.ok(page.includes('t.footerDescription'))
 assert.ok(!page.includes('<p>{t.about.text}</p></div>'))
 assert.ok(featured.includes('f.summary'))
 assert.ok(form.includes('ui[lang].privacyLink'))
 assert.ok(ui.includes('privacyLink:string'))
 assert.ok(fi.includes('footerDescription:')&&sv.includes('footerDescription:'))
 assert.ok(page.includes('l.locationValue'))
})
test('SEO reflects idiomatic three-language page names',()=>{
 const meta=read('src/lib/route-meta.ts')
 for(const phrase of ['Dataskyddsbeskrivning','Example projects','Tietoa Komplyint Oy:stä'])assert.ok(meta.includes(phrase))
 assert.equal(meta.includes('Services and deliverables'),false)
})
