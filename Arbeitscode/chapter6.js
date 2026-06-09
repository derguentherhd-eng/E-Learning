/* ============================================
   chapter6.js — Knowledge Hub
   ============================================ */

const CHAPTER_ID = 6;

document.getElementById("btn-complete").addEventListener("click", () => markComplete(CHAPTER_ID));
renderDots(CHAPTER_ID);

/* ── Article data ───────────────────────────── */
const POSTS = [
  { tag:"GENERATIVE TYPOGRAFIE", title:"Buchstaben, die zuhören, atmen und reagieren",    excerpt:"Das Variable-Font-Format hat uns kontinuierliche Achsen gegeben. Generative Typografie-Studios verbinden diese Achsen nun mit Mikrofonen, Beschleunigungssensoren und biometrischen Signalen.", read:"8 Min. Lesezeit", art:"stripes-warm" },
  { tag:"FALLSTUDIE",            title:"BBC News · responsives Überschriften-Weight",      excerpt:"Eine einzige Reith-Sans-Datei, Weight an die Viewport-Breite geknüpft. Das Ergebnis: Überschriften, die optische Balance von 320px Smartphone bis 4K-Newsroom-Display halten.", read:"5 Min. Lesezeit", art:"dark" },
  { tag:"PRAXISBEISPIEL",        title:"Wegeleitung für ältere Augen",                     excerpt:"Der Münchner Flughafen testete distanzreaktive Beschilderung: Schrift, die in Width und Weight zunimmt, wenn Reisende sich nähern. Verständlichkeit stieg um 22 % bei schlechtem Licht.", read:"6 Min. Lesezeit", art:"yellow" },
  { tag:"INSPIRATION",           title:"Fünf generative Typografie-Studios zum Folgen",   excerpt:"Von Pentagrams algorithmischer Identitätsarbeit bis zu OCRs audioreaktiven Logotypen – eine Tour durch die Menschen, die Buchstaben in neue Dimensionen treiben.", read:"4 Min. Lesezeit", art:"swatches" },
  { tag:"TUTORIAL",              title:"Eine Schrift an die Web Audio API koppeln",        excerpt:"Fünfzig Zeilen JavaScript verwandeln das Mikrofon in ein typografisches Instrument. RMS auf Weight mappen, Tonhöhe auf Width, Transienten auf Slant.", read:"12 Min. Lesezeit", art:"mono" },
  { tag:"INSPIRATION",           title:"Variable Schrift im Motion Design",                excerpt:"Animation entlang von Achsen (statt Überblendung statischer Schnitte) hält Typografie scharf in jedem Frame. Lottie und CSS Keyframes funktionieren beide.", read:"7 Min. Lesezeit", art:"gradient" },
];

/* ── Build article art ───────────────────────── */
function buildArt(kind) {
  const wrap = document.createElement("div");
  wrap.className = "ch6-article-art";

  switch (kind) {
    case "stripes-warm": {
      const d = document.createElement("div");
      d.className = "art-stripes-warm";
      for (let i = 0; i < 8; i++) {
        const l = document.createElement("div");
        l.style.cssText = `position:absolute;left:0;right:0;height:1px;background:rgba(19,90,228,0.6);top:${(i+1)*11}%`;
        d.appendChild(l);
      }
      const sp = document.createElement("span");
      sp.className = "font-display";
      sp.textContent = "Aa";
      d.appendChild(sp);
      wrap.appendChild(d);
      break;
    }
    case "dark": {
      const d = document.createElement("div");
      d.className = "art-dark-type";
      const sp = document.createElement("span");
      sp.className = "font-display";
      sp.textContent = "BBC";
      d.appendChild(sp);
      wrap.appendChild(d);
      break;
    }
    case "yellow": {
      const d = document.createElement("div");
      d.className = "art-yellow-type";
      const sp = document.createElement("span");
      sp.className = "font-display";
      sp.textContent = "→ Gate 27";
      d.appendChild(sp);
      wrap.appendChild(d);
      break;
    }
    case "swatches": {
      const d = document.createElement("div");
      d.className = "art-swatches";
      ["#fbd530","#135ae4","#ff6853","#ffa3cf","#269e5f","#cba6e8"].forEach(c => {
        const cell = document.createElement("div");
        cell.style.background = c;
        d.appendChild(cell);
      });
      wrap.appendChild(d);
      break;
    }
    case "mono": {
      const d = document.createElement("div");
      d.className = "art-mono font-mono";
      d.textContent = `audioCtx.analyser.getFloatTimeDomainData(buf)\nconst rms = Math.sqrt(buf.reduce((a,b) => a + b*b, 0))\nelement.style.fontVariationSettings =\n  \`"wght" \${100 + rms*800}\``;
      d.style.whiteSpace = "pre";
      wrap.appendChild(d);
      break;
    }
    case "gradient": {
      const d = document.createElement("div");
      d.className = "art-gradient";
      const sp = document.createElement("span");
      sp.className = "font-display";
      sp.textContent = "Motion";
      d.appendChild(sp);
      wrap.appendChild(d);
      break;
    }
  }
  return wrap;
}

/* ── Render grid ─────────────────────────────── */
const grid = document.getElementById("ch6-grid");
POSTS.forEach(p => {
  const article = document.createElement("article");
  article.className = "ch6-article";

  article.appendChild(buildArt(p.art));

  const body = document.createElement("div");
  body.className = "ch6-article-body";

  const tag = document.createElement("div");
  tag.className = "ch6-article-tag font-mono";
  tag.textContent = p.tag;

  const title = document.createElement("h3");
  title.className = "ch6-article-title font-display";
  title.textContent = p.title;

  const excerpt = document.createElement("p");
  excerpt.className = "ch6-article-excerpt";
  excerpt.textContent = p.excerpt;

  const footer = document.createElement("div");
  footer.className = "ch6-article-footer";

  const read = document.createElement("span");
  read.className = "ch6-article-read font-mono";
  read.textContent = p.read;

  const link = document.createElement("span");
  link.className = "ch6-article-link";
  link.textContent = "Lesen →";

  footer.appendChild(read);
  footer.appendChild(link);

  body.appendChild(tag);
  body.appendChild(title);
  body.appendChild(excerpt);
  body.appendChild(footer);
  article.appendChild(body);
  grid.appendChild(article);
});
