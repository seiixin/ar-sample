const fs = require('fs');
const path = require('path');

function patchJsArtoolkit5() {
  const target = path.join(__dirname, '..', 'node_modules', 'jsartoolkit5', 'js', 'artoolkit.api.js');
  if (!fs.existsSync(target)) {
    return;
  }
  const src = fs.readFileSync(target, 'utf8');
  const before = "require('../build/artoolkit.debug')";
  const after = "require('../build/artoolkit.min')";
  if (src.includes(before)) {
    const out = src.replace(before, after);
    fs.writeFileSync(target, out, 'utf8');
  }
}

patchJsArtoolkit5();
