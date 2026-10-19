(function () {
  "use strict";

  const H = window.HTRD;
  if (!H) return;

  const state = {
    stage: 0,
    matchIndex: 0,
    matchAnswers: {},
    matchDone: false,
    matchTop: null,
    matchRunner: null
  };

  function dict() {
    return (window.I18N && window.I18N[H.getLang()]) || window.I18N.en;
  }

  function esc(value) {
    return H.escapeHTML(value);
  }

  function renderMarquee() {
    const track = document.getElementById("marquee-track");
    if (!track) return;
    const items = dict().home.marquee || [];
    const group = items.map(function (item) {
      return '<span>' + esc(item) + '</span><i aria-hidden="true">✦</i>';
    }).join("");
    track.innerHTML =
      '<div class="marquee__group">' + group + '</div>' +
      '<div class="marquee__group" aria-hidden="true">' + group + '</div>';
  }

  function renderPillars() {
    const container = document.getElementById("pillars");
    if (!container) return;
    container.innerHTML = (dict().home.manifesto.pillars || []).map(function (pillar, index) {
      return '<article class="pillar">' +
        '<span class="pillar__num">' + String(index + 1).padStart(2, "0") + ' / III</span>' +
        '<h3>' + esc(pillar.title) + '</h3>' +
        '<p>' + esc(pillar.text) + '</p>' +
        '</article>';
    }).join("");
  }

  function renderChain() {
    const list = document.getElementById("chain-list");
    const detail = document.getElementById("chain-detail");
    if (!list || !detail) return;
    const stages = dict().chain.stages || [];
    if (!stages.length) return;
    if (state.stage >= stages.length) state.stage = 0;

    list.innerHTML = stages.map(function (stage, index) {
      const number = String(index + 1).padStart(2, "0");
      const active = index === state.stage;
      return '<button class="chain__item' + (active ? ' is-active' : '') + '" type="button" role="tab" ' +
        'aria-selected="' + (active ? "true" : "false") + '" aria-controls="chain-detail" ' +
        'data-index="' + index + '" tabindex="' + (active ? "0" : "-1") + '">' +
        '<span class="chain__num">' + number + '</span>' +
        '<span class="chain__names"><span class="chain__name">' + esc(stage.name) + '</span>' +
        '<span class="chain__short">' + esc(stage.short) + '</span></span>' +
        '</button>';
    }).join("");

    const stage = stages[state.stage];
    const number = String(state.stage + 1).padStart(2, "0");
    const tools = (stage.tools || []).map(function (tool) {
      return '<a href="' + esc(tool.href) + '">' + esc(tool.label) + '</a>';
    }).join("");

    detail.innerHTML =
      '<div class="chain__watermark" aria-hidden="true">' + number + '</div>' +
      '<div class="chain__detail-inner">' +
        '<p class="chain__stage-label">' + esc(dict().home.chain.stageWord) + ' ' + number + ' / X</p>' +
        '<h3>' + esc(stage.name) + '</h3>' +
        '<p class="chain__short-lead">' + esc(stage.short) + '</p>' +
        '<dl class="detail-grid">' +
          '<div class="detail-block"><dt>' + esc(dict().home.chain.labels.purpose) + '</dt><dd>' + esc(stage.purpose) + '</dd></div>' +
          '<div class="detail-block"><dt>' + esc(dict().home.chain.labels.artifact) + '</dt><dd>' + esc(stage.artifact) + '</dd></div>' +
          '<div class="detail-block"><dt>' + esc(dict().home.chain.labels.question) + '</dt><dd>' + esc(stage.question) + '</dd></div>' +
          '<div class="detail-block detail-block--failure"><dt>' + esc(dict().home.chain.labels.failure) + '</dt><dd>' + esc(stage.failure) + '</dd></div>' +
        '</dl>' +
        '<div class="stage-tools"><span class="stage-tools__label">' + esc(dict().home.chain.labels.tools) + '</span>' + tools + '</div>' +
      '</div>';
  }

  function scoreMethod(method, answers) {
    if (!method.ideal) return 0;
    let score = 0;
    if (method.ideal.aim === answers.aim) score += 4;
    if (method.ideal.evidence === answers.evidence) score += 3;
    if (method.ideal.setting === answers.setting) score += 2;
    if (method.ideal.horizon === answers.horizon) score += 1;
    return score;
  }

  function computeMatch() {
    const methods = dict().match.methods || {};
    const results = Object.keys(methods).map(function (key) {
      return {
        key: key,
        method: methods[key],
        score: scoreMethod(methods[key], state.matchAnswers)
      };
    }).sort(function (a, b) {
      return b.score - a.score;
    });
    state.matchTop = results[0] || null;
    state.matchRunner = results[1] || null;
  }

  function renderMatch() {
    const card = document.getElementById("match-card");
    if (!card) return;
    const data = dict().match;
    const questions = data.questions || [];

    if (state.matchDone && state.matchTop) {
      const top = state.matchTop;
      const runner = state.matchRunner;
      const percent = Math.min(100, Math.round((top.score / 10) * 100));
      const fitKey = percent >= 80 ? "strong" : percent >= 60 ? "workable" : "stretch";
      const params = new URLSearchParams(state.matchAnswers);
      const strengths = (top.method.strengths || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("");
      const watchouts = (top.method.watchouts || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("");

      card.innerHTML =
        '<div class="match__result">' +
          '<div class="match__result-head">' +
            '<div>' +
              '<p class="match__result-kicker">' + esc(data.result) + '</p>' +
              '<h3>' + esc(top.method.name) + '</h3>' +
              '<p class="match__tagline">' + esc(top.method.tagline) + '</p>' +
            '</div>' +
            '<div class="match__score" style="--score:' + percent + '"><span>' + percent + '<small>' + esc(data.fit) + '</small></span></div>' +
          '</div>' +
          '<div class="match__body">' +
            '<p><strong>' + esc(data[fitKey]) + '.</strong> ' + esc(top.method.when) + '</p>' +
            '<div class="match__columns">' +
              '<div><h4>' + esc(data.strengths) + '</h4><ul>' + strengths + '</ul></div>' +
              '<div><h4>' + esc(data.watchouts) + '</h4><ul>' + watchouts + '</ul></div>' +
            '</div>' +
            (runner ? '<div class="match__runner"><strong>' + esc(data.runner) + '</strong><span>' + esc(runner.method.name) + '</span></div>' : '') +
            '<div class="match__next"><span>' + esc(data.next) + '</span><p>' + esc(top.method.next) + '</p>' +
              '<div class="action-row"><a class="btn btn--small btn--primary" href="studio.html?' + params.toString() + '">' + esc(data.tryStudio) + '</a>' +
              '<button class="btn btn--small btn--outline" type="button" data-match-restart>' + esc(data.restart) + '</button></div>' +
            '</div>' +
          '</div>' +
        '</div>';

      const restart = card.querySelector("[data-match-restart]");
      if (restart) {
        restart.addEventListener("click", function () {
          state.matchIndex = 0;
          state.matchAnswers = {};
          state.matchDone = false;
          state.matchTop = null;
          state.matchRunner = null;
          renderMatch();
        });
      }
      return;
    }

    const question = questions[state.matchIndex];
    if (!question) return;
    const selected = state.matchAnswers[question.id];
    const dots = questions.map(function (_, index) {
      return '<span class="match__dot' + (index < state.matchIndex ? ' is-done' : '') + '"></span>';
    }).join("");
    const options = question.options.map(function (option) {
      return '<button class="match__option' + (selected === option.value ? ' is-selected' : '') + '" type="button" data-value="' + esc(option.value) + '">' +
        '<strong>' + esc(option.label) + '</strong><span>' + esc(option.desc) + '</span></button>';
    }).join("");

    card.innerHTML =
      '<div class="match__progress" aria-hidden="true">' + dots + '</div>' +
      '<p class="match__result-kicker">' + esc(data.choose) + ' · ' + String(state.matchIndex + 1).padStart(2, "0") + ' / ' + String(questions.length).padStart(2, "0") + '</p>' +
      '<h3 class="match__q">' + esc(question.title) + '</h3>' +
      '<div class="match__options">' + options + '</div>';

    card.querySelectorAll(".match__option").forEach(function (button) {
      button.addEventListener("click", function () {
        state.matchAnswers[question.id] = button.dataset.value;
        if (state.matchIndex < questions.length - 1) {
          state.matchIndex += 1;
          renderMatch();
        } else {
          computeMatch();
          state.matchDone = true;
          renderMatch();
        }
      });
    });
  }

  function renderFeatures() {
    const container = document.getElementById("feature-list");
    if (!container) return;
    container.innerHTML = (dict().home.studioTeaser.features || []).map(function (feature, index) {
      return '<div class="feature-list__item"><span>' + String(index + 1).padStart(2, "0") + '</span>' +
        '<div><strong>' + esc(feature.title) + '</strong><p>' + esc(feature.text) + '</p></div></div>';
    }).join("");
  }

  function paperFieldLabel(key) {
    const fields = (dict().studio.form && dict().studio.form.engineeringFields) || [];
    const field = fields.find(function (item) { return item.value === key; });
    return field ? field.label : key;
  }

  function renderPapersTeaser() {
    const container = document.getElementById("papers-teaser-list");
    if (!container || !window.PAPER_INDEX) return;
    const papers = window.PAPER_INDEX
      .filter(function (paper) { return paper.featured; })
      .sort(function (a, b) { return b.date.localeCompare(a.date); })
      .slice(0, 3);
    container.innerHTML = papers.map(function (paper, index) {
      return '<a class="papers-teaser__row" href="papers.html">' +
        '<span class="papers-teaser__num">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<span class="papers-teaser__body"><span class="papers-teaser__field">' + esc(paperFieldLabel(paper.field)) + ' · ' + paper.year + '</span>' +
        '<strong>' + esc(paper.title) + '</strong>' +
        '<span class="papers-teaser__authors">' + esc(paper.short) + '</span></span>' +
        '<span class="papers-teaser__arrow" aria-hidden="true">↗</span>' +
        '</a>';
    }).join("");
  }

  function renderHeroStats() {
    if (!window.PAPER_INDEX) return;
    const fieldCount = new Set(window.PAPER_INDEX.map(function (paper) { return paper.field; })).size;
    const latest = Math.max.apply(null, window.PAPER_INDEX.map(function (paper) { return paper.year; }));
    const values = { fields: fieldCount, papers: window.PAPER_INDEX.length, latest: latest };
    Object.keys(values).forEach(function (key) {
      const node = document.querySelector('[data-stat="' + key + '"]');
      if (node) node.textContent = values[key];
    });
  }

  function renderNotesPreview() {
    const container = document.getElementById("notes-preview");
    if (!container) return;
    const essays = (dict().notes.essays || []).slice(0, 3);
    container.innerHTML = essays.map(function (essay) {
      return '<a class="note-card" href="notes.html#essay-' + esc(essay.id) + '">' +
        '<span class="note-card__tag">' + esc(essay.tag) + '</span>' +
        '<h3>' + esc(essay.title) + '</h3>' +
        '<p>' + esc(essay.deck) + '</p>' +
        '<span class="note-card__meta"><span>' + esc(dict().notes.readTime.replace("{n}", essay.read)) + '</span>' +
        '<span>' + esc(dict().notes.open) + ' ↗</span></span>' +
        '</a>';
    }).join("");
  }

  function renderPrinciples() {
    const container = document.getElementById("principles");
    if (!container) return;
    container.innerHTML = (dict().home.principles.items || []).map(function (item, index) {
      return '<article class="principle"><span class="principle__num">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<h3>' + esc(item.title) + '</h3><p>' + esc(item.text) + '</p></article>';
    }).join("");
  }

  function renderAll() {
    renderHeroStats();
    renderMarquee();
    renderPillars();
    renderChain();
    renderMatch();
    renderFeatures();
    renderPapersTeaser();
    renderNotesPreview();
    renderPrinciples();
    H.apply();
  }

  H.onReady(function () {
    renderAll();

    const list = document.getElementById("chain-list");
    if (list) {
      list.addEventListener("click", function (event) {
        const button = event.target.closest(".chain__item");
        if (!button) return;
        state.stage = Number(button.dataset.index) || 0;
        renderChain();
        const active = list.querySelector(".chain__item.is-active");
        if (active) active.focus();
      });

      list.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const stages = dict().chain.stages || [];
        const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
        state.stage = (state.stage + direction + stages.length) % stages.length;
        renderChain();
        const active = list.querySelector(".chain__item.is-active");
        if (active) active.focus();
      });
    }

    document.addEventListener("langchange", renderAll);
  });
})();
