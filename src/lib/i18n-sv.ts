/**
 * Swedish (Finland) first-party website messages.
 * Commercial facts, exclusions and all six service descriptions translated
 * explicitly; never auto-translate legal/privacy claims at runtime.
 */
export const svServices = [
  {
    title:'Excel, data och rapportering',
    intro:'Tydligare information med mindre manuellt arbete.',
    examples:['Reparation av Excel-filer, formler och förbättringar i Power Query','Sammanställning, rensning och kvalitetskontroll av data','Power BI-rapporter och återkommande rapportering'],
    deliverable:'En fungerande fil eller rapport, överenskomna kontroller och användarinstruktioner.',
    boundaries:'Vi går igenom datakvalitet, åtkomsträttigheter och eventuella licenser innan arbetet börjar.',
    tools:'Excel · Power Query · Power BI · CSV',
  },
  {
    title:'Microsoft 365 och automatisering',
    intro:'Effektivisera återkommande arbetsmoment med verktyg ni redan använder.',
    examples:['Arbetsflöden med Forms, Lists och SharePoint','Meddelanden och godkännandeflöden i Power Automate','Tydligare processer i Teams, Outlook och OneDrive'],
    deliverable:'En avgränsad automatisering, ett testat arbetsflöde och tydliga underhållsanvisningar.',
    boundaries:'Automatiseringen förutsätter nödvändiga behörigheter och lämpliga licenser.',
    tools:'Forms · Lists · SharePoint · Teams · Outlook · Power Automate',
  },
  {
    title:'Webbplatser och underhåll',
    intro:'Gör befintliga webbplatser tydligare, mer användbara och lättare att sköta.',
    examples:['Förbättringar av innehåll, layout och mobilanvändbarhet','Testning av kontaktformulär och användarflöden','Mindre webbplatsförnyelser och överenskomna uppdateringar'],
    deliverable:'Avgränsade ändringar, funktionskontroll och skriftlig överlämning.',
    boundaries:'Ansvar för hosting, säkerhet och driftsavbrott avtalas separat; vi lovar inte jour dygnet runt.',
    tools:'HTML · CSS · JavaScript · WordPress / lämpliga plattformar',
  },
  {
    title:'Mindre programvaror och integrationer',
    intro:'Ändamålsenliga verktyg för verkliga arbetsbehov utan onödig komplexitet.',
    examples:['Interna uppföljningsverktyg, formulär och kalkylatorer','Små webbapplikationer och förbättringar av användargränssnitt','Dataöverföring mellan system via tillgängliga gränssnitt'],
    deliverable:'Avtalade funktioner, tester, källkod och driftsättningsanvisningar enligt överenskommelse.',
    boundaries:'Stora plattformar, kritiska integrationer och support dygnet runt kräver en separat bedömning.',
    tools:'Webbappar · API:er · Python · JavaScript / TypeScript',
  },
  {
    title:'Programvarutestning och kvalitetssäkring',
    intro:'Praktiska tester inför publicering eller nästa utvecklingssteg.',
    examples:['Funktionell testning av webbplatser och formulär','Återskapande av fel, dokumentation och kontroll av rättelser','Överenskomna kontroller i webbläsare och mobilvyer'],
    deliverable:'En testsammanfattning, en prioriterad fellista och reproducerbara iakttagelser.',
    boundaries:'Testningen är ingen säkerhetsrevision eller certifiering och garanterar inte felfri programvara.',
    tools:'Manuell testning · Playwright · Testfall · Felrapporter',
  },
  {
    title:'Digitalt kontorsstöd',
    intro:'Små, tydligt avgränsade uppgifter inom dokument- och informationshantering.',
    examples:['Finslipning av PowerPoint-presentationer och Word-mallar','Organisering av filer och framtagning av kalkylbladsmallar','Enkla rapporter, dokumentation och instruktionsmaterial'],
    deliverable:'Överenskomna redigerbara filer och korta överlämningsanvisningar.',
    boundaries:'Kundservice, behandling av personuppgifter och löpande hjälp avgränsas separat.',
    tools:'PowerPoint · Word · OneDrive · SharePoint · Excel',
  },
]

export const svContent = {
  navigation:{home:'Startsida',services:'Tjänster',software:'Programvara',work:'Exempel',about:'Om oss',contact:'Kontakt',privacy:'Integritet',accessibility:'Tillgänglighet',menu:'Öppna menyn'},
  tagline:'FINLÄNDSKT FÖRETAG FÖR DIGITALA LÖSNINGAR',
  contactButton:'Berätta om ditt behov',explore:'Utforska tjänster',email:'E-post',
  hero:{
    label:'DATA · AUTOMATISERING · PROGRAMVARA',
    title:'Mer klarhet i arbetet. Trygghet i leveransen.',
    text:'Vi hjälper företag att få bättre ordning på information, minska repetitivt manuellt arbete och utveckla fungerande digitala lösningar. Vi börjar med behovet, avgränsar arbetet tydligt och levererar det som behövs.',
    point1:'Tydlig omfattning',point2:'Avtalade leveranser',point3:'Testad överlämning'
  },
  intro:{
    eyebrow:'VAD VI GÖR',
    title:'Praktisk digital hjälp. Tydliga leveranser.',
    text:'Från problem i Excel till mindre förbättringar av programvara: konkret hjälp när den egna tiden eller tekniska kompetensen inte räcker till.'
  },
  area:{
    eyebrow:'VÅRA TJÄNSTER',title:'Rätt lösning. Tydlig omfattning.',
    text:'Välj en tjänst till vänster för att se exempel, vanliga leveranser och vad vi kommer överens om innan arbetet börjar.',
    examples:'Typiska uppdrag',delivered:'Det här levererar vi',boundaries:'Det här avtalar vi i förväg',
    tools:'Lämpliga verktyg',help:'Fråga om tjänsten'
  },
  impact:{
    eyebrow:'PRAKTISKA EXEMPEL',title:'Hur kan ett projekt se ut?',
    disclaimer:'Illustrativa exempel, inte påståenden om utförda kunduppdrag.',
    cases:[
      {num:'01',title:'Förbättra en Excel-rapport',before:'Flera filer och en felkänslig månadsrapport.',after:'En tydlig mall som kan uppdateras med tillhörande instruktioner.'},
      {num:'02',title:'Automatisera inkommande förfrågningar',before:'Förfrågningar försvinner i långa e-posttrådar.',after:'Ett formulär, en ansvarig person och automatiska meddelanden.'},
      {num:'03',title:'Kontrollera en företagswebbplats',before:'Problem med mobilvyn och osäkerhet kring kontaktformuläret.',after:'En prioriterad åtgärdslista, avtalade ändringar och ett testat användarflöde.'}
    ]
  },
  process:{
    eyebrow:'SÅ HÄR ARBETAR VI',title:'Först förstår vi. Sedan bygger vi.',
    steps:[
      {title:'Kartläggning',body:'Berätta vad som tar tid eller inte fungerar.'},
      {title:'Avgränsning och offert',body:'Vi kommer överens om innehåll, ansvar, pris och tidplan.'},
      {title:'Genomförande och testning',body:'Vi återanvänder lämpliga lösningar och testar det överenskomna resultatet.'},
      {title:'Överlämning',body:'Du får resultatet, instruktioner och information om eventuellt fortsatt stöd.'}
    ]
  },
  trust:{
    eyebrow:'VÅRA ARBETSPRINCIPER',title:'Tydlighet är en del av kvaliteten.',
    items:[
      {title:'Återanvänd före nybygge',body:'Vi ser först över kundens befintliga verktyg och lösningar.'},
      {title:'Inga vaga löften',body:'Vi avtalar om leverans, begränsningar och ändringar i förväg.'},
      {title:'Ansvarsfull informationshantering',body:'Vi klarlägger åtkomst, databehov och lagring innan arbetet börjar.'},
      {title:'Inga påhittade referenser',body:'Vi märker demonstrationer som demonstrationer och visar kundarbete endast med tillstånd.'}
    ]
  },
  cta:{
    eyebrow:'BÖRJA I LAGOM SKALA',
    title:'Vilket arbetsmoment vill ditt företag förenkla?',
    text:'Skicka en kort beskrivning. Vi berättar om uppdraget passar våra tjänster och vad som behövs för en offert.',
    button:'Kontakta oss'
  },
  software:{
    eyebrow:'PROGRAMVARUUTVECKLING OCH UNDERHÅLL',
    title:'Mindre programvarulösningar. Genomtänkta förbättringar.',
    lead:'Vi bygger tydligt avgränsade digitala verktyg och vidareutvecklar befintliga webbapplikationer. Omfattning, driftsättning och ansvar för underhåll avtalas separat för varje uppdrag.',
    items:[
      {title:'Interna verktyg',body:'Uppföljningslistor, formulär, kalkylatorer och lätta informationshanteringsverktyg.'},
      {title:'Rättelser och vidareutveckling',body:'Mindre funktioner, gränssnittsändringar, buggfixar och funktionskontroller.'},
      {title:'Avgränsade integrationer',body:'Dataöverföring mellan lämpliga system via dokumenterade gränssnitt.'}
    ],
    productTitle:'Våra egna produktprojekt',
    productText:'Vi utvecklar även egna digitala produkter. Produktutvecklingen hålls åtskild från kundtjänsterna så att uppdragens omfattning och ansvar är tydliga.',
    productLink:'Utforska Floently',
    limitTitle:'Det här lovar vi inte automatiskt',
    limit:'Obegränsad utveckling, säkerhetscertifiering, underhåll av kritiska system och jour dygnet runt kräver separat bedömning och uttryckligt avtal.'
  },
  contactPage:{
    eyebrow:'KONTAKT',title:'Berätta vad som behöver fungera bättre.',
    lead:'Beskriv till exempel vilka verktyg ni använder, vad som inte fungerar och vilket resultat ni önskar. Du kan även be om en uppskattning för ett litet engångsuppdrag.',
    formName:'Namn',formEmail:'E-postadress',formService:'Ämne',formMessage:'Hur kan vi hjälpa?',
    send:'Skicka förfrågan',sending:'Skickar ...',
    sent:'Tack! Din förfrågan har tagits emot för behandling.',
    fail:'Meddelandet kunde inte skickas. Använd e-postadressen nedan.',
    privacy:'Vi använder dessa uppgifter endast för att svara på din förfrågan. Läs integritetsinformationen.',
    select:'Välj ämne',other:'Osäker / något annat',
    note:'Skicka till att börja med endast den information som behövs för att beskriva uppdraget, inte känsliga kunduppgifter.',
    action:'Företagsuppgifter'
  },
  privacyPage:{
    eyebrow:'INTEGRITET',title:'Integritetsinformation',
    lead:'Så behandlar vi personuppgifter som skickas via webbplatsen.',
    sections:[
      {title:'Personuppgiftsansvarig',body:'Komplyint Oy, FO-nummer 3588595-3. Kontakt: info@komplyint.fi.'},
      {title:'Uppgifter som behandlas',body:'Vid förfrågningar via webbplatsen kan vi behandla namn, e-postadress, meddelandets innehåll och de tekniska uppgifter som behövs för att skicka och skydda meddelandet.'},
      {title:'Syfte och rättslig grund',body:'Uppgifterna används för att svara på förfrågningar, kommunicera om tjänster och förbereda eventuella avtal. Beroende på situationen stöder sig behandlingen på berättigat intresse eller åtgärder före avtal.'},
      {title:'Lagring och tjänsteleverantörer',body:'Uppgifterna sparas endast så länge de behövs för kommunikation, kundrelationen eller lagstadgade skyldigheter. E-post- och hostingleverantörer kan behandla uppgifter för vår räkning enligt lämpliga arrangemang.'},
      {title:'Dina rättigheter',body:'Beroende på tillämplig lagstiftning kan du begära tillgång, rättelse eller radering av uppgifter, begränsning av behandlingen eller invända mot den. Du kan kontakta Dataombudsmannens byrå i Finland.'},
      {title:'Kakor och inställningar',body:'Webbplatsen kan spara språk- och utseendeinställningar lokalt i din webbläsare. Om vi senare tar i bruk analys- eller marknadsföringstjänster uppdaterar vi denna information och tillämpliga val.'},
      {title:'Andra produkter',body:'Separata programvaruprodukter har egen integritetsinformation där det behövs.'}
    ]
  },
  about:{
    title:'Ett självständigt finländskt företag',
    text:'Komplyint Oy fokuserar för närvarande på data, automatisering, mindre programvarulösningar och överenskommet tekniskt stöd. Tjänster inom regelefterlevnad är ett mer långsiktigt utvecklingsområde; vi erbjuder för närvarande inte rådgivning om regelefterlevnad.'
  },
  footer:'Komplyint Oy · FO-nummer 3588595-3',
  footerNote:'Alla uppdrag har en separat överenskommen omfattning. Ingen juridisk rådgivning, certifiering eller myndighetsgodkännande erbjuds.'
}
