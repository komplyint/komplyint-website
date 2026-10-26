import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// Build-only bridge: reuse the real website dictionaries; never translate at runtime.
const root = fileURLToPath(new URL('..', import.meta.url))
const output = resolve(process.argv[2] || join(root, '.cache/public-portfolio.json'))
const temporary = mkdtempSync(join(tmpdir(), 'komplyint-copy-'))
const sourceFiles = ['src/lib/commercial.ts', 'src/lib/i18n-sv.ts', 'src/lib/i18n-ui.ts', 'src/lib/i18n.ts']
const labels = {
  fi: {title:'Digipalvelut yrityksille', kicker:'PALVELUESITE / SUOMI', overview:'Palvelumme', serviceLabel:'PALVELU'},
  en: {title:'Digital services for business', kicker:'SERVICE BROCHURE / ENGLISH', overview:'Our services', serviceLabel:'SERVICE'},
  sv: {title:'Digitala tj\u00e4nster f\u00f6r f\u00f6retag', kicker:'TJ\u00c4NSTEBROSCHYR / SVENSKA', overview:'V\u00e5ra tj\u00e4nster', serviceLabel:'TJ\u00c4NST'},
}
try {
  const program = ts.createProgram(sourceFiles.map(p=>join(root,p)), {
    target:ts.ScriptTarget.ES2020, module:ts.ModuleKind.CommonJS,
    rootDir:join(root,'src/lib'), outDir:temporary, strict:true,
    skipLibCheck:true, types:[], noEmitOnError:true,
  })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  if (diagnostics.some(d=>d.category===ts.DiagnosticCategory.Error)) {
    throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory:()=>root, getCanonicalFileName:p=>p, getNewLine:()=> '\n',
    }))
  }
  assert.equal(program.emit().emitSkipped, false, 'Website dictionaries must compile')
  const require = createRequire(import.meta.url)
  const {content, services, serviceSlugs, contactEmail} = require(join(temporary,'commercial.js'))
  const {ui} = require(join(temporary,'i18n-ui.js'))
  const locales = {}
  for (const lang of ['fi','en','sv']) {
    const t=content[lang], u=ui[lang]
    assert.equal(services[lang].length,6,lang+' must contain six services')
    assert.equal(t.process.steps.length,4,lang+' must contain four process steps')
    locales[lang] = {
      ...labels[lang], language:lang==='sv'?'sv-FI':lang,
      subtitle:t.hero.title, lead:t.hero.text, strapline:t.hero.label,
      businessIdLine:t.footer, subject:t.intro.title, overviewLead:t.area.text,
      tasks:t.area.examples, deliverable:t.area.delivered, limit:t.area.boundaries,
      approach:t.process.eyebrow,
      steps:t.process.steps.map((step,i)=>[String(i+1).padStart(2,'0')+' / '+step.title,step.body]),
      contacts:t.cta.title, contactcopy:t.cta.text, note:t.footerNote,
      deliveryLabel:u.serviceDetail.method, email:contactEmail,
      serviceUrls:serviceSlugs.map(slug=>'https://www.komplyint.fi'+(lang==='fi'?'':'/'+lang)+'/services/'+slug),
      services:services[lang].map(s=>[s.title,s.intro,s.examples,s.deliverable,s.boundaries]),
    }
    for (const [key,value] of Object.entries(locales[lang])) {
      assert.ok(value!==undefined && value!==null,lang+' missing '+key)
    }
  }
  const sourceHashes=Object.fromEntries(sourceFiles.map(path=>[path,createHash('sha256').update(readFileSync(join(root,path))).digest('hex')]))
  const snapshot={schema:'komplyint-public-portfolio.v2',sourceHashes,locales}
  mkdirSync(dirname(output),{recursive:true})
  writeFileSync(output,JSON.stringify(snapshot,null,2)+'\n','utf8')
  console.log(JSON.stringify({result:'PASS',locales:Object.keys(locales),services:18,processSteps:12,output,sourceHashes}))
} finally {
  rmSync(temporary,{recursive:true,force:true})
}
