/**
 * Swedish (Finland) first-party website messages.
 * Commercial facts, exclusions and all six service descriptions translated
 * explicitly; never auto-translate legal/privacy claims at runtime.
 */
export const svServices = [
  {
    title:'Excel, data och rapportering',
    intro:'Få ordning på Excel-filerna och gör rapporteringen enklare.',
    examples:['Felsökning i Excel, formler och förbättringar i Power Query','Sammanställning, rensning och kontroll av data','Skapa och uppdatera rapporter i Power BI'],
    deliverable:'En fungerande fil eller rapport med tydliga anvisningar.',
    boundaries:'Vi kontrollerar underlaget, behörigheterna och vilka licenser som behövs innan vi börjar.',
    tools:'Excel · Power Query · Power BI · CSV',
  },
  {
    title:'Microsoft 365 och automatisering',
    intro:'Minska rutinarbetet med verktyg som redan finns i Microsoft 365.',
    examples:['Utveckling av arbetssätt med Forms, Lists och SharePoint','Aviseringar och godkännanden med Power Automate','Smidigare arbetsflöden i Teams, Outlook och OneDrive'],
    deliverable:'Den överenskomna automatiseringen, funktionskontroll och anvisningar för underhåll.',
    boundaries:'För att genomföra arbetet behövs rätt behörigheter och licenser.',
    tools:'Forms · Lists · SharePoint · Teams · Outlook · Power Automate',
  },
  {
    title:'Webbplatser och underhåll',
    intro:'Förbättra befintliga webbplatser, formulär och innehåll utan att börja om från början.',
    examples:['Förbättring av innehåll, layout och användning i mobilen','Testning av kontaktformulär och webbplatsens viktigaste funktioner','Webbändringar genomförs av överenskommen engelskspråkig utvecklare; kundkontakt på finska enligt avtal'],
    deliverable:'Överenskomna ändringar, funktionskontroll och skriftliga anvisningar.',
    boundaries:'Vi kommer separat överens om webbhotellet, säkerheten och eventuella driftavbrott. Jour dygnet runt ingår inte.',
    tools:'HTML · CSS · JavaScript · WordPress / lämpliga plattformar',
  },
  {
    title:'Programutveckling och integrationer',
    intro:'Vi löser problem i befintliga applikationer, utvecklar nya funktioner och förbättrar systemintegrationer.',
    examples:['Rätta återkommande fel och förbättra underhållbarheten','Utveckla gränssnitt och bakgrundstjänster enligt kundens agila arbetslista','Förbättra API:er, dataöverföring och felhantering'],
    deliverable:'De funktioner och tester vi kommit överens om samt anvisningar för eventuell källkod och driftsättning.',
    boundaries:'Avancerad fullstackutveckling sker på engelska med en bekräftad specialist. Finskspråkig kundkontakt kan avtalas separat.',
    tools:'TypeScript · Node.js · React · Angular · Vue · C#/.NET · API:er',
  },
  {
    title:'Programvarutestning och kvalitetssäkring',
    intro:'Vi identifierar fel och tar fram tydligare underlag inför nya programversioner.',
    examples:['Funktionstestning och testfall','Återskapa, prioritera och kontrollera åtgärdade fel','Regressions-, API- och webbläsartester enligt behov'],
    deliverable:'En testrapport med prioriterade fel och anvisningar för att återskapa dem.',
    boundaries:'Testningen ersätter inte en säkerhetsgranskning och garanterar inte att programvaran är helt felfri.',
    tools:'Manuell testning · Robot Framework · Playwright · API-tester',
  },
  {
    title:'Dokument och kontorsstöd',
    intro:'Hjälp med dokument, kalkylblad och att ordna upp filer.',
    examples:['Färdigställande av PowerPoint-presentationer och Word-mallar','Ordna filer och skapa mallar i Excel','Korta rapporter, dokument och bruksanvisningar'],
    deliverable:'Redigerbara filer med korta anvisningar enligt överenskommelse.',
    boundaries:'Löpande kontorsarbete, kundservice och behandling av personuppgifter avtalas separat.',
    tools:'PowerPoint · Word · OneDrive · SharePoint · Excel',
  },
]

export const svContent = {
  navigation:{home:'Startsida',services:'Tjänster',software:'Programutveckling',work:'Exempel',about:'Om oss',contact:'Kontakt',privacy:'Dataskydd',accessibility:'Tillgänglighet',menu:'Öppna menyn'},
  tagline:'DIGITALA TJÄNSTER FRÅN FINLAND',
  contactButton:'Kontakta oss',explore:'Se våra tjänster',email:'E-post',
  hero:{
    label:'PROGRAMUTVECKLING · DATA · AUTOMATISERING · IT-KONSULTER',
    title:'Programutveckling, testning och fungerande integrationer.',
    text:'Vi hjälper till att vidareutveckla applikationer, förbättra integrationer och testa ändringar före publicering. Vi erbjuder också avgränsade projekt samt Power BI-rapportering och Microsoft 365-lösningar.',
    point1:'Tydligt avgränsat uppdrag',point2:'Överenskommet resultat',point3:'Test före överlämning'
  },
  intro:{
    eyebrow:'VAD VI GÖR',
    title:'Programutveckling, analys och digitala tjänster.',
    text:'Från API:er och webbutveckling till Power BI, Microsoft 365 och programvarutestning. Även mindre uppdrag är välkomna.'
  },
  area:{
    eyebrow:'VÅRA TJÄNSTER',title:'Hitta en tjänst som passar ert behov.',
    text:'Läs vad vi kan hjälpa till med, vad som ingår och vad vi kommer överens om innan arbetet börjar.',
    examples:'Exempel på uppdrag',delivered:'Det här får ni',boundaries:'Det här kommer vi överens om',
    tools:'Verktyg vi använder',help:'Fråga oss om tjänsten'
  },
  impact:{
    eyebrow:'EXEMPEL PÅ UPPDRAG',title:'Exempel på hur vi kan hjälpa till.',
    disclaimer:'Exemplen är fiktiva och bygger inte på utförda kunduppdrag.',
    cases:[
      {num:'01',title:'Göra en månadsrapport lättare att uppdatera',before:'Månadsrapporten sammanställs för hand från flera Excel-filer.',after:'En rapportmall som är lätt att uppdatera, med tydliga anvisningar.'},
      {num:'02',title:'Förenkla hanteringen av förfrågningar',before:'Förfrågningarna kommer via e-post och är svåra att hålla reda på.',after:'Ett formulär samlar förfrågningarna och meddelar den ansvariga personen.'},
      {num:'03',title:'Kontrollera att en webbplats fungerar',before:'Webbplatsen fungerar dåligt i mobilen och kontaktformuläret behöver kontrolleras.',after:'En tydlig lista över åtgärder, överenskomna ändringar och funktionskontroll.'}
    ]
  },
  process:{
    eyebrow:'SÅ HÄR ARBETAR VI',title:'Vi går igenom behovet innan arbetet börjar.',
    steps:[
      {title:'Vi går igenom uppdraget',body:'Berätta vad som tar tid eller inte fungerar som det ska.'},
      {title:'Uppdrag och offert',body:'Vi kommer överens om vad som ska göras, ansvar, pris och tidtabell.'},
      {title:'Genomförande och testning',body:'Vi använder befintliga verktyg där det är möjligt och testar de överenskomna ändringarna.'},
      {title:'Överlämning',body:'Ni får det färdiga arbetet, anvisningar och information om eventuell fortsatt hjälp.'}
    ]
  },
  trust:{
    eyebrow:'VÅRA PRINCIPER',title:'Tydliga överenskommelser från början till slut.',
    items:[
      {title:'Vi utgår från de verktyg ni har',body:'Vi undersöker först vad som går att göra med era nuvarande verktyg.'},
      {title:'Vi kommer överens om arbetet',body:'Vi kommer överens om arbetets innehåll och eventuella tillägg innan vi börjar.'},
      {title:'Vi hanterar uppgifter omsorgsfullt',body:'Vi går igenom vilka behörigheter som behövs och vilka uppgifter som ska hanteras och sparas.'},
      {title:'Vi skiljer exempel från kunduppdrag',body:'Vi anger tydligt när något är ett fiktivt exempel. Verkliga kunduppdrag visar vi bara med tillstånd.'}
    ]
  },
  cta:{
    eyebrow:'KONTAKTA OSS',
    title:'Berätta vad ni behöver hjälp med.',
    text:'Beskriv uppdraget kort. Vi berättar om vi kan hjälpa till och vilka uppgifter vi behöver för att lämna en offert.',
    button:'Kontakta oss'
  },
  software:{
    eyebrow:'PROGRAMUTVECKLING · API:ER · TESTNING',
    title:'Vidareutveckling och förbättring av befintliga applikationer.',
    lead:'Vi hjälper när applikationer är svåra att ändra, integrationer orsakar problem eller utvecklingsuppgifter blir liggande. Vi kommer överens om målet och genomför ändringarna stegvis. Det tekniska arbetsspråket är engelska; kundkontakten kan skötas på finska enligt överenskommelse.',
    items:[
      {title:'Mer lättskötta applikationer',body:'Vi går igenom befintlig kod, utreder återkommande fel och genomför avtalade förbättringar utan onödiga totalombyggnader.'},
      {title:'API:er och systemintegrationer',body:'Vi utvecklar dataöverföring, bakgrundstjänster, felhantering och integrationstester.'},
      {title:'Gränssnitt och nya funktioner',body:'Vi genomför avgränsade frontend- och backenduppgifter enligt kundens arbetslista och rutiner för kodgranskning.'},
      {title:'Testning som del av utvecklingen',body:'Funktionstestning, testfall, API- och regressionstester samt lämplig testautomatisering inför publicering.'}
    ],
    productTitle:'Våra egna programvaruprodukter',
    productText:'Vi utvecklar också egna digitala produkter och håller det arbetet åtskilt från kundprojekt så att ansvar och tidtabeller är tydliga.',
    productLink:'Utforska Floently',
    limitTitle:'Vi avtalar om ansvar innan arbetet börjar',
    limit:'Vi bekräftar specialist, arbetsspråk, omfattning, testning och underhållsansvar. Jour för kritiska system och säkerhetscertifiering ingår inte som standard.'
  },
    contactPage:{
    eyebrow:'KONTAKT',title:'Hur kan vi hjälpa er?',
    lead:'Berätta om ni behöver ett projekt genomfört, en specialist för ett uppdrag eller hjälp med en mindre uppgift.',
    formName:'Namn (frivilligt)',formEmail:'E-postadress',formService:'Tjänst eller ärende',formMessage:'Beskriv uppdraget',
    send:'Skicka meddelande',sending:'Skickar ...',
    sent:'Tack! Vi har tagit emot din förfrågan.',
    fail:'Meddelandet kunde inte skickas. Du kan också kontakta oss per e-post.',
    privacy:'Vi använder uppgifterna i formuläret för att besvara din förfrågan.',
    select:'Välj tjänst eller ärende',other:'Annat ärende / vet inte',
    note:'Skriv inte in känsliga personuppgifter eller konfidentiell kundinformation i formuläret.',
    action:'Företagsuppgifter'
  },
  privacyPage:{
    eyebrow:'DATASKYDD',title:'Dataskyddsbeskrivning',
    lead:'Här berättar vi hur vi behandlar personuppgifter som kommer in via webbplatsen.',
    sections:[
      {title:'Personuppgiftsansvarig',body:'Komplyint Oy, FO-nummer 3588595-3. Kontakt: info@komplyint.fi.'},
      {title:'Vilka uppgifter behandlar vi?',body:'Vi kan behandla ditt namn, din e-postadress, ditt meddelande och tekniska uppgifter som behövs för att skicka meddelandet på ett säkert sätt.'},
      {title:'Varför behandlar vi uppgifterna?',body:'Vi använder uppgifterna för att besvara förfrågningar och diskutera eventuella uppdrag. Beroende på situationen grundar sig behandlingen på berättigat intresse eller åtgärder innan ett avtal ingås.'},
      {title:'Hur länge sparas uppgifterna?',body:'Vi sparar uppgifter bara så länge kontakten, kundrelationen eller lagstadgade skyldigheter kräver. Våra e-post- och webbhotellsleverantörer kan behandla uppgifter för vår räkning enligt avtal.'},
      {title:'Dina rättigheter',body:'Du kan ha rätt att ta del av, rätta eller få dina uppgifter raderade samt begära begränsning av eller invända mot behandlingen. Du kan också kontakta Dataombudsmannens byrå i Finland.'},
      {title:'Kakor och inställningar',body:'Webbplatsen kan spara ditt val av utseende i webbläsaren. Om vi börjar använda analysverktyg eller marknadsföringskakor uppdaterar vi den här beskrivningen och erbjuder de val som krävs.'},
      {title:'Andra produkter',body:'Våra andra programvaruprodukter kan ha egna dataskyddsbeskrivningar.'}
    ]
  },
  about:{
    title:'Ett finländskt företag inom digitala tjänster',
    text:'Komplyint Oy hjälper företag och IT-partner med programutveckling, data, Microsoft 365 och programvarutestning. Arbetsspråk och specialist avtalas per uppdrag. Vi ger inte juridisk rådgivning eller certifieringar.'
  },
  footerDescription:'Programutveckling, Power BI-rapportering, automatisering och kvalitetssäkring.',
  footer:'Komplyint Oy · FO-nummer 3588595-3',
  footerNote:'Vi kommer överens om varje uppdrags omfattning separat. Vi erbjuder inte juridisk rådgivning, certifiering eller myndighetsgodkännanden.'
}
