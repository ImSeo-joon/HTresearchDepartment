(function () {
  "use strict";

  const H = window.HTRD;
  if (!H) return;

  const TAB_IDS = ["matrix", "sampling", "abstract", "library"];
  const MATRIX_KEY = "htrd.matrix.v1";
  const ABSTRACT_KEY = "htrd.abstract.v1";
  let activeTab = "matrix";
  let matrixEntries = [];
  let matrixQuery = "";
  let matrixFilter = "";
  let abstractGenerated = false;
  let abstractSaveTimer = null;

  function dict() {
    return (window.I18N && window.I18N[H.getLang()]) || window.I18N.en;
  }

  function esc(value) {
    return H.escapeHTML(value);
  }

  function locale() {
    return H.getLang() === "zh" ? "zh-CN" : H.getLang() === "fr" ? "fr-FR" : "en-GB";
  }

  function formatNumber(value) {
    return Number(value).toLocaleString(locale(), { maximumFractionDigits: 0 });
  }

  function activateTab(id, options) {
    if (!TAB_IDS.includes(id)) id = "matrix";
    activeTab = id;
    TAB_IDS.forEach(function (tabId) {
      const button = document.getElementById("tab-" + tabId);
      const panel = document.getElementById(tabId);
      const on = tabId === id;
      if (button) {
        button.classList.toggle("is-active", on);
        button.setAttribute("aria-selected", on ? "true" : "false");
        button.tabIndex = on ? 0 : -1;
      }
      if (panel) {
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      }
    });
    if (window.history.replaceState && (!options || options.updateHash !== false)) {
      try {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, "", url.toString());
      } catch (error) {
        // The panel still works if the browser refuses history updates.
      }
    }
    if (options && options.scroll) {
      const panel = document.getElementById(id);
      if (panel) window.requestAnimationFrame(function () {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function initTabs() {
    const buttons = Array.from(document.querySelectorAll("[data-tab]"));
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () { activateTab(button.dataset.tab); });
      button.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = buttons.length - 1;
        const next = buttons[nextIndex];
        activateTab(next.dataset.tab);
        next.focus();
      });
    });
    const fromHash = window.location.hash.replace("#", "");
    const hasHash = TAB_IDS.includes(fromHash);
    activateTab(hasHash ? fromHash : "matrix", { scroll: hasHash, updateHash: false });
    window.addEventListener("hashchange", function () {
      const id = window.location.hash.replace("#", "");
      if (TAB_IDS.includes(id) && id !== activeTab) activateTab(id, { scroll: true, updateHash: false });
    });
  }

  /* -----------------------------------------------------------------------
     Literature matrix
     ----------------------------------------------------------------------- */

  function loadMatrix() {
    const stored = H.safeStorage(MATRIX_KEY, []);
    if (!Array.isArray(stored)) return [];
    return stored.filter(function (entry) {
      return entry && typeof entry === "object";
    }).map(function (entry) {
      return {
        id: entry.id || makeId(),
        author: String(entry.author || ""),
        title: String(entry.title || ""),
        method: String(entry.method || ""),
        finding: String(entry.finding || ""),
        relevance: ["high", "medium", "low"].includes(entry.relevance) ? entry.relevance : "medium",
        use: String(entry.use || "")
      };
    });
  }

  function makeId() {
    return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function saveMatrix() {
    H.storeJSON(MATRIX_KEY, matrixEntries);
  }

  function relevanceLabel(value) {
    return H.t("toolkit.matrix." + value);
  }

  function renderMatrix() {
    const body = document.getElementById("matrix-body");
    const count = document.getElementById("matrix-count");
    if (!body) return;
    const query = matrixQuery.trim().toLowerCase();
    const filtered = matrixEntries.filter(function (entry) {
      if (matrixFilter && entry.relevance !== matrixFilter) return false;
      if (!query) return true;
      return [entry.author, entry.title, entry.method, entry.finding, entry.use]
        .join(" ").toLowerCase().includes(query);
    });
    if (count) count.textContent = H.t("toolkit.matrix.count", { n: filtered.length });

    if (!matrixEntries.length) {
      body.innerHTML = '<tr><td colspan="6" class="matrix-empty">' + esc(H.t("toolkit.matrix.empty")) + '</td></tr>';
      return;
    }
    if (!filtered.length) {
      body.innerHTML = '<tr><td colspan="6" class="matrix-empty">' + esc(H.t("toolkit.matrix.noResults")) + '</td></tr>';
      return;
    }
    body.innerHTML = filtered.map(function (entry) {
      return '<tr>' +
        '<td><strong>' + esc(entry.author || "—") + '</strong><em>' + esc(entry.title || "—") + '</em></td>' +
        '<td>' + esc(entry.method || "—") + '</td>' +
        '<td>' + esc(entry.finding || "—") + '</td>' +
        '<td><span class="badge' + (entry.relevance === "high" ? "" : " badge--gold") + '">' + esc(relevanceLabel(entry.relevance)) + '</span></td>' +
        '<td>' + esc(entry.use || "—") + '</td>' +
        '<td><button class="matrix-remove" type="button" data-remove="' + esc(entry.id) + '">' + esc(H.t("toolkit.matrix.removeRow")) + '</button></td>' +
        '</tr>';
    }).join("");
  }

  function addMatrixEntry(entry) {
    matrixEntries.unshift({
      id: makeId(),
      author: String(entry.author || "").trim(),
      title: String(entry.title || "").trim(),
      method: String(entry.method || "").trim(),
      finding: String(entry.finding || "").trim(),
      relevance: entry.relevance || "medium",
      use: String(entry.use || "").trim()
    });
    saveMatrix();
    renderMatrix();
  }

  function initMatrix() {
    matrixEntries = loadMatrix();
    renderMatrix();

    const form = document.getElementById("matrix-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const author = document.getElementById("matrix-author");
        const title = document.getElementById("matrix-title");
        if (!author.value.trim() && !title.value.trim()) {
          if (author) author.focus();
          return;
        }
        addMatrixEntry({
          author: author.value,
          title: title.value,
          method: document.getElementById("matrix-method").value,
          finding: document.getElementById("matrix-finding").value,
          relevance: document.getElementById("matrix-relevance").value,
          use: document.getElementById("matrix-use").value
        });
        form.reset();
        if (author) author.focus();
      });
    }

    const sample = document.getElementById("matrix-sample");
    if (sample) {
      sample.addEventListener("click", function () {
        const example = dict().toolkit.matrix.example;
        addMatrixEntry(example);
      });
    }

    const search = document.getElementById("matrix-search");
    if (search) {
      search.addEventListener("input", function () {
        matrixQuery = search.value;
        renderMatrix();
      });
    }

    const filter = document.getElementById("matrix-filter");
    if (filter) {
      filter.addEventListener("change", function () {
        matrixFilter = filter.value;
        renderMatrix();
      });
    }

    const body = document.getElementById("matrix-body");
    if (body) {
      body.addEventListener("click", function (event) {
        const button = event.target.closest("[data-remove]");
        if (!button) return;
        matrixEntries = matrixEntries.filter(function (entry) { return entry.id !== button.dataset.remove; });
        saveMatrix();
        renderMatrix();
      });
    }

    const exportButton = document.getElementById("matrix-export");
    if (exportButton) {
      exportButton.addEventListener("click", function () {
        const headers = [
          H.t("toolkit.matrix.author"),
          H.t("toolkit.matrix.sourceTitle"),
          H.t("toolkit.matrix.method"),
          H.t("toolkit.matrix.finding"),
          H.t("toolkit.matrix.relevance"),
          H.t("toolkit.matrix.use")
        ];
        const rows = matrixEntries.map(function (entry) {
          return [entry.author, entry.title, entry.method, entry.finding, relevanceLabel(entry.relevance), entry.use];
        });
        const csv = [headers].concat(rows).map(function (row) {
          return row.map(function (cell) {
            return '"' + String(cell == null ? "" : cell).replace(/"/g, '""') + '"';
          }).join(",");
        }).join("\r\n");
        H.downloadText("high-table-literature-matrix.csv", "\ufeff" + csv, "text/csv");
      });
    }

    const clearButton = document.getElementById("matrix-clear");
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        if (!matrixEntries.length) return;
        if (!window.confirm(H.t("toolkit.matrix.clearConfirm"))) return;
        matrixEntries = [];
        saveMatrix();
        renderMatrix();
      });
    }
  }

  /* -----------------------------------------------------------------------
     Sample size
     ----------------------------------------------------------------------- */

  function computeSample() {
    const confidence = parseFloat(document.getElementById("sample-confidence").value);
    const margin = parseFloat(document.getElementById("sample-margin").value) / 100;
    const proportion = parseFloat(document.getElementById("sample-proportion").value) / 100;
    const population = parseFloat(document.getElementById("sample-population").value);
    const design = parseFloat(document.getElementById("sample-deff").value);
    const nonresponse = parseFloat(document.getElementById("sample-nonresponse").value) / 100;

    const n0 = (confidence * confidence * proportion * (1 - proportion)) / (margin * margin);
    let adjusted = n0;
    if (Number.isFinite(population) && population > 0) {
      adjusted = n0 / (1 + (n0 - 1) / population);
    }
    const designAdjusted = adjusted * design;
    const completed = Math.ceil(designAdjusted);
    const invited = Math.ceil(designAdjusted / Math.max(0.01, 1 - nonresponse));

    const set = function (id, value) {
      const element = document.getElementById(id);
      if (element) element.textContent = formatNumber(value);
    };
    set("sample-completed", completed);
    set("sample-base", n0);
    set("sample-adjusted", adjusted);
    set("sample-design", designAdjusted);
    set("sample-invited", invited);

    const marginOut = document.getElementById("sample-margin-out");
    const proportionOut = document.getElementById("sample-proportion-out");
    const deffOut = document.getElementById("sample-deff-out");
    const nonresponseOut = document.getElementById("sample-nonresponse-out");
    if (marginOut) marginOut.textContent = document.getElementById("sample-margin").value + "%";
    if (proportionOut) proportionOut.textContent = document.getElementById("sample-proportion").value + "%";
    if (deffOut) deffOut.textContent = Number(design).toFixed(1);
    if (nonresponseOut) nonresponseOut.textContent = document.getElementById("sample-nonresponse").value + "%";
  }

  function initSampling() {
    ["sample-confidence", "sample-margin", "sample-proportion", "sample-population", "sample-deff", "sample-nonresponse"].forEach(function (id) {
      const element = document.getElementById(id);
      if (element) element.addEventListener("input", computeSample);
    });
    const reset = document.getElementById("sample-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        document.getElementById("sample-confidence").value = "1.96";
        document.getElementById("sample-margin").value = "5";
        document.getElementById("sample-proportion").value = "50";
        document.getElementById("sample-population").value = "";
        document.getElementById("sample-deff").value = "1";
        document.getElementById("sample-nonresponse").value = "20";
        computeSample();
      });
    }
    computeSample();
  }

  /* -----------------------------------------------------------------------
     Abstract forge
     ----------------------------------------------------------------------- */

  const ABSTRACT_FIELDS = ["title", "context", "gap", "approach", "finding", "implication"];

  function abstractData() {
    const data = {};
    ABSTRACT_FIELDS.forEach(function (field) {
      const element = document.getElementById("abstract-" + field);
      data[field] = element ? element.value : "";
    });
    return data;
  }

  function countWords(text) {
    const cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
    const latin = text.replace(/[\u3400-\u9fff]/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return cjk + latin;
  }

  function buildAbstractText(data, includeTitle) {
    const labels = dict().toolkit.abstract.labels;
    const punctuation = H.getLang() === "zh" ? "。" : ".";
    const gap = H.getLang() === "zh" ? "" : " ";
    const parts = ["context", "gap", "approach", "finding", "implication"].filter(function (field) {
      return data[field] && data[field].trim();
    }).map(function (field) {
      return labels[field] + punctuation + gap + data[field].trim();
    });
    const body = parts.join("\n\n");
    if (!includeTitle) return body;
    return (data.title.trim() ? data.title.trim() + "\n\n" : "") + body;
  }

  function renderAbstract(forceEmpty) {
    const output = document.getElementById("abstract-output");
    if (!output) return;
    const data = abstractData();
    const hasContent = ["context", "gap", "approach", "finding", "implication"].some(function (field) {
      return data[field] && data[field].trim();
    });
    const a = dict().toolkit.abstract;
    if (!hasContent && forceEmpty !== false) {
      abstractGenerated = false;
      output.innerHTML =
        '<div class="abstract-output__head"><span>' + esc(a.outputTitle) + '</span><span id="abstract-words"></span></div>' +
        '<div class="abstract-output__empty">' + esc(a.empty) + '</div>';
      return;
    }
    if (!hasContent) return;

    const labels = a.labels;
    const punctuation = H.getLang() === "zh" ? "。" : ".";
    const gap = H.getLang() === "zh" ? "" : " ";
    const parts = ["context", "gap", "approach", "finding", "implication"].filter(function (field) {
      return data[field] && data[field].trim();
    }).map(function (field) {
      return '<p><strong>' + esc(labels[field]) + punctuation + '</strong>' + gap + esc(data[field].trim()) + '</p>';
    }).join("");
    const words = countWords(["context", "gap", "approach", "finding", "implication"].map(function (field) { return data[field] || ""; }).join(" "));
    const text = buildAbstractText(data, true);

    output.innerHTML =
      '<div class="abstract-output__head"><span>' + esc(a.outputTitle) + '</span><span>' + esc(H.t("toolkit.abstract.words", { n: words })) + '</span></div>' +
      (data.title.trim() ? '<h3>' + esc(data.title.trim()) + '</h3>' : '') +
      '<div class="abstract-output__text">' + parts + '</div>' +
      '<div class="abstract-output__actions">' +
        '<button class="btn btn--outline btn--small" type="button" data-abstract-copy>' + esc(a.copy) + '</button>' +
        '<button class="btn btn--outline btn--small" type="button" data-abstract-download>' + esc(a.download) + '</button>' +
      '</div>';
    abstractGenerated = true;

    const copy = output.querySelector("[data-abstract-copy]");
    if (copy) copy.addEventListener("click", function () {
      H.copyText(text).then(function () {
        H.toast(H.t("common.copied"));
      }).catch(function () {
        H.toast(H.t("common.empty"));
      });
    });
    const download = output.querySelector("[data-abstract-download]");
    if (download) download.addEventListener("click", function () {
      H.downloadText("abstract-" + H.slugify(data.title || "structured") + ".txt", text, "text/plain");
    });
  }

  function saveAbstractDraft() {
    window.clearTimeout(abstractSaveTimer);
    abstractSaveTimer = window.setTimeout(function () {
      H.storeJSON(ABSTRACT_KEY, abstractData());
    }, 250);
  }

  function initAbstract() {
    const stored = H.safeStorage(ABSTRACT_KEY, {});
    ABSTRACT_FIELDS.forEach(function (field) {
      const element = document.getElementById("abstract-" + field);
      if (element && typeof stored[field] === "string") element.value = stored[field];
    });
    renderAbstract(false);

    const form = document.getElementById("abstract-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = abstractData();
        const hasContent = ["context", "gap", "approach", "finding", "implication"].some(function (field) {
          return data[field].trim();
        });
        if (!hasContent) {
          H.toast(H.t("toolkit.abstract.empty"));
          return;
        }
        renderAbstract(true);
      });
      form.addEventListener("input", function () {
        saveAbstractDraft();
        if (abstractGenerated) renderAbstract(false);
      });
    }

    const example = document.getElementById("abstract-example");
    if (example) {
      example.addEventListener("click", function () {
        const data = dict().toolkit.abstract.exampleData;
        ABSTRACT_FIELDS.forEach(function (field) {
          const element = document.getElementById("abstract-" + field);
          if (element) element.value = data[field] || "";
        });
        saveAbstractDraft();
        renderAbstract(true);
      });
    }

    const clear = document.getElementById("abstract-clear");
    if (clear) {
      clear.addEventListener("click", function () {
        ABSTRACT_FIELDS.forEach(function (field) {
          const element = document.getElementById("abstract-" + field);
          if (element) element.value = "";
        });
        H.storeJSON(ABSTRACT_KEY, {});
        renderAbstract(true);
        const first = document.getElementById("abstract-title");
        if (first) first.focus();
      });
    }
  }

  /* -----------------------------------------------------------------------
     Library
     ----------------------------------------------------------------------- */

  function renderLibrary() {
    const grid = document.getElementById("library-grid");
    if (!grid) return;
    grid.innerHTML = (dict().toolkit.library.entries || []).map(function (entry, index) {
      return '<article class="book">' +
        '<span class="book__index">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<div><span class="book__tag">' + esc(entry.tag) + '</span>' +
        '<h3>' + esc(entry.title) + '</h3>' +
        '<p class="book__author">' + esc(entry.author) + ' · ' + esc(entry.year) + '</p>' +
        '<p>' + esc(entry.note) + '</p></div>' +
        '</article>';
    }).join("");
  }

  function init() {
    initTabs();
    initMatrix();
    initSampling();
    initAbstract();
    renderLibrary();
    H.apply();

    document.addEventListener("langchange", function () {
      renderMatrix();
      computeSample();
      renderLibrary();
      if (abstractGenerated) renderAbstract(false);
      H.apply();
    });
  }

  H.onReady(init);
})();
