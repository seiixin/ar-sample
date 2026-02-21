const fs = require('fs');
const path = require('path');

function patchJsArtoolkit5() {
  const target = path.join(__dirname, '..', 'node_modules', 'jsartoolkit5', 'js', 'artoolkit.api.js');
  if (!fs.existsSync(target)) {
    return;
  }
  const src = fs.readFileSync(target, 'utf8');
  let out = src;
  // Prefer global window.artoolkit when available to avoid bundling asm.js
  const requireDebug = "var toolkit = require('../build/artoolkit.debug')";
  const requireMin = "var toolkit = require('../build/artoolkit.min')";
  const replacement =
    "var toolkit = (typeof window !== 'undefined' && window.artoolkit) ? window.artoolkit : require('../build/artoolkit.min')";
  if (out.includes(requireDebug)) {
    out = out.replace(requireDebug, replacement);
  } else if (out.includes(requireMin)) {
    out = out.replace(requireMin, replacement);
  }
  if (out !== src) {
    fs.writeFileSync(target, out, 'utf8');
  }
}

patchJsArtoolkit5();
