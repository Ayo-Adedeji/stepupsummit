const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'src');
const files = {};

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx?|js)$/.test(entry.name)) files[entry.name] = full;
  }
}
walk(root);

const importRe = /from\s+["'](\.[^"']+)["']/g;
const used = new Set();

function resolve(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [base, base + '.jsx', base + '.js', path.join(base, 'index.jsx'), path.join(base, 'index.js')];
  for (const c of candidates) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
}

const queue = [path.join(root, 'main.jsx'), path.join(root, 'App.jsx')];
while (queue.length) {
  const f = queue.pop();
  if (!fs.existsSync(f) || used.has(f)) continue;
  used.add(f);
  const code = fs.readFileSync(f, 'utf8');
  let m;
  importRe.lastIndex = 0;
  while ((m = importRe.exec(code))) {
    const r = resolve(f, m[1]);
    if (r && !used.has(r)) queue.push(r);
  }
}

const usedNames = new Set([...used].map((f) => path.basename(f)));
console.log('=== USED FILES ===');
[...usedNames].sort().forEach((n) => console.log(n));

console.log('\n=== UNUSED FILES (candidate for deletion) ===');
Object.keys(files)
  .filter((n) => !usedNames.has(n))
  .sort()
  .forEach((n) => console.log(n));
