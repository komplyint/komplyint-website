// F19/F20/C23: editable, original, source-controlled illustrations for
// six explicitly illustrative work scenarios. No personal or client data.
export default function WorkExampleArt({index}:{index:number}){
  return <div className="qh-example-art" aria-hidden="true">
    <svg viewBox="0 0 420 152" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id={'workPlane'+index} x1="0" y1="0" x2="420" y2="152" gradientUnits="userSpaceOnUse">
          <stop stopColor="#154E38"/><stop offset="1" stopColor="#081A14"/>
        </linearGradient>
      </defs>
      <rect width="420" height="152" rx="12" fill={'url(#workPlane'+index+')'}/>
      <path d="M-25 127L220 0H280L40 152Z" fill="#4C986B" opacity=".12"/>
      <path d="M300 -20L444 112" stroke="#76B492" strokeWidth="1" opacity=".22"/>
      {index===0&&<>
        <rect x="40" y="29" width="183" height="96" rx="8" fill="#0E2B21" stroke="#8FB99D" strokeOpacity=".7"/>
        <path d="M40 49H223M40 69H223M40 89H223M40 109H223M95 49V125M159 49V125" stroke="#5E8F76" strokeWidth="1"/>
        <rect x="99" y="75" width="56" height="10" rx="2" fill="#C44B57"/>
        <rect x="105" y="96" width="47" height="8" rx="2" fill="#72B991"/>
        <path d="M244 78H271M263 71L271 78L263 85" stroke="#B6E8B9" strokeWidth="2" strokeLinecap="round"/>
        <rect x="287" y="32" width="95" height="92" rx="9" fill="#EAF0E9"/>
        <path d="M304 104V86H317V104M324 104V66H337V104M344 104V77H357V104M364 104V49H373V104" fill="#579E76"/>
        <path d="M302 105H376" stroke="#396E53" strokeWidth="2"/>
      </>}
      {index===1&&<>
        <rect x="30" y="52" width="106" height="58" rx="9" fill="#EAF0E9"/>
        <rect x="48" y="70" width="68" height="5" rx="2.5" fill="#81AD92"/>
        <rect x="48" y="83" width="47" height="5" rx="2.5" fill="#B0CDB9"/>
        <path d="M139 81H172M166 75L172 81L166 87" stroke="#A6D7B5" strokeWidth="2.5"/>
        <rect x="178" y="46" width="73" height="70" rx="12" fill="#173A2B" stroke="#83CBA1"/>
        <circle cx="214" cy="81" r="14" fill="#C44B57"/>
        <path d="M208 81H220M216 77L220 81L216 85" stroke="#FFF3F0" strokeWidth="2" strokeLinecap="round"/>
        <path d="M255 81H281M275 75L281 81L275 87" stroke="#A6D7B5" strokeWidth="2.5"/>
        <rect x="288" y="52" width="103" height="58" rx="9" fill="#EAF0E9"/>
        <path d="M306 82L315 91L337 68" stroke="#2D7852" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M348 75H376M348 85H367" stroke="#83A891" strokeWidth="4" strokeLinecap="round"/>
      </>}
      {index===2&&<>
        <rect x="44" y="22" width="332" height="111" rx="12" fill="#0F2A20" stroke="#7CAF8E" strokeWidth="1.5"/>
        <path d="M44 46H376" stroke="#7CAF8E" strokeOpacity=".65"/>
        <circle cx="62" cy="34" r="4" fill="#C74C57"/><circle cx="77" cy="34" r="4" fill="#7CAF8E"/><circle cx="92" cy="34" r="4" fill="#7CAF8E"/>
        <rect x="62" y="64" width="124" height="49" rx="6" fill="#204B35"/>
        <path d="M74 99L99 75L115 90L143 70L172 99" stroke="#92D2A8" strokeWidth="2" strokeLinecap="round"/>
        <rect x="203" y="67" width="148" height="8" rx="4" fill="#C1DDC8"/>
        <rect x="203" y="82" width="121" height="6" rx="3" fill="#5E9574"/>
        <rect x="203" y="95" width="85" height="6" rx="3" fill="#5E9574"/>
        <rect x="302" y="105" width="49" height="15" rx="5" fill="#C74C57"/>
      </>}
      {index===3&&<>
        {/* Maintain and extend an existing application: defective view becomes a reviewed change. */}
        <rect x="27" y="26" width="151" height="107" rx="9" fill="#0B2220" stroke="#6A987D" />
        <path d="M27 46H178" stroke="#5F9276"/><circle cx="42" cy="36" r="3" fill="#C74C57"/><circle cx="53" cy="36" r="3" fill="#507D60"/>
        <rect x="43" y="62" width="77" height="5" rx="2" fill="#5F9472"/><rect x="43" y="74" width="107" height="4" rx="2" fill="#315D48"/>
        <rect x="43" y="91" width="101" height="20" rx="4" fill="#572A36" stroke="#C74C57"/>
        <path d="M79 97L87 105M87 97L79 105" stroke="#F6B3BA" strokeWidth="2" strokeLinecap="round"/>
        <path d="M190 80H229M220 71L229 80L220 89" stroke="#9DD5AF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="239" y="26" width="154" height="107" rx="9" fill="#0C3025" stroke="#9ED3AD"/>
        <path d="M239 46H393" stroke="#70AA87"/><circle cx="254" cy="36" r="3" fill="#81C89B"/><circle cx="265" cy="36" r="3" fill="#507D60"/>
        <rect x="255" y="62" width="82" height="5" rx="2" fill="#A9DDB8"/><rect x="255" y="75" width="120" height="4" rx="2" fill="#5B9474"/>
        <rect x="255" y="91" width="116" height="20" rx="4" fill="#23533B" stroke="#7BC59A"/>
        <path d="M275 101L282 107L294 94" stroke="#B6E8B9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M305 101H352" stroke="#8CCFA5" strokeWidth="3" strokeLinecap="round"/>
      </>}
      {index===4&&<>
        {/* More dependable API connection between two systems with explicit response handling. */}
        <rect x="29" y="44" width="101" height="72" rx="10" fill="#E4F2E8" />
        <path d="M48 59C48 51 112 51 112 59V99C112 111 48 111 48 99Z" fill="#2C7754" />
        <ellipse cx="80" cy="59" rx="32" ry="10" fill="#84BF99"/>
        <path d="M48 78C48 90 112 90 112 78M48 96C48 108 112 108 112 96" stroke="#B0DFBF" strokeWidth="2"/>
        <path d="M130 80H165M251 80H286" stroke="#A5DAB3" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M156 74L165 80L156 86M277 74L286 80L277 86" stroke="#A5DAB3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="166" y="48" width="85" height="65" rx="11" fill="#153B2C" stroke="#7EBF97" strokeWidth="1.5"/>
        <rect x="181" y="63" width="54" height="14" rx="4" fill="#2C6850"/>
        <path d="M189 70H227" stroke="#B5E7BE" strokeWidth="3" strokeLinecap="round"/>
        <path d="M194 93L205 101L222 84" stroke="#B6E8B9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="287" y="44" width="105" height="72" rx="10" fill="#E4F2E8"/>
        <rect x="303" y="61" width="74" height="12" rx="3" fill="#2C7754"/>
        <rect x="303" y="82" width="54" height="5" rx="2" fill="#73A98B"/>
        <rect x="303" y="95" width="67" height="5" rx="2" fill="#A8CEB3"/>
      </>}
      {index===5&&<>
        {/* Regression/functional testing: test plan -> checked results -> release. */}
        <rect x="25" y="27" width="201" height="106" rx="11" fill="#0D3024" stroke="#83B995"/>
        <rect x="25" y="27" width="201" height="24" rx="10" fill="#22513B"/>
        <path d="M25 45H226" stroke="#4B8564"/>
        <circle cx="43" cy="39" r="3" fill="#C74C57"/><circle cx="55" cy="39" r="3" fill="#7DBD94"/>
        <rect x="43" y="61" width="166" height="16" rx="4" fill="#17422F"/>
        <path d="M52 69L57 74L65 64" stroke="#B6E8B9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M78 69H197" stroke="#7AAA89" strokeWidth="3" strokeLinecap="round"/>
        <rect x="43" y="82" width="166" height="16" rx="4" fill="#17422F"/>
        <path d="M52 90L57 95L65 85" stroke="#B6E8B9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M78 90H171" stroke="#7AAA89" strokeWidth="3" strokeLinecap="round"/>
        <rect x="43" y="103" width="166" height="16" rx="4" fill="#17422F"/>
        <path d="M52 111L57 116L65 106" stroke="#B6E8B9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M78 111H182" stroke="#7AAA89" strokeWidth="3" strokeLinecap="round"/>
        <path d="M235 80H261M252 73L261 80L252 87" stroke="#A1D9B5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="271" y="41" width="120" height="82" rx="11" fill="#EAF0E9"/>
        <path d="M291 80L313 100L365 58" stroke="#286D4C" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
      </>}
      <path d="M18 16H29M18 16V27" stroke="#B6E8B9" strokeOpacity=".5" strokeWidth="1.5"/>
    </svg>
  </div>
}
