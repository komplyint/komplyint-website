import type { Locale } from './i18n'

type Phase = { title:string; description:string }
type UI = {
  skip:string; navigation:string; close:string; categories:string; chooseService:string; serviceAreas:string
  languageSwitcher:string; noScriptNav:string; localeDraftWarning:string;serviceDetailLink:string
  appearance:string; dark:string; light:string; system:string; site:string; contact:string; downloadBrochures:string; locationName:string
  heroPrinciples:string; otherServices:string; before:string; after:string; aboutCompany:string; productDevelopment:string
  workTitle:string; workLead:string; aboutPageLabel:string; aboutPageTitle:string; whyUs:string; whyText:string; businessId:string; location:string; contactLabel:string
  accessibility:{label:string;title:string;lead:string;doing:string;doingText:string;feedback:string;feedbackText:string;review:string;reviewText:string}
  featured:{eyebrow:string;title:string;link:string;alt:string;imageAlt:string}
  video:{pause:string;play:string;pauseShort:string;playShort:string;blocked:string}
  brochures:{eyebrow:string;title:string;lead:string;both:string}
  form:{company:string;nameHint:string;companyHint:string;messageHint:string;invalid:string;rateLimited:string;unknown:string}
  serviceDetail:{artTitles:string[];services:string;overview:string;deliver:string;limits:string;method:string;touch:string;next:string;home:string;breadcrumb:string;service:string;graphic:string;phases:Phase[]}
}
export const ui:Record<Locale,UI>={
 fi:{
  skip:'Siirry sisältöön',navigation:'Päänavigaatio',close:'Sulje',categories:'Näytä palveluluokat',chooseService:'VALITSE PALVELU',serviceAreas:'Palvelualueet',
  languageSwitcher:'Valitse kieli',noScriptNav:'Päänavigaatio ilman JavaScriptiä',localeDraftWarning:'Lomakkeen keskeneräiset tiedot voivat hävitä. Vaihdetaanko kieli?',serviceDetailLink:'Lue lisää palvelusta',
  appearance:'Ulkoasu',dark:'Tumma',light:'Vaalea',system:'Järjestelmä',site:'Sivusto',contact:'Yhteys',downloadBrochures:'Lataa palveluesitteet (ZIP)',locationName:'Suomi · Euroopan unioni',
  heroPrinciples:'TYÖN PERIAATTEET',otherServices:'Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.',
  before:'LÄHTÖTILANNE',after:'TAVOITE',aboutCompany:'YRITYKSESTÄ',productDevelopment:'TUOTEKEHITYS',
  workTitle:'Näin ratkaisu voi toimia.',workLead:'Tässä esitetyt skenaariot kuvaavat mahdollisia toimituksia kuvitteellisilla tiedoilla.',
  aboutPageLabel:'YRITYS JA TOIMINTATAPA',aboutPageTitle:'Pienet ongelmat ansaitsevat hyvän ratkaisun.',
  whyUs:'MIKSI TOIMIMME NÄIN',whyText:'Kuuntelemme, rajaamme tehtävän, käytämme olemassa olevia työkaluja ja toimitamme selkeän lopputuloksen. Emme väitä asiakkaalle valmiiksi sellaista, mitä ei ole todistettu.',
  businessId:'Y-tunnus',location:'Sijainti',contactLabel:'Yhteys',
  accessibility:{label:'SAAVUTETTAVUUS',title:'Saavutettavuustiedot',lead:'Pyrimme tekemään palveluistamme saavutettavia ja ymmärrettäviä mahdollisimman monelle.',doing:'Mitä teemme',doingText:'Kehitämme näppäimistökäyttöä, luettavuutta, liikkeen hallintaa, lomakepalautetta ja responsiivisuutta. Säännölliset testit eivät yksin muodosta virallista vaatimustenmukaisuusvakuutusta.',feedback:'Palaute ja vaihtoehtoinen tapa',feedbackText:'Jos huomaat esteen tai tarvitset tietoa toisessa muodossa, kirjoita meille osoitteeseen',review:'Arvioinnin tila',reviewText:'Laaja WCAG 2.2 AA -arviointi on työn alla. Emme väitä virallista sertifiointia ennen asianmukaista tarkistusta.'},
  featured:{eyebrow:'HAVAINNOLLISTAVA DEMO',title:'Pienestä ongelmasta selkeään lopputulokseen.',link:'Tutustu esimerkkeihin',alt:'Alkuperäinen kuva tiedon jalostumisesta selkeäksi raportiksi, tumma vihreä, musta ja hillitty punainen',imageAlt:''},
  video:{pause:'Pysäytä taustavideo',play:'Toista taustavideo',pauseShort:'Pysäytä',playShort:'Toista',blocked:'Automaattinen toisto on estetty. Käynnistä video painikkeesta.'},
  brochures:{eyebrow:'LADATTAVAT PALVELUESITTEET',title:'Tutustu palveluihimme omassa tahdissasi.',lead:'Lataa suomen- tai englanninkielinen esite. Molemmat ovat saatavilla myös yhtenä ZIP-pakettina.',both:'Molemmat esitteet'},
  form:{company:'Yritys (valinnainen)',nameHint:'Nimesi',companyHint:'Yrityksen nimi',messageHint:'Kerro lyhyesti ongelma ja toivottu lopputulos.',invalid:'Tarkista lomakkeen tiedot ja korjaa merkityt kentät.',rateLimited:'Liikaa lähetysyrityksiä. Yritä myöhemmin tai lähetä sähköpostia osoitteeseen',unknown:'Viestin tilaa ei voitu vahvistaa. Älä lähetä samaa viestiä uudelleen ilman tarkistusta. Voit ottaa yhteyttä osoitteeseen'},
  serviceDetail:{artTitles:['Tietoa, johon voi luottaa','Työvaihe, joka etenee','Sivusto, jota on helppo käyttää','Työkalu juuri oikeaan tarpeeseen','Selkeä testihavainto','Viimeistelty ja käytettävä asiakirja'],
   services:'Palvelut',overview:'Mitä voimme tehdä',deliver:'Mitä saat',limits:'Mitä sovimme ennen aloitusta',method:'Näin etenemme',touch:'Kerro tarpeestasi',next:'Tutustu muihin palveluihin',home:'Etusivu',breadcrumb:'Murupolku',service:'PALVELU',graphic:'Abstrakti taitetun pinnan kuvio, joka kuvaa käytännön työnkulkua',
   phases:[{title:'Kuvaile tehtävä',description:'Selvitämme nykytilan, käytössä olevat työkalut ja toivotun lopputuloksen.'},{title:'Rajataan työ',description:'Sovimme tarkasti sisällön, hinnan, vastuut ja tarkistettavan lopputuloksen.'},{title:'Toteutus ja tarkistus',description:'Hyödynnämme ensisijaisesti olemassa olevia ratkaisuja ja testaamme toimituksen.'},{title:'Luovutus',description:'Saat tulokset sekä tarvittavat ylläpito- ja käyttöohjeet.'}]}
 },
 en:{
  skip:'Skip to content',navigation:'Main navigation',close:'Close',categories:'Show service categories',chooseService:'CHOOSE A SERVICE',serviceAreas:'Service areas',
  languageSwitcher:'Select language',noScriptNav:'Navigation without JavaScript',localeDraftWarning:'Your unsent form fields may be lost. Switch language?',serviceDetailLink:'View service detail',
  appearance:'Appearance',dark:'Dark',light:'Light',system:'System',site:'Explore',contact:'Get in touch',downloadBrochures:'Download service brochures (ZIP)',locationName:'Finland · European Union',
  heroPrinciples:'DELIVERY PRINCIPLES',otherServices:'Also available: software testing, quality assurance and digital office support.',
  before:'BEFORE',after:'AFTER',aboutCompany:'ABOUT OUR COMPANY',productDevelopment:'PRODUCT DEVELOPMENT',
  workTitle:'See how a solution can work.',workLead:'These scenarios show possible deliverables using fictional information.',
  aboutPageLabel:'COMPANY AND APPROACH',aboutPageTitle:'Small problems deserve thoughtful solutions.',whyUs:'OUR APPROACH',whyText:'We listen, scope the task, reuse suitable existing tools and deliver a clear outcome. We do not claim work as completed before it is evidenced.',
  businessId:'Business ID',location:'Location',contactLabel:'Contact',
  accessibility:{label:'ACCESSIBILITY',title:'Accessibility information',lead:'We work to make our website accessible and understandable to as many visitors as possible.',doing:'What we are doing',doingText:'We improve keyboard access, readable content, motion controls, form feedback and responsive layouts. Automated testing alone is not a formal accessibility conformance statement.',feedback:'Feedback and alternative contact',feedbackText:'If you encounter a barrier or need information in another format, contact',review:'Review status',reviewText:'A full WCAG 2.2 AA review is in progress. We do not claim certification without the necessary independent review.'},
  featured:{eyebrow:'ILLUSTRATIVE DEMONSTRATION',title:'From a small problem to a clearer outcome.',link:'Explore examples',alt:'Original illustration of scattered report data becoming a clear dashboard, in deep forest green, black and restrained red',imageAlt:''},
  video:{pause:'Pause background video',play:'Play background video',pauseShort:'Pause',playShort:'Play',blocked:'Autoplay is blocked. Use Play to start the film.'},
  brochures:{eyebrow:'DOWNLOAD SERVICE INFORMATION',title:'Explore our services in your own time.',lead:'Download a Finnish or English brochure, or get both in one ZIP package.',both:'Both brochures'},
  form:{company:'Company (optional)',nameHint:'Your name',companyHint:'Company name',messageHint:'Describe the problem and desired outcome.',invalid:'Please check the marked fields and correct your details.',rateLimited:'Too many requests. Please try later or email',unknown:'The request status is uncertain. Do not resubmit the same message without checking. You can contact'},
  serviceDetail:{artTitles:['Information you can rely on','A workflow that moves forward','A website that is easier to use','A tool for the specific task','Clear testing evidence','A document ready for real work'],
   services:'Services',overview:'What we can do',deliver:'What we deliver',limits:'What we agree before starting',method:'Our process',touch:'Discuss this service',next:'Explore all services',home:'Home',breadcrumb:'Breadcrumb',service:'SERVICE',graphic:'Abstract folded-plane graphic representing a practical workflow',
   phases:[{title:'Describe the task',description:'We review the current process, available tools and desired outcome.'},{title:'Agree a scope',description:'We agree on what will be delivered, the price, responsibilities and acceptance.'},{title:'Build and verify',description:'We reuse suitable existing solutions and test the agreed work.'},{title:'Handover',description:'You receive deliverables with practical usage and maintenance notes.'}]}
 },
 sv:{
  skip:'Hoppa till innehållet',navigation:'Huvudnavigation',close:'Stäng',categories:'Visa tjänstekategorier',chooseService:'VÄLJ EN TJÄNST',serviceAreas:'Tjänsteområden',
  languageSwitcher:'Välj språk',noScriptNav:'Navigation utan JavaScript',localeDraftWarning:'Uppgifter som du ännu inte har skickat kan gå förlorade. Vill du byta språk?',serviceDetailLink:'Läs mer om tjänsten',
  appearance:'Utseende',dark:'Mörkt',light:'Ljust',system:'Systeminställning',site:'Webbplatsen',contact:'Kontakt',downloadBrochures:'Ladda ner tjänstebroschyrer (ZIP)',locationName:'Finland · Europeiska unionen',
  heroPrinciples:'PRINCIPER FÖR LEVERANS',otherServices:'Vi erbjuder också programvarutestning, kvalitetssäkring och digitalt kontorsstöd.',
  before:'UTGÅNGSLÄGE',after:'MÅL',aboutCompany:'OM FÖRETAGET',productDevelopment:'PRODUKTUTVECKLING',
  workTitle:'Så här kan en lösning fungera.',workLead:'De här scenarierna visar möjliga leveranser med fiktiva uppgifter.',
  aboutPageLabel:'FÖRETAGET OCH ARBETSSÄTTET',aboutPageTitle:'Även små problem förtjänar en bra lösning.',whyUs:'VARFÖR VI ARBETAR SÅ HÄR',whyText:'Vi lyssnar, avgränsar uppdraget, återanvänder lämpliga verktyg och levererar ett tydligt resultat. Vi påstår inte att något är färdigt innan det har kunnat verifieras.',
  businessId:'FO-nummer',location:'Ort',contactLabel:'Kontakt',
  accessibility:{label:'TILLGÄNGLIGHET',title:'Tillgänglighetsinformation',lead:'Vi arbetar för att göra webbplatsen tillgänglig och begriplig för så många som möjligt.',doing:'Vad vi gör',doingText:'Vi förbättrar tangentbordsanvändning, läsbarhet, rörelsekontroller, formulärrespons och responsiv layout. Automatiserade tester är inte i sig en formell försäkran om överensstämmelse.',feedback:'Respons och alternativ kontakt',feedbackText:'Om du upptäcker ett hinder eller behöver information i annat format, skriv till',review:'Granskningsstatus',reviewText:'En fullständig granskning enligt WCAG 2.2 AA pågår. Vi gör inga anspråk på certifiering innan en lämplig oberoende granskning har utförts.'},
  featured:{eyebrow:'ILLUSTRATIV DEMONSTRATION',title:'Från ett litet problem till ett tydligare resultat.',link:'Se exempel',alt:'Originalillustration där spridda rapportuppgifter blir en tydlig översikt, i mörkgrönt, svart och dämpat rött',imageAlt:''},
  video:{pause:'Pausa bakgrundsvideon',play:'Spela upp bakgrundsvideon',pauseShort:'Pausa',playShort:'Spela upp',blocked:'Automatisk uppspelning är blockerad. Starta videon med knappen.'},
  brochures:{eyebrow:'LADDA NER TJÄNSTEINFORMATION',title:'Bekanta dig med våra tjänster i egen takt.',lead:'Ladda ner en broschyr på finska eller engelska. Båda finns också i ett ZIP-paket. Någon svensk PDF har ännu inte publicerats.',both:'Båda broschyrerna'},
  form:{company:'Företag (frivilligt)',nameHint:'Ditt namn',companyHint:'Företagets namn',messageHint:'Beskriv kort problemet och vilket resultat du önskar.',invalid:'Kontrollera uppgifterna och rätta de markerade fälten.',rateLimited:'För många försök. Försök igen senare eller skriv till',unknown:'Vi kunde inte bekräfta förfrågans status. Skicka inte samma meddelande på nytt innan du har kontrollerat. Du kan kontakta'},
  serviceDetail:{artTitles:['Information du kan lita på','Ett arbetsflöde som går framåt','En webbplats som är lättare att använda','Ett verktyg för rätt behov','Tydliga testresultat','Ett färdigt och användbart dokument'],
   services:'Tjänster',overview:'Vad vi kan göra',deliver:'Det här får du',limits:'Vad vi avtalar innan start',method:'Så här arbetar vi',touch:'Berätta om ditt behov',next:'Utforska alla tjänster',home:'Startsida',breadcrumb:'Sökväg',service:'TJÄNST',graphic:'Abstrakt illustration av en vikt yta som symboliserar ett praktiskt arbetsflöde',
   phases:[{title:'Beskriv uppdraget',description:'Vi går igenom nuläget, verktygen som används och det önskade resultatet.'},{title:'Avgränsa arbetet',description:'Vi avtalar om innehåll, pris, ansvar och det resultat som ska kontrolleras.'},{title:'Genomför och kontrollera',description:'Vi återanvänder i första hand befintliga lösningar och testar det överenskomna resultatet.'},{title:'Överlämna',description:'Du får resultatet tillsammans med nödvändiga anvisningar för användning och underhåll.'}]}
 }
}
