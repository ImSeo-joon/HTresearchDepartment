(function () {
  "use strict";

  const H = window.HTRD;
  if (!H || !window.PAPER_INDEX) return;

  const state = {
    query: "",
    field: "",
    type: "",
    era: "",
    sort: "newest",
    openId: null
  };

  function dict() {
    return (window.I18N && window.I18N[H.getLang()]) || window.I18N.en;
  }

  function esc(value) {
    return H.escapeHTML(value);
  }

  function fields() {
    return dict().studio.form.engineeringFields || [];
  }

  function groups() {
    return dict().studio.form.engineeringGroups || [];
  }

  function fieldLabel(key) {
    const field = fields().find(function (item) { return item.value === key; });
    return field ? field.label : key;
  }

  function typeLabel(key) {
    return (dict().papers.types && dict().papers.types[key]) || key;
  }

  function noteFor(paper) {
    const lang = H.getLang();
    if (paper.note && paper.note[lang]) return paper.note[lang];
    if (paper.note && paper.note.en) return paper.note.en;
    return (dict().papers.notes && dict().papers.notes[paper.id]) || "";
  }

  function citation(paper) {
    return paper.authors + " (" + paper.year + "). " + paper.title + ". " + paper.venue + ". " + paper.url;
  }

  function filteredPapers() {
    const query = state.query.trim().toLowerCase();
    const list = window.PAPER_INDEX.filter(function (paper) {
      if (state.field && paper.field !== state.field) return false;
      if (state.type && paper.type !== state.type) return false;
      if (state.era === "since2024" && paper.year < 2024) return false;
      if (state.era === "from2020" && (paper.year < 2020 || paper.year > 2023)) return false;
      if (state.era === "before2020" && paper.year >= 2020) return false;
      if (!query) return true;
      return [
        paper.title,
        paper.authors,
        paper.short,
        paper.venue,
        fieldLabel(paper.field),
        typeLabel(paper.type),
        noteFor(paper),
        paper.tags.join(" ")
      ].join(" ").toLowerCase().includes(query);
    });
    return list.sort(function (a, b) {
      if (state.sort === "oldest") return a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
      if (state.sort === "title") return a.title.localeCompare(b.title);
      return b.date.localeCompare(a.date) || a.title.localeCompare(b.title);
    });
  }

  function renderStats() {
    const container = document.getElementById("paper-stats");
    if (!container) return;
    const fieldCount = new Set(window.PAPER_INDEX.map(function (paper) { return paper.field; })).size;
    const max = Math.max.apply(null, window.PAPER_INDEX.map(function (paper) { return paper.year; }));
    const recent = window.PAPER_INDEX.filter(function (paper) { return paper.year >= 2024; }).length;
    container.innerHTML =
      '<span><strong>' + window.PAPER_INDEX.length + '</strong> ' + esc(dict().papers.stats.papers) + '</span>' +
      '<span><strong>' + fieldCount + '</strong> ' + esc(dict().papers.stats.fields) + '</span>' +
      '<span><strong>' + max + '</strong> ' + esc(dict().papers.stats.latest) + '</span>' +
      '<span><strong>' + recent + '</strong> ' + esc(dict().papers.stats.recent) + '</span>';
  }

  function renderOptions() {
    const fieldSelect = document.getElementById("paper-field");
    const typeSelect = document.getElementById("paper-type");
    const eraSelect = document.getElementById("paper-era");
    const sortSelect = document.getElementById("paper-sort");
    const usedFields = new Set(window.PAPER_INDEX.map(function (paper) { return paper.field; }));
    if (fieldSelect) {
      const available = fields().filter(function (field) { return usedFields.has(field.value); });
      const grouped = groups().map(function (group) {
        const inGroup = available.filter(function (field) { return field.group === group.value; });
        if (!inGroup.length) return "";
        return '<optgroup label="' + esc(group.label) + '">' + inGroup.map(function (field) {
          return '<option value="' + esc(field.value) + '">' + esc(field.label) + '</option>';
        }).join("") + '</optgroup>';
      }).join("");
      const ungrouped = available.filter(function (field) { return !field.group; }).map(function (field) {
        return '<option value="' + esc(field.value) + '">' + esc(field.label) + '</option>';
      }).join("");
      fieldSelect.innerHTML = '<option value="">' + esc(dict().papers.filters.allFields) + '</option>' +
        grouped + ungrouped;
      fieldSelect.value = state.field;
    }
    if (typeSelect) {
      const types = ["foundational", "method", "survey", "applied"];
      typeSelect.innerHTML = '<option value="">' + esc(dict().papers.filters.allTypes) + '</option>' +
        types.map(function (type) {
          return '<option value="' + type + '">' + esc(typeLabel(type)) + '</option>';
        }).join("");
      typeSelect.value = state.type;
    }
    if (eraSelect) {
      eraSelect.innerHTML =
        '<option value="">' + esc(dict().papers.filters.allYears) + '</option>' +
        '<option value="since2024">' + esc(dict().papers.filters.since2024) + '</option>' +
        '<option value="from2020">' + esc(dict().papers.filters.from2020) + '</option>' +
        '<option value="before2020">' + esc(dict().papers.filters.before2020) + '</option>';
      eraSelect.value = state.era;
    }
    if (sortSelect) {
      sortSelect.innerHTML =
        '<option value="newest">' + esc(dict().papers.filters.newest) + '</option>' +
        '<option value="oldest">' + esc(dict().papers.filters.oldest) + '</option>' +
        '<option value="title">' + esc(dict().papers.filters.title) + '</option>';
      sortSelect.value = state.sort;
    }
  }

  function matrixEntries() {
    const stored = H.safeStorage("htrd.matrix.v1", []);
    return Array.isArray(stored) ? stored : [];
  }

  function isInMatrix(paper) {
    return matrixEntries().some(function (entry) {
      return String(entry.title || "").toLowerCase() === paper.title.toLowerCase();
    });
  }

  function addToMatrix(paper) {
    const entries = matrixEntries();
    if (entries.some(function (entry) { return String(entry.title || "").toLowerCase() === paper.title.toLowerCase(); })) {
      H.toast(H.t("papers.card.added"));
      return;
    }
    entries.unshift({
      id: "p" + paper.id,
      author: paper.authors,
      title: paper.title,
      method: fieldLabel(paper.field) + " · " + typeLabel(paper.type),
      finding: noteFor(paper),
      relevance: "high",
      use: "Core reading for " + fieldLabel(paper.field) + "."
    });
    H.storeJSON("htrd.matrix.v1", entries);
    renderGrid();
    H.toast(H.t("papers.card.added"));
  }

  function renderGrid() {
    const grid = document.getElementById("papers-grid");
    const empty = document.getElementById("papers-empty");
    const count = document.getElementById("paper-count");
    if (!grid) return;
    const list = filteredPapers();
    if (count) count.textContent = H.t("papers.filters.count", { n: list.length });
    if (empty) empty.hidden = list.length > 0;
    grid.innerHTML = list.map(function (paper) {
      const inMatrix = isInMatrix(paper);
      const isNew = paper.year >= 2024;
      return '<article class="paper-card' + (isNew ? " paper-card--recent" : "") + '" data-paper="' + esc(paper.id) + '">' +
        '<div class="paper-card__meta">' +
          '<span class="paper-card__field">' + esc(fieldLabel(paper.field)) + '</span>' +
          '<span>' + paper.year + '</span>' +
          '<span>' + esc(typeLabel(paper.type)) + '</span>' +
          (isNew ? '<span class="paper-card__new">' + esc(dict().papers.card.new) + '</span>' : "") +
        '</div>' +
        '<h3><button class="paper-card__title" type="button" data-open-paper="' + esc(paper.id) + '">' + esc(paper.title) + '</button></h3>' +
        '<p class="paper-card__authors">' + esc(paper.short) + ' · ' + esc(paper.venue) + '</p>' +
        '<p class="paper-card__note">' + esc(noteFor(paper)) + '</p>' +
        '<div class="paper-card__tags">' + paper.tags.map(function (tag) {
          return '<span>' + esc(tag) + '</span>';
        }).join("") + '</div>' +
        '<div class="paper-card__actions">' +
          '<a href="' + esc(paper.url) + '" target="_blank" rel="noopener">' + esc(dict().papers.card.readSource) + ' ↗</a>' +
          '<button type="button" data-open-paper="' + esc(paper.id) + '">' + esc(dict().papers.card.details) + '</button>' +
          '<button type="button" data-add-paper="' + esc(paper.id) + '"' + (inMatrix ? " disabled" : "") + '>' +
            esc(inMatrix ? dict().papers.card.added : dict().papers.card.addMatrix) +
          '</button>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function openPaper(id) {
    const paper = window.PAPER_INDEX.find(function (item) { return item.id === id; });
    const dialog = document.getElementById("paper-dialog");
    const content = document.getElementById("paper-dialog-content");
    if (!paper || !dialog || !content) return;
    state.openId = id;
    const d = dict();
    content.innerHTML =
      '<p class="essay-dialog__tag">' + esc(fieldLabel(paper.field)) + ' · ' + esc(typeLabel(paper.type)) + ' · ' + paper.year + '</p>' +
      '<h2 id="paper-dialog-title">' + esc(paper.title) + '</h2>' +
      '<p class="paper-detail__authors">' + esc(paper.authors) + '</p>' +
      '<p class="paper-detail__venue">' + esc(paper.venue) + ' · ' + paper.year + '</p>' +
      '<div class="paper-detail__note"><h3>' + esc(d.papers.dialog.why) + '</h3><p>' + esc(noteFor(paper)) + '</p></div>' +
      '<div class="paper-detail__tags"><h3>' + esc(d.papers.dialog.tags) + '</h3><div class="paper-card__tags">' +
        paper.tags.map(function (tag) { return '<span>' + esc(tag) + '</span>'; }).join("") +
      '</div></div>' +
      '<div class="paper-detail__citation"><h3>' + esc(d.papers.dialog.citation) + '</h3><p>' + esc(citation(paper)) + '</p></div>' +
      '<div class="paper-detail__actions">' +
        '<a class="btn btn--primary btn--small" href="' + esc(paper.url) + '" target="_blank" rel="noopener">' + esc(d.papers.dialog.readSource) + '</a>' +
        '<button class="btn btn--outline btn--small" type="button" data-dialog-add="' + esc(paper.id) + '">' + esc(d.papers.dialog.addMatrix) + '</button>' +
        '<button class="btn btn--outline btn--small" type="button" data-dialog-copy="' + esc(paper.id) + '">' + esc(d.papers.dialog.copyCitation) + '</button>' +
      '</div>';
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("dialog-open");
  }

  function closePaper() {
    const dialog = document.getElementById("paper-dialog");
    if (!dialog) return;
    state.openId = null;
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  }

  function exportCsv() {
    const list = filteredPapers();
    const headers = ["Year", "Field", "Type", "Title", "Authors", "Venue", "URL", "Note"];
    const rows = list.map(function (paper) {
      return [paper.year, fieldLabel(paper.field), typeLabel(paper.type), paper.title, paper.authors, paper.venue, paper.url, noteFor(paper)];
    });
    const csv = [headers].concat(rows).map(function (row) {
      return row.map(function (cell) {
        return '"' + String(cell == null ? "" : cell).replace(/"/g, '""') + '"';
      }).join(",");
    }).join("\r\n");
    H.downloadText("engineering-paper-index.csv", "\ufeff" + csv, "text/csv");
  }

  function bind() {
    const search = document.getElementById("paper-search");
    const field = document.getElementById("paper-field");
    const type = document.getElementById("paper-type");
    const era = document.getElementById("paper-era");
    const sort = document.getElementById("paper-sort");
    if (search) search.addEventListener("input", function () { state.query = search.value; renderGrid(); });
    if (field) field.addEventListener("change", function () { state.field = field.value; renderGrid(); });
    if (type) type.addEventListener("change", function () { state.type = type.value; renderGrid(); });
    if (era) era.addEventListener("change", function () { state.era = era.value; renderGrid(); });
    if (sort) sort.addEventListener("change", function () { state.sort = sort.value; renderGrid(); });

    const reset = document.getElementById("paper-reset");
    if (reset) reset.addEventListener("click", function () {
      state.query = "";
      state.field = "";
      state.type = "";
      state.era = "";
      state.sort = "newest";
      if (search) search.value = "";
      renderOptions();
      renderGrid();
    });

    const exportButton = document.getElementById("paper-export");
    if (exportButton) exportButton.addEventListener("click", exportCsv);

    const grid = document.getElementById("papers-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        const open = event.target.closest("[data-open-paper]");
        const add = event.target.closest("[data-add-paper]");
        if (open) openPaper(open.dataset.openPaper);
        if (add) {
          const paper = window.PAPER_INDEX.find(function (item) { return item.id === add.dataset.addPaper; });
          if (paper) addToMatrix(paper);
        }
      });
    }

    const close = document.getElementById("paper-dialog-close");
    if (close) close.addEventListener("click", closePaper);
    const dialog = document.getElementById("paper-dialog");
    if (dialog) {
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) closePaper();
      });
      dialog.addEventListener("close", function () {
        state.openId = null;
        document.body.classList.remove("dialog-open");
      });
      dialog.addEventListener("click", function (event) {
        const add = event.target.closest("[data-dialog-add]");
        const copy = event.target.closest("[data-dialog-copy]");
        if (add) {
          const paper = window.PAPER_INDEX.find(function (item) { return item.id === add.dataset.dialogAdd; });
          if (paper) addToMatrix(paper);
        }
        if (copy) {
          const paper = window.PAPER_INDEX.find(function (item) { return item.id === copy.dataset.dialogCopy; });
          if (paper) {
            H.copyText(citation(paper)).then(function () {
              H.toast(H.t("papers.card.citationCopied"));
            }).catch(function () {
              H.toast(H.t("common.empty"));
            });
          }
        }
      });
    }
  }

  function init() {
    renderStats();
    renderOptions();
    renderGrid();
    bind();
    H.apply();

    document.addEventListener("langchange", function () {
      renderStats();
      renderOptions();
      renderGrid();
      if (state.openId) openPaper(state.openId);
      H.apply();
    });
  }

  H.onReady(init);
})();
