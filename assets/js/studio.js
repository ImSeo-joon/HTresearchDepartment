(function () {
  "use strict";

  const H = window.HTRD;
  if (!H) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    step: 0,
    topic: "",
    topicTouched: false,
    discipline: "engineering",
    engineeringField: "ai_core",
    aim: "evaluate",
    evidence: "compute",
    setting: "natural",
    horizon: "12",
    team: "small",
    risk: "medium",
    constraint: "",
    charterData: null,
    vivaOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    vivaRevealed: new Set(),
    vivaStatus: {}
  };

  const designMap = {
    explore: { field: "qualitative_inquiry", archive: "archival_inquiry", compute: "computational_exploration", mixed: "mixed_exploratory" },
    explain: { field: "cohort_survey", archive: "historical_comparison", compute: "causal_model", mixed: "explanatory_mixed" },
    evaluate: { field: "quasi_experiment", archive: "comparative_case", compute: "computational_evaluation", mixed: "mixed_evaluation" },
    design: { field: "participatory_design", archive: "archival_design", compute: "computational_design", mixed: "design_research" }
  };

  const designAim = {
    qualitative_inquiry: "explore",
    archival_inquiry: "explore",
    computational_exploration: "explore",
    mixed_exploratory: "explore",
    cohort_survey: "explain",
    historical_comparison: "explain",
    causal_model: "explain",
    explanatory_mixed: "explain",
    quasi_experiment: "evaluate",
    computational_evaluation: "evaluate",
    comparative_case: "evaluate",
    mixed_evaluation: "evaluate",
    design_research: "design",
    archival_design: "design",
    computational_design: "design",
    participatory_design: "design"
  };

  function dict() {
    return (window.I18N && window.I18N[H.getLang()]) || window.I18N.en;
  }

  function esc(value) {
    return H.escapeHTML(value);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function truncate(value, length) {
    const text = String(value || "").trim();
    return text.length > length ? text.slice(0, length - 1) + "…" : text;
  }

  function getQuestion(id) {
    return (dict().match.questions || []).find(function (question) { return question.id === id; });
  }

  function getOptions(group) {
    const form = dict().studio.form;
    if (group === "discipline") return form.disciplines;
    if (group === "engineeringField") return form.engineeringFields || [];
    if (group === "horizon") return form.horizons;
    if (group === "team") return form.teams;
    if (group === "risk") return form.risks;
    const question = getQuestion(group);
    return question ? question.options : [];
  }

  function getLabel(group, value) {
    const option = getOptions(group).find(function (item) { return item.value === value; });
    return option ? option.label : value;
  }

  function choiceButton(group, option) {
    const selected = state[group] === option.value;
    return '<button class="choice' + (selected ? " is-selected" : "") + '" type="button" ' +
      'data-choice-value="' + esc(option.value) + '" aria-pressed="' + (selected ? "true" : "false") + '">' +
      '<strong>' + esc(option.label) + '</strong><span>' + esc(option.desc || "") + '</span></button>';
  }

  function optionMarkup(group, options) {
    if (group === "engineeringField") {
      const groups = dict().studio.form.engineeringGroups || [];
      return groups.map(function (item) {
        const inGroup = options.filter(function (option) { return option.group === item.value; });
        if (!inGroup.length) return "";
        return '<div class="choice-group">' +
          '<p class="choice-group__label">' + esc(item.label) + '</p>' +
          '<div class="choice-grid">' + inGroup.map(function (option) {
            return choiceButton(group, option);
          }).join("") + '</div>' +
        '</div>';
      }).join("");
    }
    return options.map(function (option) {
      return choiceButton(group, option);
    }).join("");
  }

  function renderOptions() {
    ["discipline", "engineeringField", "aim", "evidence", "setting", "horizon", "team", "risk"].forEach(function (group) {
      const container = document.getElementById("choice-" + group);
      if (!container) return;
      container.innerHTML = optionMarkup(group, getOptions(group));
    });
    setEngineeringVisibility();
  }

  function setEngineeringVisibility() {
    const fieldset = document.getElementById("engineering-fieldset");
    if (fieldset) fieldset.hidden = state.discipline !== "engineering";
    const row = document.getElementById("brief-engineering-row");
    if (row) row.hidden = state.discipline !== "engineering";
  }

  function updateSummary() {
    const briefTopic = document.getElementById("brief-topic");
    const briefDiscipline = document.getElementById("brief-discipline");
    const briefEngineering = document.getElementById("brief-engineering");
    const briefAim = document.getElementById("brief-aim");
    const briefEvidence = document.getElementById("brief-evidence");
    const briefSetting = document.getElementById("brief-setting");
    const briefHorizon = document.getElementById("brief-horizon");
    const briefTeam = document.getElementById("brief-team");
    const briefRisk = document.getElementById("brief-risk");
    const composeTopic = document.getElementById("compose-topic");
    const composeMeta = document.getElementById("compose-meta");
    const topic = state.topic.trim() || "—";
    if (briefTopic) briefTopic.textContent = truncate(topic, 86);
    const isEngineering = state.discipline === "engineering";
    if (briefDiscipline) briefDiscipline.textContent = getLabel("discipline", state.discipline);
    if (briefEngineering) briefEngineering.textContent = isEngineering ? getLabel("engineeringField", state.engineeringField) : "—";
    if (briefAim) briefAim.textContent = getLabel("aim", state.aim);
    if (briefEvidence) briefEvidence.textContent = getLabel("evidence", state.evidence);
    if (briefSetting) briefSetting.textContent = getLabel("setting", state.setting);
    if (briefHorizon) briefHorizon.textContent = getLabel("horizon", state.horizon);
    if (briefTeam) briefTeam.textContent = getLabel("team", state.team);
    if (briefRisk) briefRisk.textContent = getLabel("risk", state.risk);
    if (composeTopic) composeTopic.textContent = topic;
    if (composeMeta) {
      composeMeta.textContent = [
        getLabel("discipline", state.discipline),
        isEngineering ? getLabel("engineeringField", state.engineeringField) : "",
        getLabel("aim", state.aim),
        getLabel("evidence", state.evidence),
        getLabel("horizon", state.horizon)
      ].filter(Boolean).join(" · ");
    }
  }

  function setStep(step) {
    state.step = clamp(step, 0, 3);
    document.querySelectorAll(".form-step").forEach(function (panel) {
      panel.classList.toggle("is-active", Number(panel.dataset.step) === state.step);
    });
    document.querySelectorAll("[data-progress]").forEach(function (item) {
      const index = Number(item.dataset.progress);
      item.classList.toggle("is-active", index === state.step);
      item.classList.toggle("is-done", index < state.step);
    });
    const prev = document.getElementById("wizard-prev");
    const next = document.getElementById("wizard-next");
    const compose = document.getElementById("wizard-compose");
    if (prev) prev.disabled = state.step === 0;
    if (next) next.hidden = state.step === 3;
    if (compose) compose.hidden = state.step !== 3;
    updateSummary();
  }

  function validateTopic() {
    const field = document.getElementById("topic-field");
    const input = document.getElementById("studio-topic");
    if (state.topic.trim()) {
      if (field) field.classList.remove("has-error");
      return true;
    }
    if (field) field.classList.add("has-error");
    if (input) input.focus();
    H.toast(H.t("studio.form.topicMissing"));
    return false;
  }

  function computeFeasibility() {
    const horizon = Number(state.horizon);
    let score = 76;
    score += ({ 3: -12, 6: -4, 12: 3, 24: 6 })[horizon] || 0;
    score += ({ solo: -6, small: 4, large: 1 })[state.team] || 0;
    score += ({ low: 5, medium: 0, high: -8 })[state.risk] || 0;
    score += ({ field: -3, archive: 2, compute: 1, mixed: -2 })[state.evidence] || 0;
    if (state.setting === "controlled") score -= 2;
    if (state.topic.trim().length < 12) score -= 5;
    score = Math.round(clamp(score, 38, 94));

    const scope = Math.round(clamp(
      88 + (horizon >= 12 ? 4 : horizon === 6 ? 0 : -16) +
      (state.risk === "high" ? -5 : 0) +
      (state.topic.trim().length > 110 ? -6 : 0),
      35, 96
    ));
    const access = Math.round(clamp(
      ({ field: 68, archive: 84, compute: 87, mixed: 71 })[state.evidence] +
      ({ solo: -3, small: 4, large: 2 })[state.team] +
      (horizon === 3 ? -5 : 0),
      35, 96
    ));
    const capacity = Math.round(clamp(
      ({ solo: 62, small: 82, large: 87 })[state.team] +
      (horizon === 3 ? -8 : horizon >= 12 ? 2 : 0) +
      (state.risk === "high" ? -5 : 0),
      35, 96
    ));
    return { score: score, scope: scope, access: access, capacity: capacity };
  }

  function feasibilityLabel(score) {
    const labels = dict().studio.charter.feasibilityLabels;
    if (score >= 84) return labels.well;
    if (score >= 72) return labels.feasible;
    if (score >= 60) return labels.smaller;
    return labels.stretch;
  }

  function buildRisks() {
    const c = dict().studio.charter;
    const keys = ["scope"];
    const evidenceRisk = { field: "access", archive: "archive", compute: "compute", mixed: "integration" }[state.evidence];
    if (evidenceRisk) keys.push(evidenceRisk);
    if (state.risk === "high" || state.discipline === "social" || state.discipline === "life" || state.discipline === "humanities") {
      keys.push("ethics");
    } else {
      keys.push("compute");
    }
    if (state.team === "solo") keys.push("dependency");
    if (Number(state.horizon) <= 6) keys.push("compressed");
    if (keys.length < 4) keys.push("ethics");

    const unique = Array.from(new Set(keys)).slice(0, 5);
    return unique.map(function (key) {
      const base = c.risksData[key];
      const likelihood = key === "access" || key === "compressed" ? "high" : key === "ethics" && state.risk === "high" ? "high" : "medium";
      const impact = key === "ethics" || key === "compute" ? "high" : "medium";
      return {
        name: base.name,
        mitigation: base.mitigation,
        likelihood: c.labels[likelihood],
        impact: c.labels[impact]
      };
    });
  }

  function buildCharter() {
    const d = dict();
    const c = d.studio.charter;
    const topic = (state.topic.trim() || d.studio.form.topicDefault).replace(/[.?!。？！]+$/g, "");
    const constraint = state.constraint.trim() || c.defaultConstraint;
    const isEngineering = state.discipline === "engineering";
    const engineeringField = isEngineering ? getLabel("engineeringField", state.engineeringField) : "";
    const domainNote = isEngineering ? (c.engineeringNotes[state.engineeringField] || "") : "";
    const designKey = designMap[state.aim][state.evidence];
    const design = d.studio.designs[designKey];
    const alternatives = Object.keys(designAim)
      .filter(function (key) { return key !== designKey && designAim[key] === state.aim; })
      .slice(0, 2)
      .map(function (key) { return d.studio.designs[key].name; });
    const reasons = d.studio.designs[designKey];
    const feasibility = computeFeasibility();
    const questions = {
      descriptive: c.questions.descriptive.replace("{topic}", topic),
      explanatory: c.questions.explanatory.replace("{topic}", topic),
      decision: c.questions.decision.replace("{constraint}", constraint).replace("{topic}", topic)
    };
    const next = c.next7Items.slice(0, 4);
    if (state.risk === "high") next.push(c.next7Ethics);
    if (state.aim === "design") next.push(c.next7Design);

    return {
      title: c.titleTemplate.replace("{aim}", c.aims[state.aim]).replace("{topic}", topic),
      topic: topic,
      constraint: constraint,
      discipline: getLabel("discipline", state.discipline),
      engineeringField: engineeringField,
      domainNote: domainNote,
      aim: getLabel("aim", state.aim),
      evidence: getLabel("evidence", state.evidence),
      setting: getLabel("setting", state.setting),
      horizon: Number(state.horizon),
      team: getLabel("team", state.team),
      risk: getLabel("risk", state.risk),
      designKey: designKey,
      design: design,
      alternatives: alternatives,
      questions: questions,
      feasibility: feasibility,
      feasibilityLabel: feasibilityLabel(feasibility.score),
      risks: buildRisks(),
      next: next.slice(0, 5),
      date: new Date().toLocaleDateString(
        H.getLang() === "zh" ? "zh-CN" : H.getLang() === "fr" ? "fr-FR" : "en-GB",
        { year: "numeric", month: "short", day: "numeric" }
      )
    };
  }

  function renderCharter(data) {
    const charter = document.getElementById("charter");
    if (!charter) return;
    const d = dict();
    const c = d.studio.charter;
    const colon = H.getLang() === "zh" ? "：" : ": ";
    const months = c.months;
    const ticks = [0, 0.25, 0.5, 0.75, 1].map(function (ratio) {
      return '<span>' + Math.round(data.horizon * ratio) + '</span>';
    }).join("");
    const methods = data.design.methods.map(function (method) {
      return '<span class="chip">' + esc(method) + '</span>';
    }).join("");
    const alternatives = data.alternatives.map(function (name) {
      return '<span class="chip">' + esc(name) + '</span>';
    }).join("");
    const ethics = data.design.ethics.map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join("");
    const phases = d.studio.phases.map(function (phase) {
      return '<div class="gantt__row"><span class="gantt__label">' + esc(phase.name) + '</span>' +
        '<span class="gantt__track"><i class="gantt__bar" style="left:' + phase.start + '%;width:' + (phase.end - phase.start) + '%"></i></span></div>';
    }).join("");
    const risks = data.risks.map(function (risk) {
      return '<article class="risk-card">' +
        '<div class="risk-card__head"><h4>' + esc(risk.name) + '</h4><span class="badge">' + esc(risk.likelihood) + '</span></div>' +
        '<p>' + esc(risk.mitigation) + '</p>' +
        '<p style="margin-top:6px"><span class="badge badge--gold">' + esc(c.riskImpact) + colon + esc(risk.impact) + '</span></p>' +
        '</article>';
    }).join("");
    const next = data.next.map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join("");
    const tools = c.toolkitLinks.map(function (link) {
      return '<a class="text-link" href="' + esc(link.href) + '">' + esc(link.label) + '</a>';
    }).join("");
    const metaItems = [
      [d.studio.form.summaryDiscipline, data.discipline],
      [d.studio.form.summaryEvidence, data.evidence],
      [d.studio.form.summarySetting, data.setting],
      [d.studio.form.summaryHorizon, data.horizon + " " + c.months],
      [d.studio.form.summaryTeam, data.team],
      [d.studio.form.summaryRisk, data.risk]
    ];
    if (data.engineeringField) {
      metaItems.splice(1, 0, [d.studio.form.summaryEngineering, data.engineeringField]);
    }
    const meta = metaItems.map(function (item) {
      return '<span><b>' + esc(item[0]) + '</b>' + esc(item[1]) + '</span>';
    }).join("");

    charter.innerHTML =
      '<div class="charter__head">' +
        '<div>' +
          '<p class="charter__kicker">' + esc(c.kicker) + '</p>' +
          '<h2>' + esc(data.title) + '</h2>' +
          '<p class="charter__question"><strong>' + esc(c.workingQuestion) + colon + '</strong> ' + esc(data.topic) + '</p>' +
          '<div class="charter__meta">' + meta + '</div>' +
        '</div>' +
        '<div class="charter__date">' + esc(c.generatedOn) + '<br>' + esc(data.date) + '</div>' +
      '</div>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>01</span> ' + esc(c.questionLadder) + '</div>' +
        '<div class="ladder">' +
          '<div class="ladder__card"><span>' + esc(c.descriptive) + '</span><p>' + esc(data.questions.descriptive) + '</p></div>' +
          '<div class="ladder__card"><span>' + esc(c.explanatory) + '</span><p>' + esc(data.questions.explanatory) + '</p></div>' +
          '<div class="ladder__card"><span>' + esc(c.decision) + '</span><p>' + esc(data.questions.decision) + '</p></div>' +
        '</div>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>02</span> ' + esc(c.design) + '</div>' +
        '<div class="design-card"><h3>' + esc(data.design.name) + '</h3><p>' + esc(data.design.why) + '</p></div>' +
        '<div class="chip-row" style="margin-top:16px">' + methods + '</div>' +
        (data.domainNote ? '<div class="domain-note"><strong>' + esc(c.domainNote) + '</strong><p>' + esc(data.domainNote) + '</p></div>' : '') +
        (alternatives ? '<div style="margin-top:18px"><p class="charter__kicker" style="margin-bottom:8px">' + esc(c.alternatives) + '</p><div class="chip-row">' + alternatives + '</div></div>' : '') +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>03</span> ' + esc(c.dataPlan) + '</div>' +
        '<div class="charter__two">' +
          '<div class="charter__block">' +
            '<h4>' + esc(c.dataPlan) + '</h4><p>' + esc(data.design.data) + '</p>' +
            '<h4>' + esc(c.samplingPlan) + '</h4><p>' + esc(data.design.sampling) + '</p>' +
          '</div>' +
          '<div class="charter__block">' +
            '<h4>' + esc(c.analysisPlan) + '</h4><p>' + esc(data.design.analysis) + '</p>' +
            '<h4>' + esc(c.ethicsPlan) + '</h4><ul class="ethics-list">' + ethics + '</ul>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>04</span> ' + esc(c.timeline) + ' · ' + data.horizon + ' ' + esc(months) + '</div>' +
        '<div class="gantt">' + phases + '</div>' +
        '<div class="gantt__ticks">' + ticks + '</div>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>05</span> ' + esc(c.feasibility) + '</div>' +
        '<div class="feasibility">' +
          '<div class="score-ring" style="--score:' + data.feasibility.score + '"><div class="score-ring__inner"><strong>' + data.feasibility.score + '</strong><span>' + esc(data.feasibilityLabel) + '</span></div></div>' +
          '<div>' +
            '<div class="dimension"><div class="dimension__head"><span>' + esc(c.scopeFit) + '</span><span>' + data.feasibility.scope + '</span></div><div class="dimension__bar"><span style="width:' + data.feasibility.scope + '%"></span></div></div>' +
            '<div class="dimension"><div class="dimension__head"><span>' + esc(c.evidenceAccess) + '</span><span>' + data.feasibility.access + '</span></div><div class="dimension__bar"><span style="width:' + data.feasibility.access + '%"></span></div></div>' +
            '<div class="dimension"><div class="dimension__head"><span>' + esc(c.teamCapacity) + '</span><span>' + data.feasibility.capacity + '</span></div><div class="dimension__bar"><span style="width:' + data.feasibility.capacity + '%"></span></div></div>' +
            '<p class="feasibility__note">' + esc(c.feasibilityNote) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>06</span> ' + esc(c.risks) + '</div>' +
        '<div class="risk-grid">' + risks + '</div>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>07</span> ' + esc(c.next7) + '</div>' +
        '<ol class="next-list">' + next + '</ol>' +
      '</section>' +

      '<section class="charter__section">' +
        '<div class="charter__section-title"><span>08</span> ' + esc(c.toolkit) + '</div>' +
        '<div class="action-row" style="gap:16px">' + tools + '</div>' +
      '</section>' +

      '<div class="charter__actions">' +
        '<button class="btn btn--primary btn--small" type="button" data-charter-download>' + esc(c.download) + '</button>' +
        '<button class="btn btn--outline btn--small" type="button" data-charter-print>' + esc(c.print) + '</button>' +
        '<button class="btn btn--outline btn--small" type="button" data-charter-edit>' + esc(c.edit) + '</button>' +
      '</div>';

    charter.hidden = false;
    const download = charter.querySelector("[data-charter-download]");
    const print = charter.querySelector("[data-charter-print]");
    const edit = charter.querySelector("[data-charter-edit]");
    if (download) download.addEventListener("click", function () { downloadCharter(data); });
    if (print) print.addEventListener("click", function () { window.print(); });
    if (edit) edit.addEventListener("click", function () {
      setStep(0);
      document.getElementById("studio-form").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function buildMarkdown(data) {
    const d = dict();
    const c = d.studio.charter;
    const lines = [
      "# " + data.title,
      "",
      "**" + c.workingQuestion + ":** " + data.topic,
      "",
      "**" + d.studio.form.summaryDiscipline + ":** " + data.discipline,
      ...(data.engineeringField ? ["**" + d.studio.form.summaryEngineering + ":** " + data.engineeringField] : []),
      "**" + d.studio.form.summaryAim + ":** " + data.aim,
      "**" + d.studio.form.summaryEvidence + ":** " + data.evidence,
      "**" + d.studio.form.summaryHorizon + ":** " + data.horizon + " " + c.months,
      "**" + d.studio.form.summaryTeam + ":** " + data.team,
      "**" + d.studio.form.summaryRisk + ":** " + data.risk,
      "",
      "## " + c.questionLadder,
      "",
      "- **" + c.descriptive + ":** " + data.questions.descriptive,
      "- **" + c.explanatory + ":** " + data.questions.explanatory,
      "- **" + c.decision + ":** " + data.questions.decision,
      "",
      "## " + c.design,
      "",
      "### " + data.design.name,
      "",
      data.design.why,
      ...(data.domainNote ? ["", "**" + c.domainNote + ":** " + data.domainNote] : []),
      "",
      "- **" + c.methodStack + ":** " + data.design.methods.join("; "),
      "- **" + c.dataPlan + ":** " + data.design.data,
      "- **" + c.samplingPlan + ":** " + data.design.sampling,
      "- **" + c.analysisPlan + ":** " + data.design.analysis,
      "",
      "### " + c.ethicsPlan,
      "",
      data.design.ethics.map(function (item) { return "- " + item; }).join("\n"),
      "",
      "## " + c.timeline + " · " + data.horizon + " " + c.months,
      "",
      d.studio.phases.map(function (phase) {
        return "- **" + phase.name + ":** " + Math.round(data.horizon * phase.start / 100) + "–" + Math.round(data.horizon * phase.end / 100) + " " + c.months;
      }).join("\n"),
      "",
      "## " + c.feasibility + " — " + data.feasibility.score + "/100 (" + data.feasibilityLabel + ")",
      "",
      "- " + c.scopeFit + ": " + data.feasibility.scope,
      "- " + c.evidenceAccess + ": " + data.feasibility.access,
      "- " + c.teamCapacity + ": " + data.feasibility.capacity,
      "",
      "## " + c.risks,
      "",
      data.risks.map(function (risk) {
        return "- **" + risk.name + "** — " + c.riskLikelihood + ": " + risk.likelihood + "; " + c.riskImpact + ": " + risk.impact + ". " + risk.mitigation;
      }).join("\n"),
      "",
      "## " + c.next7,
      "",
      data.next.map(function (item, index) { return (index + 1) + ". " + item; }).join("\n"),
      "",
      "---",
      d.common.brandName + " · " + data.date,
      ""
    ];
    return lines.join("\n");
  }

  function downloadCharter(data) {
    H.downloadText("research-charter-" + H.slugify(data.topic) + ".md", buildMarkdown(data), "text/markdown");
  }

  function compose() {
    if (!validateTopic()) {
      setStep(0);
      return;
    }
    state.charterData = buildCharter();
    renderCharter(state.charterData);
    const charter = document.getElementById("charter");
    if (charter) charter.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderViva() {
    const grid = document.getElementById("viva-grid");
    if (!grid) return;
    const viva = dict().studio.viva;
    const questions = viva.questions || [];
    if (state.vivaOrder.length !== questions.length) {
      state.vivaOrder = questions.map(function (_, index) { return index; });
    }
    grid.innerHTML = state.vivaOrder.map(function (index) {
      const question = questions[index];
      const revealed = state.vivaRevealed.has(index);
      const status = state.vivaStatus[index] || "";
      return '<article class="viva-card' + (revealed ? " is-revealed" : "") + '" data-viva-card="' + index + '" data-state="' + status + '">' +
        '<p class="viva-card__stage">' + esc(question.stage) + '</p>' +
        '<h3>' + esc(question.q) + '</h3>' +
        '<p class="viva-card__probe">' + esc(question.probe) + '</p>' +
        '<div class="viva-card__coaching">' + esc(question.coaching) + '</div>' +
        '<div class="viva-card__actions">' +
          '<button type="button" data-viva-action="reveal" aria-expanded="' + (revealed ? "true" : "false") + '">' + esc(revealed ? viva.hide : viva.reveal) + '</button>' +
          '<button type="button" data-viva-action="ready" aria-pressed="' + (status === "ready" ? "true" : "false") + '">' + esc(viva.ready) + '</button>' +
          '<button type="button" data-viva-action="work" aria-pressed="' + (status === "work" ? "true" : "false") + '">' + esc(viva.needsWork) + '</button>' +
        '</div>' +
      '</article>';
    }).join("");
    updateVivaProgress();
  }

  function updateVivaProgress() {
    const total = (dict().studio.viva.questions || []).length;
    const done = Object.keys(state.vivaStatus).length;
    const bar = document.getElementById("viva-progress-bar");
    const label = document.getElementById("viva-progress-label");
    if (bar) bar.style.width = (total ? (done / total) * 100 : 0) + "%";
    if (label) label.textContent = H.t("studio.viva.progress", { done: done, total: total });
  }

  function initViva() {
    const grid = document.getElementById("viva-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        const button = event.target.closest("[data-viva-action]");
        const card = event.target.closest("[data-viva-card]");
        if (!button || !card) return;
        const index = Number(card.dataset.vivaCard);
        const action = button.dataset.vivaAction;
        if (action === "reveal") {
          if (state.vivaRevealed.has(index)) state.vivaRevealed.delete(index);
          else state.vivaRevealed.add(index);
          renderViva();
        } else {
          state.vivaStatus[index] = action;
          renderViva();
        }
      });
    }

    const shuffle = document.getElementById("viva-shuffle");
    if (shuffle) {
      shuffle.addEventListener("click", function () {
        const order = state.vivaOrder.slice();
        for (let i = order.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = order[i];
          order[i] = order[j];
          order[j] = temp;
        }
        state.vivaOrder = order;
        renderViva();
      });
    }

    const reset = document.getElementById("viva-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        state.vivaRevealed.clear();
        state.vivaStatus = {};
        state.vivaOrder = (dict().studio.viva.questions || []).map(function (_, index) { return index; });
        renderViva();
      });
    }
  }

  function initForm() {
    const form = document.getElementById("studio-form-element");
    const topic = document.getElementById("studio-topic");
    const constraint = document.getElementById("studio-constraint");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (state.step === 3) {
          compose();
          return;
        }
        if (state.step === 0 && !validateTopic()) return;
        setStep(state.step + 1);
      });
    }
    if (topic) {
      topic.addEventListener("input", function () {
        state.topic = topic.value;
        state.topicTouched = true;
        const field = document.getElementById("topic-field");
        if (state.topic.trim() && field) field.classList.remove("has-error");
        updateSummary();
      });
    }
    if (constraint) {
      constraint.addEventListener("input", function () { state.constraint = constraint.value; });
    }
    document.querySelectorAll("[data-choice-group]").forEach(function (container) {
      container.addEventListener("click", function (event) {
        const button = event.target.closest("[data-choice-value]");
        if (!button) return;
        const group = container.dataset.choiceGroup;
        state[group] = button.dataset.choiceValue;
        renderOptions();
        updateSummary();
      });
    });
    const prev = document.getElementById("wizard-prev");
    const next = document.getElementById("wizard-next");
    const composeButton = document.getElementById("wizard-compose");
    if (prev) prev.addEventListener("click", function () { setStep(state.step - 1); });
    if (next) {
      next.addEventListener("click", function () {
        if (state.step === 0 && !validateTopic()) return;
        setStep(state.step + 1);
      });
    }
    if (composeButton) composeButton.addEventListener("click", compose);
  }

  function readParams() {
    const valid = function (group, value) {
      return getOptions(group).some(function (option) { return option.value === value; });
    };
    if (params.get("topic")) {
      state.topic = params.get("topic");
      state.topicTouched = true;
    }
    ["discipline", "engineeringField", "aim", "evidence", "setting", "team", "risk"].forEach(function (group) {
      const value = params.get(group);
      if (value && valid(group, value)) state[group] = value;
    });
    const engineeringField = params.get("engfield") || params.get("engineeringField");
    if (engineeringField && valid("engineeringField", engineeringField)) {
      state.engineeringField = engineeringField;
    }
    const horizon = params.get("horizon");
    if (horizon === "short") state.horizon = "6";
    else if (horizon === "long") state.horizon = "12";
    else if (horizon && valid("horizon", horizon)) state.horizon = horizon;
    if (params.get("constraint")) state.constraint = params.get("constraint");
  }

  function init() {
    if (!state.topicTouched) state.topic = dict().studio.form.topicDefault;
    const topic = document.getElementById("studio-topic");
    const constraint = document.getElementById("studio-constraint");
    if (topic) topic.value = state.topic;
    if (constraint) constraint.value = state.constraint;
    renderOptions();
    updateSummary();
    setStep(0);
    initForm();
    initViva();
    renderViva();
    H.apply();

    document.addEventListener("langchange", function () {
      if (!state.topicTouched) {
        state.topic = dict().studio.form.topicDefault;
        if (topic) topic.value = state.topic;
      }
      renderOptions();
      updateSummary();
      if (state.charterData) {
        state.charterData = buildCharter();
        renderCharter(state.charterData);
      }
      renderViva();
      H.apply();
    });
  }

  H.onReady(function () {
    readParams();
    init();
  });
})();
