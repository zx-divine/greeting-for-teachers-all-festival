(function () {
  "use strict";

  // FEST_CONFIG is defined inline in each festival html file, e.g.:
  // window.FEST_CONFIG = { festival: "Diwali", targetDate: "2026-11-08" };
  var CONFIG = window.FEST_CONFIG || {};
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function formatDate(iso) {
    var parts = iso.split("-");
    var y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
    return d + " " + MONTHS[m - 1] + " " + y;
  }

  function todayYMD() {
    var now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
  }

  function compareToTarget(iso) {
    var parts = iso.split("-");
    var ty = parseInt(parts[0], 10), tm = parseInt(parts[1], 10), td = parseInt(parts[2], 10);
    var t = todayYMD();
    var todayNum = t.y * 10000 + t.m * 100 + t.d;
    var targetNum = ty * 10000 + tm * 100 + td;
    if (todayNum < targetNum) return -1; // early
    if (todayNum > targetNum) return 1;  // late
    return 0; // on the day
  }

  var screenLoading = document.getElementById("screen-loading");
  var screenGate = document.getElementById("screen-gate");
  var screenName = document.getElementById("screen-name");
  var screenCard = document.getElementById("screen-card");

  var loadingLine1 = document.getElementById("loading-line-1");
  var loadingLine2 = document.getElementById("loading-line-2");
  var loadingDots = document.getElementById("loading-dots");

  var gateTitle = document.getElementById("gate-title");
  var gateMessage = document.getElementById("gate-message");

  var nameForm = document.getElementById("name-form");
  var nameInput = document.getElementById("teacher-name");

  var card3d = document.getElementById("card-3d");
  var letterName = document.getElementById("letter-name");
  var btnClose = document.getElementById("btn-close-card");

  function showScreen(el) {
    [screenLoading, screenGate, screenName, screenCard].forEach(function (s) {
      if (s) s.classList.remove("active");
    });
    if (el) el.classList.add("active");
  }

  function runLoadingSequence() {
    showScreen(screenLoading);

    setTimeout(function () {
      if (loadingLine1) loadingLine1.classList.add("hidden");
      if (loadingLine2) loadingLine2.classList.remove("hidden");
      if (loadingDots) loadingDots.style.display = "none";
    }, 1500);

    setTimeout(function () {
      var verdict = CONFIG.targetDate ? compareToTarget(CONFIG.targetDate) : 0;

      if (verdict === -1) {
        gateTitle.textContent = "Oho, thoda jaldi aa gaye, Mam!";
        gateMessage.textContent = "Your " + CONFIG.festival + " gift isn't ready yet — it opens on " + formatDate(CONFIG.targetDate) + ". Come back then!";
        showScreen(screenGate);
      } else if (verdict === 1) {
        gateTitle.textContent = "Aap late ho gaye, Mam!";
        gateMessage.textContent = CONFIG.festival + " (" + formatDate(CONFIG.targetDate) + ") already came and went this year. See you next " + CONFIG.festival + "!";
        showScreen(screenGate);
      } else {
        showScreen(screenName);
        if (nameInput) nameInput.focus();
      }
    }, 3100);
  }

  if (nameForm) {
    nameForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = nameInput.value.trim();
      if (!raw) return;
      var name = raw.slice(0, 40);
      letterName.textContent = "Respected " + name + ",";
      showScreen(screenCard);
      card3d.classList.remove("open");
    });
  }

  function openCard() { card3d.classList.add("open"); }
  function closeCard() { card3d.classList.remove("open"); }

  if (card3d) {
    card3d.addEventListener("click", function () {
      if (!card3d.classList.contains("open")) openCard();
    });
    card3d.setAttribute("tabindex", "0");
    card3d.setAttribute("role", "button");
    card3d.setAttribute("aria-label", "Open your " + (CONFIG.festival || "") + " card");
    card3d.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && !card3d.classList.contains("open")) {
        e.preventDefault();
        openCard();
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeCard();
    });
  }

  runLoadingSequence();
})();
