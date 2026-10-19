(function () {
  "use strict";

  const H = window.HTRD;
  if (!H) return;

  const state = {
    openId: null,
    query: ""
  };

  function dict() {
    return (window.I18N && window.I18N[H.getLang()]) || window.I18N.en;
  }

  function esc(value) {
    return H.escapeHTML(value);
  }

  function renderEssays() {
    const grid = document.getElementById("essays-grid");
    if (!grid) return;
    grid.innerHTML = (dict().notes.essays || []).map(function (essay) {
      return '<a class="essay-card" href="#essay-' + esc(essay.id) + '" data-essay="' + esc(essay.id) + '" aria-haspopup="dialog">' +
        '<span class="essay-card__meta"><span class="essay-card__tag">' + esc(essay.tag) + '</span>' +
        '<span>' + esc(dict().notes.readTime.replace("{n}", essay.read)) + '</span></span>' +
        '<h2>' + esc(essay.title) + '</h2>' +
        '<p>' + esc(essay.deck) + '</p>' +
        '<span class="essay-card__more">' + esc(dict().notes.open) + ' ↗</span>' +
        '</a>';
    }).join("");
  }

  function renderLexicon() {
    const grid = document.getElementById("lexicon-grid");
    const count = document.getElementById("lexicon-count");
    if (!grid) return;
    const query = state.query.trim().toLowerCase();
    const terms = (dict().notes.lexicon.terms || []).filter(function (term) {
      if (!query) return true;
      return (term.term + " " + term.def).toLowerCase().includes(query);
    });
    if (count) count.textContent = H.t("notes.lexicon.count", { n: terms.length });
    if (!terms.length) {
      grid.innerHTML = '<p class="lexicon-empty">' + esc(H.t("notes.lexicon.noResults")) + '</p>';
      return;
    }
    grid.innerHTML = terms.map(function (term) {
      return '<details><summary>' + esc(term.term) + '</summary><p>' + esc(term.def) + '</p></details>';
    }).join("");
  }

  function renderDialogContent(essay) {
    const content = document.getElementById("essay-dialog-content");
    if (!content) return;
    const paragraphs = essay.paragraphs.map(function (paragraph, index) {
      const html = '<p>' + esc(paragraph) + '</p>';
      if (index === 1) {
        return html + '<p class="essay-dialog__quote">“' + esc(essay.quote) + '”</p>';
      }
      return html;
    }).join("");
    content.innerHTML =
      '<p class="essay-dialog__tag">' + esc(dict().notes.essayLabel) + ' · ' + esc(essay.tag) + ' · ' + esc(dict().notes.readTime.replace("{n}", essay.read)) + '</p>' +
      '<h2 id="essay-dialog-title">' + esc(essay.title) + '</h2>' +
      '<p class="essay-dialog__deck">' + esc(essay.deck) + '</p>' +
      '<div class="essay-dialog__body">' + paragraphs + '</div>' +
      '<div class="essay-dialog__refs"><strong>' + esc(dict().notes.references) + '</strong>' +
      essay.references.map(function (ref) { return '<p style="margin:0 0 4px">' + esc(ref) + '</p>'; }).join("") +
      '</div>';
  }

  function openEssay(id, updateHash) {
    const essay = (dict().notes.essays || []).find(function (item) { return item.id === id; });
    const dialog = document.getElementById("essay-dialog");
    if (!essay || !dialog) return;
    state.openId = id;
    renderDialogContent(essay);
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("dialog-open");
    if (updateHash && window.history.replaceState) {
      try {
        const url = new URL(window.location.href);
        url.hash = "essay-" + id;
        window.history.replaceState(null, "", url.toString());
      } catch (error) {
        // The dialog still works if the browser refuses history updates.
      }
    }
  }

  function closeEssay() {
    const dialog = document.getElementById("essay-dialog");
    if (!dialog) return;
    state.openId = null;
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
    if (window.history.replaceState) {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch (error) {
        // Ignore restricted history contexts.
      }
    }
  }

  function initDialog() {
    const dialog = document.getElementById("essay-dialog");
    const close = document.getElementById("essay-close");
    if (close) close.addEventListener("click", closeEssay);
    if (dialog) {
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) closeEssay();
      });
      dialog.addEventListener("close", function () {
        state.openId = null;
        document.body.classList.remove("dialog-open");
        if (window.history.replaceState) {
          try {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          } catch (error) {
            // Ignore restricted history contexts.
          }
        }
      });
    }

    const grid = document.getElementById("essays-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        const card = event.target.closest("[data-essay]");
        if (card) {
          event.preventDefault();
          openEssay(card.dataset.essay, true);
        }
      });
    }

    const search = document.getElementById("lexicon-search");
    if (search) {
      search.addEventListener("input", function () {
        state.query = search.value;
        renderLexicon();
      });
    }
  }

  function openFromHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash.indexOf("essay-") === 0) {
      openEssay(hash.slice(6), false);
    }
  }

  function init() {
    renderEssays();
    renderLexicon();
    initDialog();
    openFromHash();
    H.apply();

    document.addEventListener("langchange", function () {
      renderEssays();
      renderLexicon();
      if (state.openId) {
        const essay = (dict().notes.essays || []).find(function (item) { return item.id === state.openId; });
        if (essay) renderDialogContent(essay);
      }
      H.apply();
    });

    window.addEventListener("hashchange", function () {
      const hash = window.location.hash.replace("#", "");
      if (hash.indexOf("essay-") === 0) openEssay(hash.slice(6), false);
    });
  }

  H.onReady(init);
})();
