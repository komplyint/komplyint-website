export default function ServiceIcon({index}:{index:number}){
  return <svg className="qh-service-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={'svcFill'+index} x1="2" y1="1" x2="62" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#184C3A"/><stop offset="1" stopColor="#0C271E"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="14" fill={'url(#svcFill'+index+')'} stroke="#4C8969" strokeWidth="1.1"/>
    {index===0&&<><rect x="14" y="13" width="36" height="37" rx="4" stroke="#C2F2D2" strokeWidth="1.7"/>
      <path d="M14 23H50M25 23V50M36 23V50M14 34H50M14 43H50" stroke="#7CBCA0" opacity=".8"/>
      <rect x="28" y="36" width="6" height="5" rx="1" fill="#C8515E"/><path d="M38 40L44 31L49 35" stroke="#D0F7DE" strokeWidth="2" strokeLinecap="round"/></>}
    {index===1&&<><rect x="11" y="13" width="16" height="13" rx="4" stroke="#B7ECCE" strokeWidth="1.8"/>
      <rect x="37" y="13" width="16" height="13" rx="4" stroke="#B7ECCE" strokeWidth="1.8"/>
      <rect x="25" y="39" width="17" height="13" rx="4" fill="#1D6748" stroke="#B7ECCE" strokeWidth="1.8"/>
      <path d="M19 26V32H33V39M45 26V32H33" stroke="#7DCAA4" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="33" cy="32" r="3.6" fill="#C8515E"/></>}
    {index===2&&<><rect x="10" y="14" width="44" height="36" rx="5" stroke="#D2F3DF" strokeWidth="1.8"/>
      <path d="M10 23H54M20 14V23" stroke="#8ED4AF" strokeWidth="1.5"/>
      <circle cx="15" cy="19" r="1.6" fill="#CD5861"/><path d="M18 35L25 41L34 29L46 40" stroke="#A7E6C1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="34" cy="29" r="3" fill="#D75662"/></>}
    {index===3&&<><path d="M24 20L15 32L24 44M40 20L49 32L40 44" stroke="#B9EFCE" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37 16L27 48" stroke="#D55D65" strokeWidth="3" strokeLinecap="round"/><circle cx="15" cy="32" r="2" fill="#91D6B1"/><circle cx="49" cy="32" r="2" fill="#91D6B1"/></>}
    {index===4&&<><circle cx="32" cy="31" r="18" stroke="#A7DFC0" strokeWidth="2"/>
      <path d="M19 31L27 39L44 23" stroke="#B7F4D0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="45" cy="47" r="5" fill="#C74C57" stroke="#F4B5B9" strokeWidth="1.2"/></>}
    {index===5&&<><path d="M20 11H38L47 20V50H20V11Z" stroke="#B7EBD0" strokeWidth="1.9"/>
      <path d="M38 11V20H47M26 29H42M26 35H42M26 41H38" stroke="#91CDAE" strokeWidth="2" strokeLinecap="round"/><rect x="14" y="20" width="5" height="27" rx="2" fill="#C7515C"/></>}
  </svg>
}