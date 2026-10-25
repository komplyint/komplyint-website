

export default function Arrow({ light = false }: { light?: boolean }) {
  return <span className={light ? 'kc-arrow light' : 'kc-arrow'} aria-hidden="true">↗</span>
}
