import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = path => readFileSync(join(root, path), 'utf8')
const publicFiles = [
  'src/app/page.tsx','src/app/layout.tsx','src/app/en/page.tsx','src/app/sv/page.tsx',
  'src/app/services/page.tsx','src/app/en/services/page.tsx','src/app/sv/services/page.tsx',
  'src/app/software/page.tsx','src/app/en/software/page.tsx','src/app/sv/software/page.tsx',
  'src/app/contact/page.tsx','src/app/en/contact/page.tsx','src/app/sv/contact/page.tsx',
  'src/app/privacy/page.tsx','src/app/en/privacy/page.tsx','src/app/sv/privacy/page.tsx',
  'frontend/src/index.html','frontend/src/app.js',
  'src/app/work/page.tsx','src/app/en/work/page.tsx','src/app/sv/work/page.tsx',
  'src/app/about/page.tsx','src/app/en/about/page.tsx','src/app/sv/about/page.tsx',
  'src/app/accessibility/page.tsx','src/app/en/accessibility/page.tsx','src/app/sv/accessibility/page.tsx',
  'src/app/services/[slug]/page.tsx','src/app/en/services/[slug]/page.tsx','src/app/sv/services/[slug]/page.tsx',
]
const forbidden = [
  [/auth\.komplyint\.fi/i, 'central identity provider'],
  [/\/(?:login|signin|sign-in|signup|sign-up|auth)(?:\/|[?#'"]|$)/i, 'authentication route'],
  [/(?:google\s*(?:sign\s*in|login|oauth)|GoogleLogin|GoogleOAuthProvider|googleOneTap)/i, 'Google sign-in UI'],
  [/\b(?:signIn|useSession|redirectToSignIn|requireAuth|withAuth|authGuard)\b/, 'client authentication gate'],
  [/(?:<form[^>]+(?:password|login)|<input[^>]+type\s*=\s*['"]password['"])/i, 'password form'],
]
test('public trilingual site has its intended navigation and contact route', () => {
  const home = source('src/app/page.tsx') + source('src/lib/commercial.ts') + source('src/components/ContactForm.tsx')
  for (const p of ['home', 'services', 'software', 'work', 'about', 'contact', 'privacy','accessibility']) {
    assert.ok(home.includes("'"+p+"'"), 'missing public route '+p)
  }
  assert.match(home,/className=\{menuOpen \? 'kc-nav is-open'/)
  assert.match(home,/navPages\.map/)
  assert.match(home,/\/api\/contact/)
  assert.match(home,/pageFromPath/)
})
test('brand assets remain untouched and original motion video is used', () => {
  const home=source('src/app/page.tsx')
  const hero=source('src/components/VideoHero.tsx')
  assert.match(home,/src="\/logo\.svg"/)
  assert.match(home,/import VideoHero from '@\/components\/VideoHero'/)
  assert.match(hero,/<source src="\/media\/hero\.mp4"/)
  assert.match(hero,/muted loop playsInline preload="none"/)
  assert.match(hero,/sourceReady&&/)
  assert.match(hero,/sessionStorage\.setItem\('komplyint-video-paused'/)
  assert.match(hero,/prefers-reduced-motion: reduce/)
  assert.match(hero,/IntersectionObserver/)
  assert.match(hero,/srcSet="\/media\/hero-mobile\.webp 800w, \/media\/hero\.webp 1920w"/)
  assert.match(source('src/app/handbook.css'),/\.kc-hero-poster\{background-image:none!important\}/)
  const css=source('src/app/commercial.css')
  assert.match(css,/\.kc-hero-video\{display:block!important\}/)
  assert.match(css,/prefers-reduced-motion/)
})
test('primary sales focus is practical services rather than compliance consultancy', () => {
  const home=source('src/app/page.tsx')+source('src/lib/commercial.ts')
  for(const term of ['Power BI','Power Automate','Software testing','Ohjelmistotestaus','data','automation']) {
    assert.ok(home.includes(term),'missing service coverage '+term)
  }
  assert.match(source('src/app/layout.tsx'),/commercial\.css/)
})
for(const path of publicFiles){
  test(path+' stays public and contains no sign-in flow',()=>{
    const file=source(path)
    for(const [pattern,what] of forbidden) assert.doesNotMatch(file,pattern,path+' contains '+what)
  })
}

test('handbook requirements: contact and D-U-N-S identity are consistent',()=>{
  const c=source('src/lib/commercial.ts'); const route=source('src/app/api/contact/route.ts');
  assert.match(c,/info@komplyint\.fi/);assert.match(c,/369283279/);
  assert.match(route,/info@komplyint\.fi/);assert.doesNotMatch(route,/gliavex@/);
})
