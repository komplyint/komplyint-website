import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicFiles = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/en/page.tsx',
  'src/app/software/page.tsx',
  'src/app/en/software/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/en/privacy/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/en/contact/page.tsx',
  'frontend/src/index.html',
  'frontend/src/app.js',
];

// Guard informational corporate pages, not protected /admin or product routes.
const forbidden = [
  [/auth\.komplyint\.fi/i, 'a central identity-provider dependency'],
  [/\/(?:login|signin|sign-in|signup|sign-up|auth)(?:\/|[?#'"]|$)/i, 'an authentication route'],
  [/(?:google\s*(?:sign\s*in|login|oauth)|GoogleLogin|GoogleOAuthProvider|googleOneTap)/i, 'Google sign-in UI'],
  [/\b(?:signIn|useSession|redirectToSignIn|requireAuth|withAuth|authGuard)\b/, 'a client authentication gate'],
  [/(?:<form[^>]+(?:password|login)|<input[^>]+type\s*=\s*['"]password['"])/i, 'a password form'],
];

test('corporate homepage has public information navigation, not a login gateway', () => {
  const home = readFileSync(join(root, 'src/app/page.tsx'), 'utf8');
  for (const section of ['home', 'software', 'privacy', 'contact']) {
    assert.ok(home.includes("pageType === '" + section + "'"), 'missing public ' + section + ' page');
  }
  assert.ok(home.includes('<nav className="main-nav"'), 'main public navigation missing');
  for (const section of ['home', 'software', 'contact']) {
    assert.ok(home.includes("href={localizedPath('" + section + "', currentLang)}"),
      'missing public navigation to ' + section);
  }
});

for (const path of publicFiles) {
  test(path + ': no login, OAuth redirect, or identity gate on public company pages', () => {
    const content = readFileSync(join(root, path), 'utf8');
    for (const [regex, description] of forbidden) {
      assert.doesNotMatch(content, regex, path + ' accidentally includes ' + description);
    }
  });
}

test('corporate homepage cannot send visitors to a login by default', () => {
  const home = readFileSync(join(root, 'src/app/page.tsx'), 'utf8');
  assert.doesNotMatch(home,
    /(?:router\.(?:replace|push)|redirect|window\.location\s*=)\s*\(\s*['"]\s*\/(?:login|auth|admin)/i);
  assert.doesNotMatch(home,
    /(?:auth\/(?:authorize|callback)|oauth\/v2\/authorize|\.well-known\/openid-configuration)/i);
});
