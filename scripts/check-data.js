// assets/data.js 가 깨지지 않았는지 검사합니다.
// 사용법: node scripts/check-data.js   (PR 을 올리면 GitHub 에서 자동으로 실행됩니다)
"use strict";
var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..");
var errors = [];

global.window = {};
try {
  require(path.join(ROOT, "assets", "data.js"));
} catch (e) {
  console.error("❌ assets/data.js 문법 오류 — 대부분 쉼표(,)나 따옴표(\") 누락입니다.");
  // 스택 첫 줄들에 "파일:줄번호" 와 문제 위치(^) 가 찍힙니다
  String(e.stack || e.message).split("\n").slice(0, 4).forEach(function (l) {
    console.error("   " + l.replace(ROOT + path.sep, ""));
  });
  process.exit(1);
}

var TYPES = ["논문", "공개SW", "특허"];
var groups = window.PEOPLE_GROUPS || [];

(window.OUTPUTS || []).forEach(function (o, i) {
  var where = "OUTPUTS[" + i + "] \"" + String(o.title || "(제목 없음)").slice(0, 50) + "\"";
  if (TYPES.indexOf(o.type) === -1) errors.push(where + ": type 은 " + TYPES.join(" / ") + " 중 하나여야 합니다 (현재: " + JSON.stringify(o.type) + ")");
  if (!o.title) errors.push(where + ": title 이 비어 있습니다");
  if (!o.authors) errors.push(where + ": authors 가 비어 있습니다");
  if (typeof o.year !== "number") errors.push(where + ": year 는 따옴표 없는 숫자여야 합니다 (현재: " + JSON.stringify(o.year) + ")");
  if (o.links != null && (typeof o.links !== "object" || Array.isArray(o.links))) errors.push(where + ": links 는 { 글자: \"주소\" } 형태여야 합니다");
  if (o.type === "논문" && typeof o.top10 !== "boolean") errors.push(where + ": 논문은 top10 을 true 또는 false 로 적어야 합니다");
  if (o.type === "특허" && ["출원", "등록"].indexOf(o.status) === -1) errors.push(where + ": 특허는 status 를 \"출원\" 또는 \"등록\" 으로 적어야 합니다");
  if (o.type === "공개SW" && !(o.links && o.links.code)) errors.push(where + ": 공개SW 는 links.code 에 저장소 주소가 있어야 합니다");
  if (o.image && !fs.existsSync(path.join(ROOT, o.image))) errors.push(where + ": image 파일이 없습니다 (" + o.image + ")");
  Object.keys(o.links || {}).forEach(function (k) {
    var v = o.links[k];
    if (v && !/^https?:\/\//.test(v) && !fs.existsSync(path.join(ROOT, v))) {
      errors.push(where + ": links." + k + " 파일이 없습니다 (" + v + ")");
    }
  });
});

(window.PEOPLE || []).forEach(function (p, i) {
  var where = "PEOPLE[" + i + "] \"" + (p.name || "(이름 없음)") + "\"";
  if (!p.name) errors.push(where + ": name 이 비어 있습니다");
  if (groups.indexOf(p.group) === -1) errors.push(where + ": group 은 PEOPLE_GROUPS 중 하나여야 합니다 (현재: " + JSON.stringify(p.group) + ")");
  if (p.photo && !fs.existsSync(path.join(ROOT, p.photo))) errors.push(where + ": photo 파일이 없습니다 (" + p.photo + ") — 비워 두면 placeholder 가 대신 나옵니다");
});

if (errors.length) {
  console.error("❌ " + errors.length + "개 문제:");
  errors.forEach(function (e) { console.error(" - " + e); });
  process.exit(1);
}
console.log("✅ data.js 이상 없음 — 성과 " + (window.OUTPUTS || []).length + "건, 구성원 " + (window.PEOPLE || []).length + "명");
