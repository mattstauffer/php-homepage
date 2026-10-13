(() => {
  const root = document.documentElement;
  const storageKey = 'php-homepage-theme';
  let savedTheme;

  try { savedTheme = localStorage.getItem(storageKey); } catch {}
  root.classList.toggle('dark', savedTheme === 'dark');

  function initReleaseHistory() {
    const history = document.querySelector('[data-release-history]');

    if (!history) {
      return;
    }

    const scroll = history.querySelector('[data-history-scroll]');
    const releases = [...history.querySelectorAll('[data-history-release]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let drag = null;
    let didDrag = false;

    function focusRelease(index) {
      const release = releases[Math.max(0, Math.min(index, releases.length - 1))];

      release.focus({ preventScroll: true });
      scroll.scrollTo({
        left: release.parentElement.offsetLeft - scroll.clientWidth / 2,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    }

    releases.forEach((release, index) => {
      release.addEventListener('keydown', (event) => {
        let target;

        switch (event.key) {
          case 'ArrowLeft':
            target = index - 1;
            break;
          case 'ArrowRight':
            target = index + 1;
            break;
          case 'Home':
            target = 0;
            break;
          case 'End':
            target = releases.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        focusRelease(target);
      });
    });

    scroll.addEventListener('dragstart', (event) => event.preventDefault());

    scroll.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) {
        return;
      }

      didDrag = false;
      drag = { x: event.clientX, left: scroll.scrollLeft, pointerId: event.pointerId };
    });

    scroll.addEventListener('pointermove', (event) => {
      if (!drag) {
        return;
      }

      const distance = event.clientX - drag.x;

      if (!didDrag && Math.abs(distance) > 5) {
        didDrag = true;
        scroll.setPointerCapture(drag.pointerId);
      }

      if (didDrag) {
        event.preventDefault();
        scroll.scrollLeft = drag.left - distance;
      }
    });

    function endDrag() {
      if (drag && scroll.hasPointerCapture(drag.pointerId)) {
        scroll.releasePointerCapture(drag.pointerId);
      }

      drag = null;
    }

    scroll.addEventListener('pointerup', endDrag);
    scroll.addEventListener('pointercancel', endDrag);
    scroll.addEventListener('lostpointercapture', endDrag);
    scroll.addEventListener('pointerleave', () => {
      if (!didDrag) {
        drag = null;
      }
    });
    scroll.addEventListener('click', (event) => {
      if (didDrag) {
        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
      }
    }, true);

    requestAnimationFrame(() => {
      scroll.scrollLeft = scroll.scrollWidth;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('[data-theme-toggle]');

    function updateThemeControl() {
      const isDark = root.classList.contains('dark');
      themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      themeButton.setAttribute('aria-pressed', String(isDark));
    }

    themeButton.addEventListener('click', () => {
      root.classList.toggle('dark');
      updateThemeControl();
      try { localStorage.setItem(storageKey, root.classList.contains('dark') ? 'dark' : 'light'); } catch {}
    });
    updateThemeControl();
    initReleaseHistory();

    const showcase = document.querySelector('[data-code-showcase]');

    if (!showcase) {
      return;
    }

    const exampleTabs = [...showcase.querySelectorAll('[role="tab"]')];
    const copyStatus = showcase.querySelector('[data-copy-status]');

    function selectExample(selectedTab) {
      exampleTabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));

        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
        panel.hidden = !isSelected;
      });
    }

    exampleTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectExample(tab));

      tab.addEventListener('keydown', (event) => {
        let nextIndex;

        switch (event.key) {
          case 'ArrowDown':
            nextIndex = (index + 1) % exampleTabs.length;
            break;
          case 'ArrowUp':
            nextIndex = (index - 1 + exampleTabs.length) % exampleTabs.length;
            break;
          case 'Home':
            nextIndex = 0;
            break;
          case 'End':
            nextIndex = exampleTabs.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        selectExample(exampleTabs[nextIndex]);
        exampleTabs[nextIndex].focus();
      });
    });

    showcase.querySelectorAll('[data-copy-example]').forEach((button) => {
      const icon = button.querySelector('use');
      const originalLabel = button.getAttribute('aria-label');
      let resetTimer;

      button.addEventListener('click', async () => {
        const panel = button.closest('[role="tabpanel"]');
        const code = panel.querySelector('[data-example-code]');

        clearTimeout(resetTimer);
        copyStatus.textContent = '';

        try {
          await navigator.clipboard.writeText(code.textContent);
          icon.setAttribute('href', '#share-check');
          button.setAttribute('aria-label', 'Copied!');
          button.title = 'Copied!';
          copyStatus.textContent = 'PHP example copied to clipboard.';
        } catch {
          const selection = window.getSelection();
          const range = document.createRange();

          range.selectNodeContents(code);
          selection.removeAllRanges();
          selection.addRange(range);
          button.setAttribute('aria-label', 'Code selected; use your keyboard to copy');
          button.title = 'Code selected; use your keyboard to copy';
          copyStatus.textContent = 'Clipboard unavailable. Code selected; use your keyboard to copy.';
        }

        resetTimer = setTimeout(() => {
          icon.setAttribute('href', '#share-document-duplicate');
          button.setAttribute('aria-label', originalLabel);
          button.title = 'Copy code';
        }, 2500);
      });
    });
  });
})();
