# 차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처 — 과제 홈페이지

과제번호 RS-2026-25524173 · 경량·저전력AI 한계극복기술개발사업
연구기간 2026.04 – 2030.12

연구개발계획서 3-1절의 **"성과 게시 및 세미나 교류를 위한 홈페이지 개설(1년차)"** 이행을 위한 사이트입니다.

- 조직: `ultoma`
- 저장소: `ultoma.github.io` (Public)
- 주소: <https://ultoma.github.io>
Home / People / Publications 세 페이지로 구성되며, 빌드 도구나 프로그램 설치 없이
파일을 고쳐서 GitHub에 올리면 그대로 반영됩니다.

---

## 폴더 구조

```
index.html            홈 — 과제 개요, 성과 진행 현황, 연구 주제, 세미나, 최근 성과
people.html           구성원 — 껍데기만 있음
publications.html     성과 — 껍데기만 있음
assets/
  data.js        ★ 성과·구성원·세미나·목표치. 평소 고치는 건 이 파일 하나
  style.css        색상·글꼴·여백
  site.js          data.js 내용을 화면에 그리는 코드 (건드릴 일 거의 없음)
images/            구성원 사진, 로고
```

**원칙:** 줄글은 HTML에서, 목록은 `data.js`에서.

---

## 성과 진행 현황이 자동으로 계산됩니다

Home의 진행 막대는 `data.js`의 `OUTPUTS`를 세어 `TARGETS`와 비교합니다.
집계표를 따로 관리할 필요가 없고, 그대로 연차보고서 근거가 됩니다.

| 표시 | 세는 기준 | 목표 | 계획서 가중치 |
|---|---|---|---|
| CS 탑 컨퍼런스 논문 | `type: "논문"` 이면서 `top10: true` | 90 | 60% |
| 공개 GitHub 저장소 | `type: "공개SW"` | 45 | 20% |
| 특허 등록 | `type: "특허"` 이면서 `status: "등록"` | 22 | 20% |

`top10`은 research.com의 'Best Computer Science Conferences' 상위 10% 해당 여부입니다.
계획서의 자료수집 출처가 이 기준이므로, 논문을 등록할 때마다 판정해서 표시해두세요.
나중에 한꺼번에 판정하려면 90편을 다시 다 확인해야 합니다.

---

## 성과 추가하기

`assets/data.js`의 `window.OUTPUTS = [` 바로 아래에 블록을 붙여넣습니다.

**논문**
```js
  {
    year: 2027,
    type: "논문",
    top10: true,
    title: "논문 제목",
    authors: "First Author, Second Author, 송현오",
    venue: "ICML 2027",
    note: "Oral",
    links: { pdf: "", arxiv: "", code: "", doi: "" }
  },
```

**공개SW** — `links.code`에 저장소 URL을 꼭 넣으세요. 이 URL 목록이 그대로 제출 자료입니다.
```js
  {
    year: 2027,
    type: "공개SW",
    title: "저장소 이름 — 한 줄 설명",
    authors: "머신러닝 연구실",
    venue: "Apache-2.0",
    note: "",
    links: { pdf: "", arxiv: "", code: "https://github.com/ultoma/저장소이름", doi: "" }
  },
```

**특허**
```js
  {
    year: 2028,
    type: "특허",
    status: "등록",
    title: "발명의 명칭",
    authors: "서울대학교 산학협력단",
    venue: "국내 등록",
    note: "SMART AAA",
    links: { pdf: "", arxiv: "", code: "", doi: "" }
  },
```

- `type`에 새 값을 쓰면 필터 버튼이 자동으로 하나 늘어납니다.
- `authors`는 쉼표로 구분. `OUR_AUTHORS`에 등록된 이름은 자동으로 굵게 표시됩니다.
- 정렬은 연도 기준 자동. 순서대로 적을 필요 없습니다.

---

## 구성원 추가하기

`window.PEOPLE = [` 아래에 추가합니다. `group`은 `PEOPLE_GROUPS`의 값과 **똑같이** 적어야 합니다.

```js
  {
    group: "초장기 기억 및 추론",
    name: "홍길동",
    nameEn: "Gildong Hong",
    role: "박사과정",
    affiliation: "서울대학교 컴퓨터공학부 · 머신러닝 연구실",
    interest: "연구 관심사 한 줄",
    photo: "images/hong.jpg",
    email: "",
    homepage: "",
    scholar: ""
  },
```

**개인정보 주의**

- 휴대전화 번호는 넣지 마세요. 계획서에는 있지만 웹 게시용이 아닙니다.
- 참여연구원 41명(박사과정 27, 석사과정 10 등)의 이름·사진·이메일을 올리려면 본인 동의를 먼저 받으세요.
  동의 절차 전에는 교수진과 참여기관만 게시하는 편이 안전합니다.
- 졸업·이직이 생기면 내리거나 "졸업생" 그룹으로 옮기세요. `PEOPLE_GROUPS`에 항목을 추가하면 됩니다.
- 사진은 `images/`에 정사각형, 가로 400px, 200KB 이하로 넣으세요.

---

## 세미나 추가하기

`window.SEMINARS = [` 아래에 추가합니다. 항목이 하나도 없으면 Home의 세미나 블록은 자동으로 숨겨집니다.

```js
  { date: "2026-11-17", title: "세미나 제목", speaker: "발표자 또는 연구실", place: "장소" },
```

날짜는 `YYYY-MM-DD` 형식이어야 최신순 정렬이 맞습니다.
계획서의 월 1회 통합 아키텍처 리뷰 기록을 여기에 쌓으면 "세미나 교류" 항목이 이행됩니다.
쌓여서 길어지면 그때 별도 페이지로 분리하세요.

---

## 수정한 내용 확인하기

`index.html`을 더블클릭하면 브라우저에서 바로 열립니다. 서버가 필요 없습니다.

**화면이 비어 보인다면** `data.js` 문법이 깨진 것입니다. 원인은 대부분 셋 중 하나입니다.

1. 항목과 항목 사이 쉼표(`,`) 누락
2. 따옴표를 열고 닫지 않음
3. 값 안에 큰따옴표를 그냥 씀 → `\"` 로 써야 함

브라우저에서 `F12` → `Console` 탭을 열면 몇 번째 줄이 문제인지 알려줍니다.

---

## 배포

**첫 업로드** — `ultoma` 조직에서 New repository → 이름 `ultoma.github.io` → Public → Create.
빈 저장소 화면에서 Add file → Upload files 를 누르고, **이 폴더 자체가 아니라 폴더 안의 것들을** 드래그하세요.
`index.html`, `people.html`, `publications.html`, `assets` 폴더, `images` 폴더, `README.md` 입니다.
폴더째 올리면 주소 뒤에 폴더 이름이 붙습니다. 올린 뒤 Settings → Pages 에서 Source 가
Deploy from a branch / `main` / `(root)` 인지 확인하세요.

**이후 수정** — GitHub 저장소에 파일을 올리면 1~2분 뒤 자동 반영됩니다. `Actions` 탭에서 진행 상황을 볼 수 있습니다.
바로 안 바뀌면 강력 새로고침(`Ctrl+Shift+R` / `Cmd+Shift+R`)을 하세요. CSS가 캐시에 남아 있는 경우가 많습니다.

---

## 게시 전 확인할 것

- [ ] **사사문구** — 지금 푸터에 넣어둔 문구는 임시입니다. 협약서와 IITP 성과활용 지침의 정확한 문구로 교체하세요.
- [ ] **영문 과제명** — 계획서 표지 기준은 *Ultra-Long-Term Hierarchical Memory and Reasoning Architecture for Next-Generation Omnimodal Agents* 입니다. 발표자료 예시 이미지에는 Reasoning 대신 Inference로 되어 있으니, 계획서 표기로 통일하세요.
- [ ] **참여기관 로고** — 사용 전 각 기관의 CI 가이드와 사용 허가를 확인하세요.
- [ ] **구성원 동의** — 위 개인정보 항목 참고.
- [ ] **GitHub 조직** — 공개SW 저장소들을 이 웹사이트와 같은 `ultoma` 조직 아래 두세요. 계획서의 "통합 공개 GitHub 저장소 구축(1년차)"과 함께 이행됩니다.
- [ ] **소유자 2명 이상** — 조직 People 탭에서 연구책임자님을 Owner로 추가하세요. 소유자가 한 명이면 그 계정이 막혔을 때 아무도 손댈 수 없습니다.

---

## 자주 묻는 것

**메뉴를 늘리고 싶어요**
세 HTML 파일의 `<nav class="nav">`에 `<a>`를 추가하고, 새 페이지는 `people.html`을 복사해서 만드세요.

**색을 바꾸고 싶어요**
`assets/style.css` 맨 위 `:root`의 `--accent` 값만 바꾸면 링크·강조색이 한꺼번에 바뀝니다.

**영문 페이지도 필요해요**
`en/` 폴더를 만들고 세 파일을 복사해 번역하는 방식이 가장 단순합니다. 복사본 안의 경로는 `../assets/style.css`처럼 한 단계 위로 고쳐야 합니다.

**구글 검색에 잘 나오게 하려면**
성과·구성원 목록은 자바스크립트로 그려져 검색엔진이 늦게 읽습니다. 과제명과 핵심 설명은 `index.html`의 `<title>`, `<meta description>`, 히어로 문장에 직접 글로 넣어두었습니다. 목록까지 확실히 색인되길 원하면 나중에 Jekyll로 옮기면 됩니다.
