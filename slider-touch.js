/* ============================================
   slider-touch.js — Pointer-event drag for all
   .slider-track elements across the e-learning.
   Dispatches native "input" events so each
   chapter's existing listener handles updates.
   ============================================ */

(function () {
  function attachSlider(track) {
    if (track._sliderAttached) return;
    track._sliderAttached = true;

    const fill  = track.querySelector('.slider-fill');
    const thumb = track.querySelector('.slider-thumb');
    const input = track.querySelector('.slider-native');
    if (!fill || !thumb || !input) return;

    function updateFromX(clientX) {
      const rect = track.getBoundingClientRect();
      const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const min  = parseFloat(input.min)  || 0;
      const max  = parseFloat(input.max)  || 100;
      const step = parseFloat(input.step) || 1;
      const raw  = min + pct * (max - min);
      const val  = Math.max(min, Math.min(max, Math.round(raw / step) * step));
      input.value = val;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    let active = false;

    track.addEventListener('pointerdown', function (e) {
      active = true;
      track.setPointerCapture(e.pointerId);
      updateFromX(e.clientX);
      e.preventDefault();
    }, { passive: false });

    track.addEventListener('pointermove', function (e) {
      if (!active) return;
      updateFromX(e.clientX);
    });

    track.addEventListener('pointerup',     function () { active = false; });
    track.addEventListener('pointercancel', function () { active = false; });
  }

  function init() {
    document.querySelectorAll('.slider-track').forEach(attachSlider);

    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('slider-track')) attachSlider(node);
          if (node.querySelectorAll) node.querySelectorAll('.slider-track').forEach(attachSlider);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
