/* =========================================================================
   data.js 의 내용을 화면에 그려주는 코드입니다.
   내용을 추가할 때는 data.js 만 고치면 되고, 이 파일은 건드릴 일이 거의 없습니다.
   ========================================================================= */

(function () {
  "use strict";

  var PEOPLE   = window.PEOPLE || [];
  var GROUPS   = window.PEOPLE_GROUPS || [];
  var OUTPUTS  = window.OUTPUTS || [];
  var SEMINARS = window.SEMINARS || [];
  var OURS     = window.OUR_AUTHORS || [];
  var TARGETS  = window.TARGETS || {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function has(v) { return v != null && String(v).trim() !== ""; }

  /* ================= 성과 진행 현황 (Home) ================= */
  function renderLedger(root) {
    var done = {
      topPapers: OUTPUTS.filter(function (o) { return o.type === "논문" && o.top10 === true; }).length,
      repos:     OUTPUTS.filter(function (o) { return o.type === "공개SW"; }).length,
      patents:   OUTPUTS.filter(function (o) { return o.type === "특허" && o.status === "등록"; }).length
    };

    var rows = [
      { key: "topPapers", label: "CS 탑 컨퍼런스 논문", cap: "research.com 상위 10% 학회 기준 · 가중치 60%" },
      { key: "repos",     label: "공개 GitHub 저장소",  cap: "URL 목록이 연차보고서 제출 자료 · 가중치 20%" },
      { key: "patents",   label: "특허 등록",           cap: "국내외 등록 기준 · 가중치 20%" }
    ];

    root.innerHTML = rows.map(function (r) {
      var n = done[r.key] || 0;
      var goal = TARGETS[r.key] || 0;
      var pct = goal ? Math.min(100, Math.round(n / goal * 100)) : 0;
      return '<div class="metric">' +
               '<dt>' + esc(r.label) + '</dt>' +
               '<dd><span class="num">' + n + '</span>' +
                   '<span class="goal">/ ' + goal + '</span>' +
                   '<span class="bar"><span style="width:' + pct + '%"></span></span>' +
                   '<span class="cap">' + esc(r.cap) + '</span></dd>' +
             '</div>';
    }).join("");
  }

  /* ================= 구성원 ================= */
  function renderPeople(root) {
    var groups = GROUPS.slice();
    PEOPLE.forEach(function (p) {
      if (has(p.group) && groups.indexOf(p.group) === -1) groups.push(p.group);
    });

    var html = "";
    groups.forEach(function (g) {
      var members = PEOPLE.filter(function (p) { return p.group === g; });
      if (!members.length) return;
      html += '<section class="people-block">' +
                '<h2>' + esc(g) + '<em>' + members.length + '</em></h2>' +
                '<div class="people-grid">' + members.map(personCard).join("") + '</div>' +
              '</section>';
    });

    root.innerHTML = html || '<p class="empty">assets/data.js 의 PEOPLE 에 구성원을 추가하면 여기에 표시됩니다.</p>';
  }

  function personCard(p) {
    var out = '<article class="person">';
    if (has(p.photo)) {
      out += '<img class="avatar" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">';
    } else {
      out += '<div class="avatar avatar-fallback" aria-hidden="true">' +
             esc(String(p.name || "?").trim().charAt(0)) + '</div>';
    }
    out += '<h3 class="person-name">' + esc(p.name);
    if (has(p.nameEn)) out += '<em>' + esc(p.nameEn) + '</em>';
    out += '</h3>';
    if (has(p.role)) out += '<p class="person-role">' + esc(p.role) + '</p>';
    if (has(p.affiliation)) out += '<p class="person-affil">' + esc(p.affiliation) + '</p>';
    if (has(p.interest)) out += '<p class="person-interest">' + esc(p.interest) + '</p>';

    var links = [];
    if (has(p.homepage)) links.push('<a href="' + esc(p.homepage) + '">Homepage</a>');
    if (has(p.scholar))  links.push('<a href="' + esc(p.scholar) + '">Scholar</a>');
    if (has(p.email))    links.push('<a href="mailto:' + esc(p.email) + '">Email</a>');
    if (links.length) out += '<p class="person-links">' + links.join("") + '</p>';
    return out + '</article>';
  }

  /* ================= 성과 목록 ================= */
  var activeType = "전체";

  function renderOutputs(listRoot, filterRoot, countRoot) {
    if (filterRoot) {
      var types = ["전체"];
      OUTPUTS.forEach(function (o) {
        if (has(o.type) && types.indexOf(o.type) === -1) types.push(o.type);
      });
      filterRoot.innerHTML = types.map(function (t) {
        return '<button type="button" data-type="' + esc(t) + '" aria-pressed="' +
               (t === activeType) + '">' + esc(t) + '</button>';
      }).join("");
      filterRoot.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-type]");
        if (!btn) return;
        activeType = btn.getAttribute("data-type");
        Array.prototype.forEach.call(filterRoot.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        paint(listRoot, countRoot);
      });
    }
    paint(listRoot, countRoot);
  }

  function paint(listRoot, countRoot) {
    var items = OUTPUTS.filter(function (o) {
      return activeType === "전체" || o.type === activeType;
    });
    items.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

    if (countRoot) {
      var top = items.filter(function (o) { return o.top10 === true; }).length;
      countRoot.textContent = "총 " + items.length + "건" +
        (top ? " · 이 중 탑 컨퍼런스 논문 " + top + "편" : "");
    }

    if (!items.length) {
      listRoot.innerHTML = '<p class="empty">assets/data.js 의 OUTPUTS 에 성과를 추가하면 여기에 표시됩니다.</p>';
      return;
    }

    var years = [];
    items.forEach(function (o) { if (years.indexOf(o.year) === -1) years.push(o.year); });

    listRoot.innerHTML = years.map(function (y) {
      var group = items.filter(function (o) { return o.year === y; });
      return '<div class="pub-group">' +
               '<div class="pub-year">' + esc(y) + '<small>' + group.length + '건</small></div>' +
               '<ul class="pub-list">' + group.map(outputItem).join("") + '</ul>' +
             '</div>';
    }).join("");
  }

  function outputItem(o) {
    var out = '<li class="pub">';
    out += '<p class="pub-title">' + esc(o.title) + '</p>';
    out += '<p class="pub-authors">' + boldOurs(o.authors) + '</p>';

    var meta = [];
    if (has(o.venue))  meta.push('<span class="chip">' + esc(o.venue) + '</span>');
    if (has(o.status)) meta.push('<span class="chip">' + esc(o.status) + '</span>');
    if (o.top10 === true) meta.push('<span class="chip is-top">지표 반영</span>');
    if (has(o.note))   meta.push('<span class="chip is-note">' + esc(o.note) + '</span>');

    var L = o.links || {};
    if (has(L.pdf))   meta.push('<a href="' + esc(L.pdf) + '">PDF</a>');
    if (has(L.arxiv)) meta.push('<a href="' + esc(L.arxiv) + '">arXiv</a>');
    if (has(L.code))  meta.push('<a href="' + esc(L.code) + '">Code</a>');
    if (has(L.doi))   meta.push('<a href="' + esc(L.doi) + '">DOI</a>');

    if (meta.length) out += '<p class="pub-meta">' + meta.join("") + '</p>';
    return out + '</li>';
  }

  function boldOurs(authors) {
    if (!has(authors)) return "";
    return String(authors).split(",").map(function (a) {
      var name = a.trim();
      var mine = OURS.some(function (o) { return o.trim() === name; });
      return mine ? "<strong>" + esc(name) + "</strong>" : esc(name);
    }).join(", ");
  }

  /* ================= 최근 성과 (Home) ================= */
  function renderRecent(root, n) {
    var items = OUTPUTS.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); }).slice(0, n);
    if (!items.length) { root.innerHTML = ""; return; }
    root.innerHTML = '<ul class="pub-list">' + items.map(outputItem).join("") + '</ul>';
  }

  /* ================= 세미나 (Home) ================= */
  function renderSeminars(section, root) {
    if (!SEMINARS.length) { if (section) section.hidden = true; return; }
    var items = SEMINARS.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    root.innerHTML = items.map(function (s) {
      var body = '<div><p class="seminar-title">' + esc(s.title) + '</p>';
      var sub = [];
      if (has(s.speaker)) sub.push(esc(s.speaker));
      if (has(s.place))   sub.push(esc(s.place));
      if (sub.length) body += '<p class="seminar-sub">' + sub.join(" · ") + '</p>';
      body += '</div>';
      return '<li class="seminar"><time datetime="' + esc(s.date) + '">' + esc(s.date) + '</time>' + body + '</li>';
    }).join("");
  }

  /* ================= 페이지별 실행 ================= */
  document.addEventListener("DOMContentLoaded", function () {
    var el;
    if ((el = document.getElementById("ledger-root")))  renderLedger(el);
    if ((el = document.getElementById("people-root")))  renderPeople(el);
    if ((el = document.getElementById("recent-root")))  renderRecent(el, 3);
    if ((el = document.getElementById("seminar-root"))) renderSeminars(document.getElementById("seminar-section"), el);
    if ((el = document.getElementById("pub-root"))) {
      renderOutputs(el, document.getElementById("pub-filters"), document.getElementById("pub-count"));
    }
  });
})();
