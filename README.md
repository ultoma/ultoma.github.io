# 초장기 계층형 기억·추론 아키텍처 — 과제 홈페이지

**차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처** (RS-2026-25524173, 2026.04 – 2030.12)
과제의 성과 게시용 홈페이지입니다. <https://ultoma.github.io>

| 페이지 | 내용 |
|---|---|
| Home | 과제 개요, 연구 내용, 정량 성과 현황, 회의·세미나 기록 |
| People | 참여 연구진 |
| Publications | 과제 사사가 들어간 논문 · 공개SW · 특허 |

---

# 사사(Acknowledgment) 표기 및 성과 등록

## 1. 등록 대상

과제 사사(acknowledgment)가 들어간 성과만 등록합니다. IITP 「연구성과 인정기준」 요약:

| 종류 | 등록 시점 | 인정 조건 |
|---|---|---|
| 논문 | 최종 게재 완료 후 | 사사 기재 · 게재일이 연구기간 내 · 연구책임자 또는 참여연구원이 제1/제2/교신저자. accept 메일·Online First·단순 발표는 불인정 |
| 공개SW | 저장소 공개 후 | GitHub 저장소 URL |
| 특허 | 출원번호 발급 후 | 출원서에 과제 정보 기재 · 법인(산학협력단) 명의. 개인 명의 불인정 |

### 논문 사사 문구

국문
> 이 논문은 2026년도 정부(과학기술정보통신부)의 재원으로 정보통신기획평가원의 지원을 받아 수행된 연구임 (No. RS-2026-25524173, 차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처)

영문
> This work was supported by Institute of Information & communications Technology Planning & Evaluation (IITP) grant funded by the Korea government (MSIT) (No. RS-2026-25524173, Ultra-Long-Term Hierarchical Memory and Reasoning Architecture for Next-Generation Omnimodal Agents)

- 연도는 해당 연차 연도로 바꿉니다.
- 다른 과제와 공동 성과면 "This work was **partly** supported by … (No. RS-2026-25524173, 과제명, 기여율) and …" 형식으로 기여율을 함께 적습니다.

### 특허 출원서 「국가연구개발사업」 항목

| 항목 | 값 |
|---|---|
| 과제고유번호 | RS-2026-25524173 |
| 부처명 | 과학기술정보통신부 |
| 연구관리전문기관 | 정보통신기획평가원 |
| 연구사업명 | 경량·저전력AI 한계극복기술개발 |
| 연구과제명 | 차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처 |
| 기여율 | 1/1 (공동이면 과제별 분수, 합 1) |
| 주관기관 | 서울대학교 산학협력단 |
| 연구기간 | 2026. 04. 01 ~ 2030. 12. 31 |

출원 때 빠뜨렸으면 특허청 전자출원시스템에서 출원서 보정으로 추가할 수 있습니다 (수수료 없음).

---

## 2. 등록 방법

고치는 파일은 [`assets/data.js`](assets/data.js) 하나입니다. GitHub 웹에서:

1. [`assets/data.js`](https://github.com/ultoma/ultoma.github.io/blob/main/assets/data.js) 를 열고 연필(Edit) 아이콘 클릭
2. `window.OUTPUTS = [` 아래에 성과 블록 추가 (양식은 3번)
3. **Commit changes** → "Create a new branch for this commit and start a pull request" 선택 → Propose changes
4. bibtex 파일이 있으면 같은 브랜치에서 Add file → Create new file, 파일명 `bibtex/성-학회연도.txt`
5. Pull request 생성. 자동 검사가 ❌ 이면 Details 에서 줄 번호 확인 후 수정 (대부분 쉼표·따옴표)

담당자가 merge 하면 1~2분 뒤 사이트에 반영됩니다. git 에 익숙하면 clone → branch → PR 로 해도 됩니다.

---

## 3. 양식

```js
  {
    type: "논문",                    // "논문" | "공개SW" | "특허"
    lab: "서울대학교 머신러닝 연구실",  // 성과를 낸 연구실 (집계용, 화면에 안 나옴)
    title: "논문 제목 (게재본 그대로)",
    authors: "First Author, Second Author, Hyun Oh Song",
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2026,                      // 따옴표 없이 숫자
    note: "",                        // "Oral (77/21,575=0.35%)" 등. 없으면 ""
    links: { paper: "https://arxiv.org/abs/...", code: "https://github.com/...", bibtex: "bibtex/Kim-NeurIPS26.txt" },
    top10: true                      // 논문만. 아래 참고
  },
```

- **공개SW**: `type: "공개SW"`, `authors` 에 연구실, `venue` 에 라이선스, `links: { code: "저장소 URL" }`. `top10` 없음.
- **특허**: `type: "특허"`, `authors` 에 출원인(산학협력단), `venue: "국내"`, `links: {}`, `top10` 대신 `status: "출원"` 또는 `"등록"`.
- `links` 는 키 이름이 그대로 링크 글자가 됩니다 (`"project page"`, `poster`, `supp` 등 자유롭게). 빈 값은 표시되지 않습니다.
- bibtex 는 `bibtex/` 폴더에 `.txt` 로 넣고 경로를 적습니다. 기존 파일 참고.
- 아직 확정 전인 성과는 `/* … */` 로 감싸 두면 화면에 나오지 않습니다.
- 문법: 블록은 `{ },` 로 끝내고, 값은 `"따옴표"`. 숫자와 `true`/`false` 만 따옴표 없이.

**`top10`** — 과제 핵심 지표 "CS 탑 컨퍼런스 논문 90편"의 판정 기준은 [research.com Best Computer Science Conferences](https://research.com/conference-rankings/computer-science) **상위 10%** 입니다. 해당하면 `true`, 저널·워크숍은 `false`. `true` 만 Home 의 집계에 반영됩니다. 애매하면 `true` 로 두고 PR 에 "top10 확인 요망" 이라고 적어 주세요.

---

## 4. 체크리스트

- [ ] 과제 사사(RS-2026-25524173)가 들어간 성과다
- [ ] 논문은 최종 게재 완료되었다
- [ ] `type` `lab` `title` `authors` `venue` `year` 를 채웠다
- [ ] 논문은 `top10`, 특허는 `status` 를 적었다
- [ ] bibtex 파일을 `bibtex/` 에 넣고 경로를 적었다 (있는 경우)
- [ ] 연구실 구성원이 바뀌었으면 `PEOPLE` 도 고쳤다 (아래)

---

## 5. 구성원 · 회의 기록

같은 `assets/data.js` 에서 고칩니다.

```js
// PEOPLE — 참여연구원은 같은 lab 끼리 한 줄로 나열됩니다
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "홍길동" },

// SEMINARS — 전체회의, 연구실 간 세미나 등. 비어 있으면 Home 에서 숨겨집니다
  { date: "2026-08-19", title: "진행상황 및 마일스톤 공유", speaker: "참여기관 전체", place: "" },
```

이름만 게시하며 사진·이메일·생년월일 등 개인정보는 싣지 않습니다.

---

## 6. 파일 구성

```
index.html / people.html / publications.html   페이지 (내용은 data.js 에서 생성)
assets/data.js      ★ 성과 · 구성원 · 회의 기록 · 목표치. 평소 고치는 건 이 파일 하나
assets/site.js      data.js 를 화면에 그리는 코드
assets/style.css    스타일
bibtex/             논문별 bibtex (.txt)
scripts/check-data.js   data.js 검사기. PR 마다 자동 실행 (GitHub Actions)
```

로컬 확인: `python3 -m http.server 8000` → <http://localhost:8000>. 검사: `node scripts/check-data.js`.
화면이 비어 보이면 data.js 문법 오류입니다 — 검사기가 줄 번호를 알려줍니다.

---

## 7. 운영 메모

- 연구실별 성과 담당자에게 저장소 Write 권한을 줍니다. 등록은 PR 로, merge 는 관리자가.
- 과제 공개SW 저장소는 같은 `ultoma` 조직 아래에 둡니다 (계획서 "통합 공개 GitHub 저장소").
- 조직 Owner 는 2명 이상으로 유지합니다.
- Home 의 정량 성과 현황은 `OUTPUTS` 를 세어 `TARGETS`(논문 90 · 공개SW 45 · 특허 등록 22)와 비교한 것입니다. 별도 집계표가 필요 없습니다.

---

문의: 추시훈 (서울대학교 머신러닝 연구실) · <sihun.chu@mllab.snu.ac.kr>
