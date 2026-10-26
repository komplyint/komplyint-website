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
    examples:['Förbättring av innehåll, layout och användning i mobilen','Testning av kontaktformulär och webbplatsens viktigaste funktioner','Mindre ändringar på webbplatsen och uppdatering av innehåll'],
    deliverable:'Överenskomna ändringar, funktionskontroll och skriftliga anvisningar.',
    boundaries:'Vi kommer separat överens om webbhotellet, säkerheten och eventuella driftavbrott. Jour dygnet runt ingår inte.',
    tools:'HTML · CSS · JavaScript · WordPress / lämpliga plattformar',
  },
  {
    title:'Mindre programlösningar och integrationer',
    intro:'Små program och integrationer för konkreta behov i företaget.',
    examples:['Interna uppföljningsverktyg, formulär och räknare','Mindre webbapplikationer och förbättringar av användargränssnitt','Överföring av information mellan system via tillgängliga gränssnitt'],
    deliverable:'De funktioner och tester vi kommit överens om samt anvisningar för eventuell källkod och driftsättning.',
    boundaries:'Stora system, kritiska integrationer och support dygnet runt bedöms separat.',
    tools:'Webbappar · API:er · Python · JavaScript / TypeScript',
  },
  {
    title:'Programvarutestning och kvalitetssäkring',
    intro:'Testning före publicering och efter ändringar.',
    examples:['Funktionskontroll av webbplatser och formulär','Återskapande av fel, dokumentation och kontroll av åtgärder','Testning i överenskomna webbläsare och mobilvyer'],
    deliverable:'En testrapport med prioriterade fel och anvisningar för att återskapa dem.',
    boundaries:'Testningen ersätter inte en säkerhetsgranskning och garanterar inte att programvaran är helt felfri.',
    tools:'Manuell testning · Playwright · Testfall · Felrapporter',
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
    label:'DATA · AUTOMATISERING · PROGRAMVARA',
    title:'Digitala verktyg som förenklar arbetsdagen.',
    text:'Vi hjälper företag att förbättra rapporteringen, automatisera återkommande arbetsuppgifter och utveckla mindre programlösningar. Vi går igenom behoven tillsammans och kommer överens om arbetets omfattning innan vi börjar.',
    point1:'Tydligt avgränsat uppdrag',point2:'Överenskommet resultat',point3:'Test före överlämning'
  },
  intro:{
    eyebrow:'VAD VI GÖR',
    title:'Praktisk hjälp med data, automatisering och programvara.',
    text:'Vi rättar till Excel-rapporter, förbättrar arbetsflöden i Microsoft 365 och utvecklar webbplatser och mindre applikationer. Vi hjälper också till med enskilda, tydligt avgränsade uppdrag.'
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
    eyebrow:'PROGRAMVARUUTVECKLING OCH UNDERHÅLL',
    title:'Små programlösningar för företagets behov.',
    lead:'Vi utvecklar mindre digitala verktyg och förbättrar befintliga webbapplikationer. Vi kommer i förväg överens om vad som ska göras, hur lösningen tas i bruk och vem som ansvarar för underhållet.',
    items:[
      {title:'Interna verktyg',body:'Uppföljningsverktyg, formulär, räknare och enkla verktyg för informationshantering.'},
      {title:'Rättelser och vidareutveckling',body:'Mindre funktioner, ändringar i användargränssnittet, felrättningar och testning.'},
      {title:'Avgränsade integrationer',body:'Överföring av information mellan system via deras dokumenterade gränssnitt.'}
    ],
    productTitle:'Våra egna programvaruprodukter',
    productText:'Vi utvecklar också egna digitala produkter. Vi håller produktutvecklingen åtskild från kunduppdragen så att ansvar och tidtabeller är tydliga.',
    productLink:'Utforska Floently',
    limitTitle:'Det här ingår inte i ett vanligt uppdrag',
    limit:'Löpande jour, underhåll av kritiska system och säkerhetscertifiering ingår inte i vanliga uppdrag. Sådana tjänster kräver en separat överenskommelse.'
  },
  contactPage:{
    eyebrow:'KONTAKT',title:'Hur kan vi hjälpa er?',
    lead:'Berätta kort vad ni vill förbättra och vilka verktyg ni använder. Ni kan också fråga om ett mindre engångsuppdrag.',
    formName:'Namn',formEmail:'E-postadress',formService:'Ämne',formMessage:'Hur kan vi hjälpa?',
    send:'Skicka meddelande',sending:'Skickar ...',
    sent:'Tack! Vi har tagit emot din förfrågan.',
    fail:'Meddelandet kunde inte skickas. Du kan också kontakta oss per e-post.',
    privacy:'Vi använder uppgifterna i formuläret för att besvara din förfrågan.',
    select:'Välj ämne',other:'Annat ärende / vet inte',
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
    text:'Komplyint Oy är ett finländskt företag som hjälper andra företag med rapportering, automatisering och mindre programprojekt. Vi utvecklar också egna digitala produkter. Vi erbjuder för närvarande inte rådgivning om regelefterlevnad.'
  },
  footerDescription:'Praktisk hjälp med data, automatisering och mindre programprojekt.',
  footer:'Komplyint Oy · FO-nummer 3588595-3',
  footerNote:'Vi kommer överens om varje uppdrags omfattning separat. Vi erbjuder inte juridisk rådgivning, certifiering eller myndighetsgodkännanden.'
}
