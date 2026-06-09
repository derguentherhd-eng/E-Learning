/* ============================================
   chapterpage.js — Chapter Overview Page
   ============================================ */

const CHAPTER_DATA = [
  { id: 1, title: "E-Reader-Typografie",       subtitle: "Leseerfahrung anpassen",       slug: "chapter1" },
  { id: 2, title: "Karteikarten-Karussell",    subtitle: "Schriftlehre lernen",          slug: "chapter2" },
  { id: 3, title: "Typografie-Zeitstrahl",     subtitle: "1970 → 2016",                  slug: "chapter3" },
  { id: 4, title: "Variable Font Playground",  subtitle: "Achsen in Bewegung",           slug: "chapter4" },
  { id: 5, title: "Generative Eingaben",       subtitle: "Audio- & distanzreaktiv",      slug: "chapter5" },
  { id: 6, title: "Wissenszentrum",            subtitle: "Artikel & Fallstudien",        slug: "chapter6" },
];

function resetProgress() {
  try { localStorage.removeItem(PROGRESS_KEY); } catch {}
  try { const s = JSON.parse(window.name || "{}"); delete s[PROGRESS_KEY]; window.name = JSON.stringify(s); } catch {}
  render();
}

/* ── Chapter art per ID ──────────────────────── */
function buildArt(id) {
  switch (id) {
    case 1: {
      const div   = document.createElement("div");
      div.className = "chapter-card-art art-1";
      const inner = document.createElement("div");
      inner.className = "art-1-inner";
      [100, 95, 80, 92, 70, 88, 65].forEach(w => {
        const l = document.createElement("div");
        l.className  = "art-1-line";
        l.style.width = w + "%";
        inner.appendChild(l);
      });
      div.appendChild(inner);
      return div;
    }
    case 2: {
      const div  = document.createElement("div");
      div.className = "chapter-card-art art-2";
      const wrap = document.createElement("div");
      wrap.className = "art-2-cards";
      [["Bb", -6, 4], ["Aa", 0, 0], ["Cc", 6, 4]].forEach(([label, rot, ty]) => {
        const card = document.createElement("div");
        card.className = "art-2-card font-display";
        card.textContent = label;
        card.style.transform = `rotate(${rot}deg) translateY(${ty}px)`;
        wrap.appendChild(card);
      });
      div.appendChild(wrap);
      return div;
    }
    case 3: {
      const div  = document.createElement("div");
      div.className = "chapter-card-art art-3";
      const line = document.createElement("div");
      line.className = "art-3-line";
      div.appendChild(line);
      [20, 40, 60, 80].forEach(t => {
        const dot = document.createElement("div");
        dot.style.cssText = `position:absolute;left:24px;top:${t}%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:var(--foreground)`;
        div.appendChild(dot);
      });
      return div;
    }
    case 4: {
      const div = document.createElement("div");
      div.className = "chapter-card-art art-4";
      const sp  = document.createElement("span");
      sp.className = "art-4-letter font-display";
      sp.style.fontStretch = "125%";
      sp.textContent = "Aa";
      div.appendChild(sp);
      return div;
    }
    case 5: {
      const div = document.createElement("div");
      div.className = "chapter-card-art art-5";
      for (let i = 0; i < 18; i++) {
        const l      = document.createElement("div");
        const scaleX = 0.4 + Math.sin(i) * 0.4 + 0.4;
        const origin = i % 2 ? "left" : "right";
        l.style.cssText = `position:absolute;height:1px;left:0;right:0;top:${(i+1)*5}%;background:rgba(250,243,227,0.6);opacity:0.4;transform:scaleX(${scaleX});transform-origin:${origin}`;
        div.appendChild(l);
      }
      const lbl = document.createElement("span");
      lbl.className  = "art-5-label font-display";
      lbl.textContent = "type()";
      div.appendChild(lbl);
      return div;
    }
    case 6: {
      const div = document.createElement("div");
      div.className = "chapter-card-art art-6";
      ["#faf3e3", "#ff6853", "#135ae4", "#fbd530"].forEach(c => {
        const cell = document.createElement("div");
        cell.className = "art-6-cell";
        cell.style.background = c;
        div.appendChild(cell);
      });
      return div;
    }
    default: return document.createElement("div");
  }
}

/* ── SVG helpers ─────────────────────────────── */
function svgArrow() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>`;
}
function svgCheck() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;
}
function svgLock() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>`;
}

/* ── Shared card body ────────────────────────── */
function buildCardBody(ch) {
  const body = document.createElement("div");
  body.className = "chapter-card-body";

  const top = document.createElement("div");
  top.className = "chapter-card-top";

  const num = document.createElement("span");
  num.className  = "chapter-card-num font-mono";
  num.textContent = "CH." + String(ch.id).padStart(2, "0");
  top.appendChild(num);

  const foot = document.createElement("div");
  foot.className = "chapter-card-foot";

  const name = document.createElement("h3");
  name.className  = "chapter-card-name font-display";
  name.textContent = ch.title;

  const sub = document.createElement("p");
  sub.className  = "chapter-card-sub";
  sub.textContent = ch.subtitle;

  foot.appendChild(name);
  foot.appendChild(sub);
  body.appendChild(top);
  body.appendChild(foot);

  return { body, top };
}

/* ── Render ──────────────────────────────────── */
function render() {
  const prog      = readProgress();
  const completed = prog.completed || [];
  const count     = completed.length;

  document.getElementById("progress-count").innerHTML = `${count}<span>/6</span>`;

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.style.display = count > 0 ? "block" : "none";
  resetBtn.onclick = resetProgress;

  const grid = document.getElementById("chapters-grid");
  grid.innerHTML = "";

  CHAPTER_DATA.forEach((ch, i) => {
    const isUnlocked = ch.id === 1 || completed.includes(ch.id - 1);
    const isDone     = completed.includes(ch.id);
    const { body, top } = buildCardBody(ch);

    if (isUnlocked) {
      const card = document.createElement("a");
      card.href  = ch.slug + ".html";
      card.className = "chapter-card";
      card.style.animationDelay = (i * 50) + "ms";

      const icon = document.createElement("div");
      icon.className = isDone ? "chapter-card-check" : "chapter-card-icon";
      icon.innerHTML = isDone ? svgCheck() : svgArrow();
      top.appendChild(icon);

      card.appendChild(buildArt(ch.id));
      card.appendChild(body);
      grid.appendChild(card);
    } else {
      const card = document.createElement("div");
      card.className = "chapter-card-locked";
      card.style.animationDelay = (i * 50) + "ms";

      const lockIcon = document.createElement("div");
      lockIcon.innerHTML = svgLock();
      top.appendChild(lockIcon);

      const lockMsg = document.createElement("div");
      lockMsg.className  = "chapter-lock-msg font-mono";
      lockMsg.textContent = `CH.${String(ch.id - 1).padStart(2, "0")} abschließen zum Entsperren`;

      card.appendChild(body);
      card.appendChild(lockMsg);
      grid.appendChild(card);
    }
  });
}

// Re-render whenever this page becomes visible:
//   - pageshow covers both fresh loads and bfcache restores (back/forward button)
//   - visibilitychange covers tab-switching and focus returns
//   - storage covers changes made in another tab/window
window.addEventListener("pageshow", render);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});
window.addEventListener("storage", e => {
  if (e.key === PROGRESS_KEY || e.key === null) render();
});

render();
