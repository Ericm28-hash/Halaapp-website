const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const pages = [
  {
    file: 'student-moving-durban.html',
    checks: [
      ['title tag', '<title>Student Moving Durban | UKZN, DUT, MUT | HALA MOVE</title>'],
      ['canonical', 'https://www.halaapp.co.za/student-moving-durban'],
      ['schema webpage id', '"@id": "https://www.halaapp.co.za/student-moving-durban#webpage"'],
      ['schema service type', '"serviceType": "Student Moving"'],
      ['schema faq id', 'student-moving-durban#faq'],
      ['schema breadcrumb name', '"name": "Student Moving Durban"'],
      ['h1', '<h1 class="page-title">Student Moving in Durban</h1>'],
      ['launching 2026', 'Launching 2026'],
      ['UKZN mention', 'UKZN'],
      ['DUT mention', 'DUT'],
      ['MUT mention', 'MUT'],
      ['Mancosa mention', 'Mancosa'],
      ['Varsity College', 'Varsity College'],
      ['King Shaka airport', 'King Shaka'],
      ['parents tracking', 'parents'],
      ['PayFast escrow', 'PayFast'],
      ['R150 anchor', 'R150'],
      ['registration week', 'registration week'],
      ['SA ID verified', 'South African ID'],
      ['FAQ how much', 'How much does student moving in Durban cost'],
      ['toc present', 'On this page'],
      ['bakkie link', './bakkie-hire-durban.html'],
      ['furniture removal link', './furniture-removal-durban.html'],
      ['CSS intact', '.hero-h1{'],
      ['nav intact', 'nav-inner'],
      ['footer intact', 'footer-grid'],
      ['JS intact', 'IntersectionObserver'],
      ['no representative disclaimer', null, 'Representative experiences from our early'],
    ]
  },
  {
    file: 'business-transport-durban.html',
    checks: [
      ['title tag', '<title>Business Transport Durban | Contracts from R5,000/month | HALA MOVE</title>'],
      ['canonical', 'https://www.halaapp.co.za/business-transport-durban'],
      ['schema webpage id', '"@id": "https://www.halaapp.co.za/business-transport-durban#webpage"'],
      ['schema service type', '"serviceType": "Business Transport Contracts"'],
      ['schema faq id', 'business-transport-durban#faq'],
      ['schema breadcrumb name', '"name": "Business Transport Durban"'],
      ['schema offer price', '"price": "5000"'],
      ['h1', '<h1 class="page-title">Business Transport in Durban</h1>'],
      ['launching 2026', 'Launching 2026'],
      ['R5,000 anchor', 'R5,000/month'],
      ['construction', 'Construction companies'],
      ['medical', 'Medical facilities'],
      ['e-commerce', 'E-commerce sellers'],
      ['retailers', 'Retailers and manufacturers'],
      ['universities', 'Universities and schools'],
      ['government', 'Government and municipal'],
      ['SLA terms', 'SLA terms'],
      ['ESG reports', 'ESG report'],
      ['JSE disclosure', 'JSE'],
      ['consolidated billing', 'consolidated monthly'],
      ['fleet dashboard', 'fleet dashboard'],
      ['cold chain', 'cold-chain'],
      ['8 tonne truck', '8-tonne'],
      ['PayFast mentioned', 'verified'],
      ['business email', 'business@halaapp.co.za'],
      ['pricing tiers table', 'Enterprise'],
      ['toc present', 'On this page'],
      ['CSS intact', '.hero-h1{'],
      ['nav intact', 'nav-inner'],
      ['footer intact', 'footer-grid'],
      ['JS intact', 'IntersectionObserver'],
      ['no representative disclaimer', null, 'Representative experiences from our early'],
    ]
  }
];

let totalPass = 0, totalFail = 0;

pages.forEach(page => {
  console.log('\n=== ' + page.file + ' ===');
  const fp = path.join(ROOT, page.file);
  if (!fs.existsSync(fp)) {
    console.log('FAIL: file does not exist');
    totalFail++;
    return;
  }
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n').length;
  const bytes = src.length;
  console.log('lines: ' + lines + ' · bytes: ' + bytes);

  page.checks.forEach(check => {
    const [label, mustContain, mustNotContain] = check;
    let ok;
    if (mustContain) {
      ok = src.includes(mustContain);
    } else if (mustNotContain) {
      ok = !src.includes(mustNotContain);
    }
    if (ok) { totalPass++; console.log('  PASS: ' + label); }
    else { totalFail++; console.log('  FAIL: ' + label); }
  });

  // Schema.org JSON validity check — must parse
  try {
    const schemaMatch = src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (schemaMatch) {
      JSON.parse(schemaMatch[1]);
      totalPass++; console.log('  PASS: schema JSON parses');
    } else {
      totalFail++; console.log('  FAIL: schema JSON not found');
    }
  } catch (e) {
    totalFail++; console.log('  FAIL: schema JSON invalid: ' + e.message);
  }

  // Balanced tag sanity checks (rough)
  const divOpen = (src.match(/<div[\s>]/g) || []).length;
  const divClose = (src.match(/<\/div>/g) || []).length;
  const secOpen = (src.match(/<section[\s>]/g) || []).length;
  const secClose = (src.match(/<\/section>/g) || []).length;
  const scriptOpen = (src.match(/<script[\s>]/g) || []).length;
  const scriptClose = (src.match(/<\/script>/g) || []).length;
  console.log('  tag balance: divs=' + divOpen + '/' + divClose + '  sections=' + secOpen + '/' + secClose + '  scripts=' + scriptOpen + '/' + scriptClose);
  if (divOpen === divClose && secOpen === secClose && scriptOpen === scriptClose) {
    totalPass++; console.log('  PASS: tag balance');
  } else {
    totalFail++; console.log('  FAIL: tag balance (opens != closes)');
  }
});

console.log('\n════════════════════════════');
console.log('TOTAL: ' + totalPass + ' pass, ' + totalFail + ' fail');
process.exit(totalFail > 0 ? 1 : 0);
