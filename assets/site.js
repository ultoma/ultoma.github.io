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
      repos:     countRepos(),
      patents:   OUTPUTS.filter(function (o) { return o.type === "특허" && o.status === "등록"; }).length
    };
    var rows = [
      { key: "topPapers", label: "CS 탑 컨퍼런스 논문", cap: "research.com \u2018Best Computer Science Conferences\u2019 상위 10% · 가중치 60%" },
      { key: "repos",     label: "공개 GitHub 저장소",  cap: "GitHub·Hugging Face 공개 기준 · 가중치 20% (같은 주소는 한 번만)" },
      { key: "patents",   label: "특허 등록",           cap: "국내 14건 + 국제 8건 · 가중치 20%" }
    ];
    root.innerHTML = rows.map(function (r) {
      var n = done[r.key] || 0, goal = TARGETS[r.key] || 0;
      return '<div><dt>' + esc(r.label) + '</dt>' +
             '<dd>' + n + ' / ' + goal + (r.cap ? ' <span class="sub">' + esc(r.cap) + '</span>' : '') + '</dd></div>';
    }).join("");
  }

  /* 공개 저장소 수 — 종류를 가리지 않고 links.code 에 실제 주소가 걸린 항목을 셉니다.
     같은 저장소를 여러 성과가 가리키면 한 번만 셉니다 (주소 끝의 / 와 대소문자는 무시). */
  function countRepos() {
    var seen = {};
    OUTPUTS.forEach(function (o) {
      var code = (o.links || {}).code;
      if (!has(code) || !/^https?:\/\//.test(code)) return;   // 빈 값·준비 중인 placeholder 는 제외
      seen[String(code).trim().replace(/\/+$/, "").toLowerCase()] = true;
    });
    return Object.keys(seen).length;
  }

  /* ================= 구성원 ================= */
  var PHOTO_FALLBACK = "images/people/placeholder.svg";
  var FACULTY_GROUPS = ["연구책임자", "공동연구자"];   // 사진 + 이름·직함·메일·홈페이지 카드로 그릴 그룹

  function photoOf(p) { return has(p.photo) ? p.photo : PHOTO_FALLBACK; }

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
        html += labPhotoGrid(members);                        // 참여연구원: 연구실별 사진 격자
      } else if (FACULTY_GROUPS.indexOf(g) !== -1) {
        html += facultyCards(members);                        // 교수진: 사진 + 이름·직함·메일·홈페이지
      } else {
        html += '<dl class="kv">' + members.map(function (p) { // 참여기업 등: 기존 목록 형태
          return '<div><dt>' + personName(p) + '</dt><dd>' + esc(p.desc) + '</dd></div>';
        }).join("") + '</dl>';
      }

      html += '</section>';
    });

    root.innerHTML = html || '<p class="empty">assets/data.js 의 PEOPLE 에 구성원을 추가하면 여기에 표시됩니다.</p>';
  }

  /* 교수진 카드 — 사진 왼쪽 / 이름·직함·메일·홈페이지 오른쪽 (role 이 있으면 직함 아래 한 줄 추가) */
  function facultyCards(members) {
    return '<div class="faculty">' + members.map(function (p) {
      var body = '<h3>' + esc(p.name) + '</h3>';
      if (has(p.desc)) body += '<p class="pos">' + esc(p.desc) + '</p>';
      if (has(p.role))  body += '<p class="role">' + esc(p.role) + '</p>';
      if (has(p.email)) body += '<p class="mail"><a href="mailto:' + esc(p.email) + '">' + esc(p.email) + '</a></p>';
      if (has(p.url))   body += '<p class="home"><a href="' + esc(p.url) + '">홈페이지 →</a></p>';
      return '<div class="person">' +
               '<img class="portrait" src="' + esc(photoOf(p)) + '" alt="' + esc(p.name) + '" loading="lazy">' +
               '<div class="person-body">' + body + '</div>' +
             '</div>';
    }).join("") + '</div>';
  }

  /* 참여연구원 — 연구실별로 묶어 사진을 한 줄에 6명씩 */
  function labPhotoGrid(members) {
    var labs = [];
    members.forEach(function (p) {
      var l = has(p.lab) ? p.lab : "";
      if (labs.indexOf(l) === -1) labs.push(l);
    });

    return labs.map(function (l) {
      var mates = members.filter(function (p) { return (has(p.lab) ? p.lab : "") === l; });
      return '<div class="lab">' +
               (l ? '<h3>' + esc(l) + '</h3>' : '') +
               '<ul class="member-grid">' + mates.map(function (p) {
                 return '<li>' +
                          '<img class="portrait small" src="' + esc(photoOf(p)) + '" alt="' + esc(p.name) + '" loading="lazy">' +
                          '<span class="member-name">' + personName(p) + '</span>' +
                        '</li>';
               }).join("") + '</ul>' +
             '</div>';
    }).join("");
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

  var PUB_IMAGE_FALLBACK = "images/publications/placeholder.svg";

  function outputItem(o) {
    var out = '<li class="pub">' +
              '<img class="pub-image" src="' + esc(has(o.image) ? o.image : PUB_IMAGE_FALLBACK) +
              '" alt="" loading="lazy">' +
              '<div class="pub-body"><h4>' + esc(o.title) + '</h4><p>';
    if (has(o.authors)) out += esc(o.authors) + '<br>';

    var venue = has(o.venue) ? o.venue : "";
    if (has(o.status)) venue += (venue ? " " : "") + o.status;   // 특허: "국내 출원"
    if (venue || o.year) {
      out += '<i>' + esc(venue) + (o.year ? (venue ? ", " : "") + esc(o.year) : "") + '</i>';
    }
    if (has(o.note)) out += '<br><strong>' + esc(o.note) + '</strong>';

    var L = o.links || {};
    // 값이 있으면 링크, 비어 있으면 회색 글자로 자리만 잡아 둡니다 (준비 중)
    var links = Object.keys(L).map(function (k) {
      return has(L[k])
        ? '<a href="' + esc(L[k]) + '">' + esc(k) + '</a>'
        : '<span class="pending" title="준비 중">' + esc(k) + '</span>';
    });
    if (links.length) out += '<br><span class="pub-links">' + links.join(' / ') + '</span>';

    return out + '</p></div></li>';
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
