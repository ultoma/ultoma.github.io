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
  var TARGETS  = window.TARGETS || {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function has(v) { return v != null && String(v).trim() !== ""; }

  /* ================= 정량 성과 현황 (Home) ================= */
  function renderLedger(root) {
    var done = {
      topPapers: OUTPUTS.filter(function (o) { return o.type === "논문" && o.top10 === true; }).length,
      repos:     OUTPUTS.filter(function (o) { return o.type === "공개SW"; }).length,
      patents:   OUTPUTS.filter(function (o) { return o.type === "특허" && o.status === "등록"; }).length
    };
    var rows = [
      { key: "topPapers", label: "CS 탑 컨퍼런스 논문", cap: "research.com 상위 10% 학회 기준" },
      { key: "repos",     label: "공개 GitHub 저장소",  cap: "" },
      { key: "patents",   label: "특허 등록",           cap: "국내외 등록 기준" }
    ];
    root.innerHTML = rows.map(function (r) {
      var n = done[r.key] || 0, goal = TARGETS[r.key] || 0;
      return '<div><dt>' + esc(r.label) + '</dt>' +
             '<dd>' + n + ' / ' + goal + (r.cap ? ' <span class="sub">' + esc(r.cap) + '</span>' : '') + '</dd></div>';
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

      html += '<section class="block"><h2>' + esc(g) + '</h2>';

      if (members.some(function (p) { return has(p.lab); })) {
        // 연구실별로 한 줄: 왼쪽에 연구실, 오른쪽에 이름 나열
        var labs = [];
        members.forEach(function (p) {
          var l = has(p.lab) ? p.lab : "";
          if (labs.indexOf(l) === -1) labs.push(l);
        });
        html += '<dl class="kv wide">' + labs.map(function (l) {
          var names = members.filter(function (p) { return (has(p.lab) ? p.lab : "") === l; })
                             .map(personName).join(", ");
          return '<div><dt>' + esc(l) + '</dt><dd>' + names + '</dd></div>';
        }).join("") + '</dl>';
      } else {
        html += '<dl class="kv">' + members.map(function (p) {
          return '<div><dt>' + personName(p) + '</dt><dd>' + esc(p.desc) + '</dd></div>';
        }).join("") + '</dl>';
      }

      html += '</section>';
    });

    root.innerHTML = html || '<p class="empty">assets/data.js 의 PEOPLE 에 구성원을 추가하면 여기에 표시됩니다.</p>';
  }

  function personName(p) {
    return has(p.url) ? '<a href="' + esc(p.url) + '">' + esc(p.name) + '</a>' : esc(p.name);
  }

  /* ================= 성과 목록 ================= */
  var TYPE_ORDER = ["논문", "공개SW", "특허"];

  function byYearDesc(a, b) { return (b.year || 0) - (a.year || 0); }

  function renderOutputs(root) {
    var types = TYPE_ORDER.slice();
    OUTPUTS.forEach(function (o) {
      if (has(o.type) && types.indexOf(o.type) === -1) types.push(o.type);
    });

    var html = "";
    types.forEach(function (t) {
      var items = OUTPUTS.filter(function (o) { return o.type === t; }).sort(byYearDesc);
      if (!items.length) return;
      html += '<section class="block">' +
                '<h2>' + esc(t) + '</h2>' +
                '<ul class="pub-list">' + items.map(outputItem).join("") + '</ul>' +
              '</section>';
    });

    root.innerHTML = html || '<p class="empty">assets/data.js 의 OUTPUTS 에 성과를 추가하면 여기에 표시됩니다.</p>';
  }

  function outputItem(o) {
    var out = '<li class="pub"><h4>' + esc(o.title) + '</h4><p>';
    if (has(o.authors)) out += esc(o.authors) + '<br>';

    var venue = has(o.venue) ? o.venue : "";
    if (has(o.status)) venue += (venue ? " " : "") + o.status;   // 특허: "국내 출원"
    if (venue || o.year) {
      out += '<i>' + esc(venue) + (o.year ? (venue ? ", " : "") + esc(o.year) : "") + '</i>';
    }
    if (has(o.note)) out += '<br><strong>' + esc(o.note) + '</strong>';

    var L = o.links || {};
    var links = Object.keys(L).filter(function (k) { return has(L[k]); }).map(function (k) {
      return '<a href="' + esc(L[k]) + '">' + esc(k) + '</a>';
    });
    if (links.length) out += '<br><span class="pub-links">' + links.join(' / ') + '</span>';

    return out + '</p></li>';
  }

  /* ================= 최근 성과 (Home) ================= */
  function renderRecent(root, n) {
    var items = OUTPUTS.slice().sort(byYearDesc).slice(0, n);
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
      var sub = [];
      if (has(s.speaker)) sub.push(esc(s.speaker));
      if (has(s.place))   sub.push(esc(s.place));
      return '<div><dt>' + esc(s.date) + '</dt><dd>' + esc(s.title) +
             (sub.length ? '<br><span class="sub">' + sub.join(" · ") + '</span>' : '') + '</dd></div>';
    }).join("");
  }

  /* ================= 페이지별 실행 ================= */
  document.addEventListener("DOMContentLoaded", function () {
    var el;
    if ((el = document.getElementById("ledger-root")))  renderLedger(el);
    if ((el = document.getElementById("people-root")))  renderPeople(el);
    if ((el = document.getElementById("recent-root")))  renderRecent(el, 3);
    if ((el = document.getElementById("seminar-root"))) renderSeminars(document.getElementById("seminar-section"), el);
    if ((el = document.getElementById("pub-root")))     renderOutputs(el);
  });
})();
