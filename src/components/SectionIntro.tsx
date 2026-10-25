export default function SectionIntro({ eyebrow, title, text }: {eyebrow:string;title:string;text?:string}) {
  return <div className="kc-intro"><p className="kc-eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="kc-lead">{text}</p>}</div>
}
