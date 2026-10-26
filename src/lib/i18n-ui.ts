import type { Locale } from './i18n'

type Phase = { title:string; description:string }
type UI = {
  logoHome:string; privacyLink:string; skip:string; navigation:string; close:string; categories:string; chooseService:string; serviceAreas:string
  languageSwitcher:string; noScriptNav:string; localeDraftWarning:string;serviceDetailLink:string
  appearance:string; dark:string; light:string; system:string; site:string; contact:string; downloadBrochures:string; locationName:string; locationValue:string
  heroPrinciples:string; otherServices:string; before:string; after:string; aboutCompany:string; productDevelopment:string
  workTitle:string; workLead:string; aboutPageLabel:string; aboutPageTitle:string; whyUs:string; whyText:string; businessId:string; location:string; contactLabel:string
  accessibility:{label:string;title:string;lead:string;doing:string;doingText:string;feedback:string;feedbackText:string;review:string;reviewText:string}
  featured:{eyebrow:string;title:string;link:string;alt:string;imageAlt:string;summary:string}
  video:{pause:string;play:string;pauseShort:string;playShort:string;blocked:string}
  brochures:{eyebrow:string;title:string;lead:string;both:string}
  form:{company:string;nameHint:string;companyHint:string;messageHint:string;invalid:string;rateLimited:string;unknown:string;nameError:string;companyError:string;emailError:string;serviceError:string;messageError:string}
  errors:{eyebrow:string;title:string;body:string;retry:string;home:string}
  notFound:{eyebrow:string;title:string;body:string;home:string}
  serviceDetail:{artTitles:string[];services:string;overview:string;deliver:string;limits:string;method:string;touch:string;next:string;home:string;breadcrumb:string;service:string;graphic:string;phases:Phase[]}
}
export const ui:Record<Locale,UI>={
 fi:{
  logoHome:'Komplyint Oy – etusivu',privacyLink:'Lue tietosuojaseloste',
  skip:'Siirry sisältöön',navigation:'Päänavigaatio',close:'Sulje',categories:'Näytä palveluluokat',chooseService:'VALITSE PALVELU',serviceAreas:'Palvelualueet',
  languageSwitcher:'Sivuston kieli',noScriptNav:'Sivuston valikko',localeDraftWarning:'Lomakkeen keskeneräiset tiedot voivat hävitä. Vaihdetaanko kieli?',serviceDetailLink:'Tutustu palveluun',
  appearance:'Ulkoasu',dark:'Tumma',light:'Vaalea',system:'Laitteen asetus',site:'Sivusto',contact:'Yhteystiedot',downloadBrochures:'Lataa palveluesitteet ZIP-tiedostona',locationName:'Suomi',locationValue:'Helsinki, Suomi',
  heroPrinciples:'NÄIN TOIMIMME',otherServices:'Etkö löytänyt sopivaa palvelua? Kerro, millaisessa tehtävässä tarvitset apua.',
  before:'NYKYTILANNE',after:'MAHDOLLINEN RATKAISU',aboutCompany:'YRITYKSESTÄ',productDevelopment:'TUOTEKEHITYS',
  workTitle:'Esimerkkejä mahdollisista ratkaisuista.',workLead:'Esimerkit ovat kuvitteellisia. Ne näyttävät, miten vastaavia tehtäviä voisi ratkaista.',
  aboutPageLabel:'YRITYS',aboutPageTitle:'Pieneenkin digiongelmaan voi löytyä toimiva ratkaisu.',
  whyUs:'NÄIN TEEMME TYÖTÄ',whyText:'Käymme tarpeen läpi yhdessä, sovimme työn sisällöstä ja testaamme valmiin toteutuksen. Kerromme selkeästi, mitä palveluun kuuluu ja mitä ei.',
  businessId:'Y-tunnus',location:'Sijainti',contactLabel:'Yhteystiedot',
  accessibility:{label:'SAAVUTETTAVUUS',title:'Saavutettavuustiedot',lead:'Kehitämme verkkosivustoa, jotta sitä olisi mahdollisimman helppo käyttää.',doing:'Mitä teemme',doingText:'Parannamme sivuston näppäimistökäyttöä, luettavuutta, liikkeen hallintaa, lomakkeiden palautetta ja mobiilikäyttöä. Automaattiset testit eivät yksin riitä kattavaan saavutettavuusarviointiin.',feedback:'Palaute ja vaihtoehtoinen tapa',feedbackText:'Jos sivuston käyttö on hankalaa tai tarvitset tiedot muussa muodossa, ota yhteyttä osoitteeseen',review:'Arvioinnin tila',reviewText:'Sivuston saavutettavuutta ei ole vielä arvioitu kokonaisuudessaan WCAG 2.2 AA -kriteerien mukaan.'},
  featured:{eyebrow:'KUVITTEELLINEN ESIMERKKI',title:'Näin raportointia voisi helpottaa.',link:'Tutustu esimerkkeihin',alt:'Kuvitus, jossa useasta tiedostosta kootaan selkeä raportti',imageAlt:'',summary:'Kuvitellussa esimerkissä useasta Excel-tiedostosta koottava kuukausiraportti korvataan yhdellä helposti päivitettävällä raporttipohjalla ja selkeillä käyttöohjeilla.'},
  video:{pause:'Pysäytä video',play:'Toista video',pauseShort:'Pysäytä',playShort:'Toista',blocked:'Video ei käynnistynyt automaattisesti. Voit toistaa sen painikkeesta.'},
  brochures:{eyebrow:'PALVELUESITTEET',title:'Lataa palveluesitteemme.',lead:'Valitse esite suomeksi, ruotsiksi tai englanniksi. Voit myös ladata kaikki kolme kerralla ZIP-tiedostona.',both:'Kaikki palveluesitteet'},
  form:{nameError:'Nimi on liian pitkä.',companyError:'Yrityksen nimi on liian pitkä.',emailError:'Tarkista sähköpostiosoite.',serviceError:'Valitse palvelu luettelosta.',messageError:'Kirjoita vähintään 10 ja enintään 4 500 merkkiä.',company:'Yritys (valinnainen)',nameHint:'Nimesi',companyHint:'Yrityksen nimi',messageHint:'Kerro lyhyesti ongelma ja toivottu lopputulos.',invalid:'Tarkista merkityt kentät ja korjaa tiedot.',rateLimited:'Liikaa lähetysyrityksiä. Yritä myöhemmin tai lähetä sähköpostia osoitteeseen',unknown:'Viestin tilaa ei voitu vahvistaa. Älä lähetä samaa viestiä uudelleen ilman tarkistusta. Voit ottaa yhteyttä osoitteeseen'},
  errors:{eyebrow:'ODOTTAMATON VIRHE',title:'Sivun lataaminen ei onnistunut.',body:'Voit yrittää uudelleen tai palata etusivulle.',retry:'Yritä uudelleen',home:'Palaa etusivulle'},
  notFound:{eyebrow:'SIVUA EI LÖYDY',title:'Sivua ei löydy.',body:'Tutustu palveluihin tai palaa etusivulle.',home:'Etusivu'},
  serviceDetail:{artTitles:['Selkeä ja tarkistettu tieto','Toimiva työnkulku','Sivusto, jota on helppo käyttää','Työkalu käytännön tarpeeseen','Dokumentoitu testitulos','Selkeä, muokattava asiakirja'],
   services:'Palvelut',overview:'Mitä palveluun kuuluu',deliver:'Mitä saat',limits:'Mistä sovitaan etukäteen',method:'Näin työ etenee',touch:'Kerro tarpeestasi',next:'Takaisin palveluihin',home:'Etusivu',breadcrumb:'Murupolku',service:'PALVELU',graphic:'Taitettuja pintoja esittävä kuvitus työn vaiheista',
   phases:[{title:'Kerro tarpeesta',description:'Käymme läpi tehtävän, nykyiset työkalut ja toivotun tuloksen.'},{title:'Sovimme työstä',description:'Sovimme työn sisällöstä, hinnasta, aikataulusta ja vastuista.'},{title:'Toteutus ja testaus',description:'Käytämme nykyisiä työkaluja mahdollisuuksien mukaan ja tarkistamme työn toimivuuden.'},{title:'Luovutus',description:'Saat työn tulokset ja niiden käyttöön tarvittavat ohjeet.'}]}
 },
 en:{
  logoHome:'Komplyint Oy – home',privacyLink:'Read our privacy notice',
  skip:'Skip to content',navigation:'Main navigation',close:'Close',categories:'Show service categories',chooseService:'CHOOSE A SERVICE',serviceAreas:'Service areas',
  languageSwitcher:'Select language',noScriptNav:'Site navigation',localeDraftWarning:'Changing language may clear your unfinished form. Continue?',serviceDetailLink:'View this service',
  appearance:'Appearance',dark:'Dark',light:'Light',system:'Device setting',site:'Website',contact:'Contact',downloadBrochures:'Download all service brochures (ZIP)',locationName:'Finland',locationValue:'Helsinki, Finland',
  heroPrinciples:'HOW WE WORK',otherServices:'Cannot see what you need? Tell us about the task and we will see whether we can help.',
  before:'CURRENT SITUATION',after:'POSSIBLE SOLUTION',aboutCompany:'ABOUT OUR COMPANY',productDevelopment:'PRODUCT DEVELOPMENT',
  workTitle:'Examples of the work we could do.',workLead:'These are fictional examples showing how similar tasks could be approached.',
  aboutPageLabel:'ABOUT THE COMPANY',aboutPageTitle:'Practical help with everyday digital tasks.',whyUs:'OUR APPROACH',whyText:'We discuss the task, agree on the work and test the result. We make it clear what is included and what is not.',
  businessId:'Business ID',location:'Location',contactLabel:'Contact',
  accessibility:{label:'ACCESSIBILITY',title:'Accessibility information',lead:'We are improving the website so more people can use it easily.',doing:'What we are doing',doingText:'We are improving keyboard access, readability, motion controls, form feedback and mobile usability. Automated tests alone cannot provide a full accessibility assessment.',feedback:'Feedback and alternative contact',feedbackText:'If you have difficulty using the site or need information in another format, email',review:'Review status',reviewText:'The website has not yet undergone a complete review against WCAG 2.2 AA.'},
  featured:{eyebrow:'FICTIONAL EXAMPLE',title:'An easier way to manage monthly reports.',link:'Explore examples',alt:'Illustration of several files being combined into one clear report',imageAlt:'',summary:'In this fictional example, a monthly report compiled from several Excel files is replaced with one reusable template and clear instructions.'},
  video:{pause:'Pause background video',play:'Play background video',pauseShort:'Pause',playShort:'Play',blocked:'The video did not start automatically. Select Play to watch it.'},
  brochures:{eyebrow:'SERVICE BROCHURES',title:'Download our service brochures.',lead:'Choose a brochure in English, Finnish or Swedish, or download all three in one ZIP file.',both:'All service brochures'},
  form:{nameError:'Name is too long.',companyError:'Company name is too long.',emailError:'Enter a valid email address.',serviceError:'Choose a service from the list.',messageError:'Enter between 10 and 4,500 characters.',company:'Company (optional)',nameHint:'Your name',companyHint:'Company name',messageHint:'Describe the problem and desired outcome.',invalid:'Check the highlighted fields and correct any errors.',rateLimited:'Too many requests. Please try later or email',unknown:'The request status is uncertain. Do not resubmit the same message without checking. You can contact'},
  errors:{eyebrow:'SOMETHING WENT WRONG',title:'We could not load this page.',body:'You can retry or return to the homepage.',retry:'Retry',home:'Go home'},
  notFound:{eyebrow:'PAGE NOT FOUND',title:'Page not found.',body:'Explore services or return to the homepage.',home:'Home'},
  serviceDetail:{artTitles:['Clear, checked information','A smoother workflow','An easier-to-use website','A tool for the job','Documented test results','A clear, editable document'],
   services:'Services',overview:'What is included',deliver:'What you receive',limits:'What we agree upfront',method:'How the work progresses',touch:'Ask about this service',next:'Back to all services',home:'Home',breadcrumb:'Breadcrumb',service:'SERVICE',graphic:'Abstract folded shapes illustrating stages of work',
   phases:[{title:'Tell us what you need',description:'We discuss the task, the tools you use and the result you want.'},{title:'Agree the work',description:'We agree on the tasks, price, timetable and responsibilities.'},{title:'Build and test',description:'We use existing tools where possible and test the work we have agreed.'},{title:'Handover',description:'You receive the finished work with instructions for using it.'}]}
 },
 sv:{
  logoHome:'Komplyint Oy – startsida',privacyLink:'Läs vår dataskyddsbeskrivning',
  skip:'Hoppa till innehållet',navigation:'Huvudnavigation',close:'Stäng',categories:'Visa tjänstekategorier',chooseService:'VÄLJ EN TJÄNST',serviceAreas:'Tjänsteområden',
  languageSwitcher:'Välj språk',noScriptNav:'Webbplatsens navigation',localeDraftWarning:'Om du byter språk kan uppgifterna i det påbörjade formuläret försvinna. Vill du fortsätta?',serviceDetailLink:'Läs om tjänsten',
  appearance:'Utseende',dark:'Mörkt',light:'Ljust',system:'Enhetens inställning',site:'Webbplats',contact:'Kontakt',downloadBrochures:'Ladda ner alla broschyrer (ZIP)',locationName:'Finland',locationValue:'Helsingfors, Finland',
  heroPrinciples:'SÅ HÄR ARBETAR VI',otherServices:'Hittar ni inte rätt tjänst? Berätta vad ni behöver hjälp med.',
  before:'NULÄGE',after:'MÖJLIG LÖSNING',aboutCompany:'OM FÖRETAGET',productDevelopment:'PRODUKTUTVECKLING',
  workTitle:'Exempel på hur vi kan hjälpa till.',workLead:'Exemplen är fiktiva och visar hur liknande uppdrag skulle kunna lösas.',
  aboutPageLabel:'OM FÖRETAGET',aboutPageTitle:'Hjälp med digitala uppgifter i företagets vardag.',whyUs:'SÅ HÄR GÅR VI TILL VÄGA',whyText:'Vi går igenom uppdraget tillsammans, kommer överens om arbetet och testar resultatet. Vi berättar tydligt vad som ingår och vad som inte gör det.',
  businessId:'FO-nummer',location:'Ort',contactLabel:'Kontakt',
  accessibility:{label:'TILLGÄNGLIGHET',title:'Tillgänglighetsinformation',lead:'Vi förbättrar webbplatsen så att den blir lättare att använda för fler.',doing:'Vad vi gör',doingText:'Vi förbättrar användningen med tangentbord, läsbarheten, hanteringen av rörelser, formulärmeddelanden och mobilanvändningen. Automatiska tester räcker inte för en fullständig tillgänglighetsbedömning.',feedback:'Respons och alternativ kontakt',feedbackText:'Om du har svårt att använda webbplatsen eller behöver information i ett annat format, skriv till',review:'Granskningsstatus',reviewText:'Webbplatsen har ännu inte genomgått en fullständig granskning enligt WCAG 2.2 AA.'},
  featured:{eyebrow:'FIKTIVT EXEMPEL',title:'Så kan månadsrapporteringen bli enklare.',link:'Se exempel',alt:'Illustration där flera filer sammanställs till en tydlig rapport',imageAlt:'',summary:'I det här fiktiva exemplet ersätts en månadsrapport som sammanställs från flera Excel-filer med en mall som är lätt att uppdatera och tydliga anvisningar.'},
  video:{pause:'Pausa bakgrundsvideon',play:'Spela upp bakgrundsvideon',pauseShort:'Pausa',playShort:'Spela upp',blocked:'Videon startade inte automatiskt. Tryck på Spela upp för att se den.'},
  brochures:{eyebrow:'TJÄNSTEBROSCHYRER',title:'Ladda ner våra tjänstebroschyrer.',lead:'Välj en broschyr på svenska, finska eller engelska, eller ladda ner alla tre som en ZIP-fil.',both:'Alla tjänstebroschyrer'},
  form:{nameError:'Namnet är för långt.',companyError:'Företagsnamnet är för långt.',emailError:'Kontrollera e-postadressen.',serviceError:'Välj en tjänst i listan.',messageError:'Skriv minst 10 och högst 4 500 tecken.',company:'Företag (frivilligt)',nameHint:'Ditt namn',companyHint:'Företagets namn',messageHint:'Beskriv kort problemet och vilket resultat du önskar.',invalid:'Kontrollera de markerade fälten och rätta eventuella fel.',rateLimited:'För många försök. Försök igen senare eller skriv till',unknown:'Vi kunde inte bekräfta förfrågans status. Skicka inte samma meddelande på nytt innan du har kontrollerat. Du kan kontakta'},
  errors:{eyebrow:'ETT OVÄNTAT FEL',title:'Sidan kunde inte visas.',body:'Du kan försöka igen eller gå tillbaka till startsidan.',retry:'Försök igen',home:'Till startsidan'},
  notFound:{eyebrow:'SIDAN HITTADES INTE',title:'Sidan hittades inte.',body:'Utforska våra tjänster eller gå tillbaka till startsidan.',home:'Startsida'},
  serviceDetail:{artTitles:['Information du kan lita på','Ett smidigare arbetsflöde','En webbplats som är lättare att använda','Ett verktyg för uppgiften','Dokumenterade testresultat','Ett tydligt, redigerbart dokument'],
   services:'Tjänster',overview:'Vad som ingår',deliver:'Det här får ni',limits:'Vad vi kommer överens om',method:'Så går arbetet till',touch:'Fråga om tjänsten',next:'Tillbaka till alla tjänster',home:'Startsida',breadcrumb:'Sökväg',service:'TJÄNST',graphic:'Abstrakt illustration av vikta former som visar arbetets olika steg',
   phases:[{title:'Berätta om uppdraget',description:'Vi går igenom uppdraget, era nuvarande verktyg och det resultat ni önskar.'},{title:'Vi kommer överens',description:'Vi kommer överens om arbetet, priset, tidtabellen och ansvarsfördelningen.'},{title:'Genomför och testa',description:'Vi använder befintliga verktyg där det är möjligt och testar resultatet.'},{title:'Överlämning',description:'Ni får det färdiga arbetet och de anvisningar som behövs för att använda det.'}]}
 }
}
