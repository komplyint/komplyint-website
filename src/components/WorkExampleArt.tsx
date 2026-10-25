// F19/F20/C23: editable, original, source-controlled illustrations for
// three explicitly illustrative work scenarios. No personal or client data.
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
      <path d="M18 16H29M18 16V27" stroke="#B6E8B9" strokeOpacity=".5" strokeWidth="1.5"/>
    </svg>
  </div>
}
