(function () {
  "use strict";

  const SUPPORTED = ["en", "zh", "fr"];
  const DEFAULT_LANG = "en";
  const LANG_KEY = "htrd.lang";
  let deferredInstallPrompt = null;
  let installButton = null;
  let installPill = null;

  function getStoredLang() {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get("lang");
      if (SUPPORTED.includes(fromQuery)) {
        try {
          window.localStorage.setItem(LANG_KEY, fromQuery);
        } catch (error) {
          // The query language still applies for this page.
        }
        return fromQuery;
      }
      const stored = window.localStorage.getItem(LANG_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (error) {
      // Local storage can be unavailable in private or restricted contexts.
    }
    return DEFAULT_LANG;
  }

  let lang = getStoredLang();

  function resolve(path, dictionary) {
    return path.split(".").reduce(function (value, part) {
      return value && Object.prototype.hasOwnProperty.call(value, part) ? value[part] : undefined;
    }, dictionary);
  }

  function currentDictionary() {
    return (window.I18N && window.I18N[lang]) || {};
  }

  function t(path, vars) {
    let value = resolve(path, currentDictionary());
    if (value === undefined) value = resolve(path, (window.I18N && window.I18N.en) || {});
    if (value === undefined) return path;
    if (typeof value !== "string") return value;
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match;
    });
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function applyMeta() {
    const page = document.body ? document.body.dataset.page : "";
    const meta = page && resolve("meta." + page, currentDictionary());
    const fallback = resolve("meta." + page, (window.I18N && window.I18N.en) || {});
    const chosen = meta || fallback;
    if (!chosen) return;
    if (chosen.title) document.title = chosen.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && chosen.description) description.setAttribute("content", chosen.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && chosen.title) ogTitle.setAttribute("content", chosen.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && chosen.description) ogDescription.setAttribute("content", chosen.description);
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (element) {
      const value = t(element.dataset.i18n);
      if (value !== undefined) element.textContent = value;
    });
    scope.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      const value = t(element.dataset.i18nHtml);
      if (value !== undefined) element.innerHTML = value;
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const value = t(element.dataset.i18nPlaceholder);
      if (value !== undefined) element.setAttribute("placeholder", value);
    });
    scope.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      const value = t(element.dataset.i18nTitle);
      if (value !== undefined) element.setAttribute("title", value);
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      const value = t(element.dataset.i18nAria);
      if (value !== undefined) element.setAttribute("aria-label", value);
    });
    scope.querySelectorAll("button[data-lang]").forEach(function (button) {
      const active = button.dataset.lang === lang;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
    document.body.dataset.siteLang = lang;
    applyMeta();
  }

  function setLang(next, options) {
    if (!SUPPORTED.includes(next)) next = DEFAULT_LANG;
    const changed = next !== lang;
    lang = next;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (error) {
      // Ignore storage failure.
    }
    try {
      const url = new URL(window.location.href);
      if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
      else url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url.toString());
    } catch (error) {
      // Navigation state can be unavailable in restricted contexts.
    }
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang, changed: changed } }));
  }

  function getLang() {
    return lang;
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("site-menu");
    if (!toggle || !menu) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    document.addEventListener("click", function (event) {
      if (!menu.classList.contains("is-open")) return;
      if (!menu.contains(event.target) && !toggle.contains(event.target)) close();
    });
  }

  function initHeader() {
    const header = document.querySelector(".masthead");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });

    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
    });
  }

  function initReveals() {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (!elements.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(function (element) { element.classList.add("is-visible"); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elements.forEach(function (element) { observer.observe(element); });
  }

  function observeReveals() {
    initReveals();
  }

  function initProgress() {
    if (document.querySelector(".scroll-progress")) return;
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    const fill = document.createElement("span");
    bar.appendChild(fill);
    document.body.appendChild(bar);
    function update() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      fill.style.transform = "scaleX(" + ratio + ")";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initToast() {
    if (document.getElementById("site-toast")) return;
    const toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
  }

  function showInstallButton() {
    if (isStandalone()) return;
    if (installButton) installButton.hidden = false;
    if (installPill) installPill.hidden = false;
  }

  function hideInstallButton() {
    if (installButton) installButton.hidden = true;
    if (installPill) installPill.hidden = true;
  }

  function setupPWA() {
    if (document.getElementById("pwa-install")) return;
    const menu = document.getElementById("site-menu");
    if (menu) {
      installPill = document.createElement("button");
      installPill.id = "pwa-install-pill";
      installPill.className = "install-pill";
      installPill.type = "button";
      installPill.hidden = true;
      installPill.setAttribute("data-i18n", "common.installApp");
      installPill.textContent = "Install app";
      const langGroup = menu.querySelector(".lang");
      menu.insertBefore(installPill, langGroup || null);
    }

    installButton = document.createElement("button");
    installButton.id = "pwa-install";
    installButton.className = "pwa-install";
    installButton.type = "button";
    installButton.hidden = true;
    installButton.innerHTML =
      '<span class="pwa-install__glyph" aria-hidden="true">⤓</span>' +
      '<span data-i18n="common.installApp">Install app</span>';
    document.body.appendChild(installButton);

    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      deferredInstallPrompt = event;
      showInstallButton();
    });

    window.addEventListener("appinstalled", function () {
      deferredInstallPrompt = null;
      hideInstallButton();
      toast(t("common.installed"));
    });

    function triggerInstall() {
      if (deferredInstallPrompt) {
        const prompt = deferredInstallPrompt;
        deferredInstallPrompt = null;
        prompt.prompt();
        Promise.resolve(prompt.userChoice).then(function () {
          hideInstallButton();
        });
        return;
      }
      if (isIOS()) {
        window.alert(t("common.installIOSHint"));
        return;
      }
      toast(t("common.installUnavailable"));
    }

    installButton.addEventListener("click", triggerInstall);
    if (installPill) installPill.addEventListener("click", triggerInstall);

    if (isIOS() && !isStandalone()) showInstallButton();

    if ("serviceWorker" in navigator && (window.location.protocol === "http:" || window.location.protocol === "https:")) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(function () {
          // The site remains fully usable without offline caching.
        });
      });
    }
  }

  let toastTimer = null;
  function toast(message) {
    const node = document.getElementById("site-toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      node.classList.remove("is-visible");
    }, 2200);
  }

  function downloadText(filename, text, mime) {
    const blob = new Blob([text], { type: (mime || "text/plain") + ";charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  function safeStorage(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function storeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function slugify(value) {
    return String(value || "high-table")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "high-table";
  }

  function init() {
    initMenu();
    initHeader();
    initReveals();
    initProgress();
    initToast();
    setupPWA();
    document.querySelectorAll("button[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () { setLang(button.dataset.lang); });
    });
    apply();
  }

  window.HTRD = {
    t: t,
    apply: apply,
    setLang: setLang,
    getLang: getLang,
    onReady: onReady,
    observeReveals: observeReveals,
    toast: toast,
    downloadText: downloadText,
    copyText: copyText,
    safeStorage: safeStorage,
    storeJSON: storeJSON,
    escapeHTML: escapeHTML,
    slugify: slugify
  };

  onReady(init);
})();
