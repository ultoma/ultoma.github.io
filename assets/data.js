/* =========================================================================
   ★★★ 평소에 고치는 파일은 여기 하나입니다 ★★★

   과제: 차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처
   과제번호: RS-2026-25524173

   - 사람이 늘면  PEOPLE 에 { } 한 줄 추가
   - 성과가 나오면 OUTPUTS 에 { } 블록 하나 추가

   규칙 3가지만 지키면 됩니다.
   1) 각 항목은 { } 로 감싸고, 항목끼리는 쉼표(,)로 구분
   2) 값은 따옴표("")로 감싸기. 숫자(year)와 true/false 만 따옴표 없이
   3) 값 안에 큰따옴표를 쓰고 싶으면 \" 로 이스케이프

   저장 후 화면이 비어 보이면 대부분 쉼표나 따옴표를 빠뜨린 것입니다.
   브라우저에서 F12 → Console 탭을 열면 몇 번째 줄이 문제인지 알려줍니다.
   ========================================================================= */


/* ------------------------------------------------------------------
   1. 정량 성과 목표 (계획서 3-1 세부사업 질적 성과 목표 기준)
      Home 화면의 진행 현황 막대가 이 숫자를 기준으로 계산됩니다.
   ------------------------------------------------------------------ */
window.TARGETS = {
  topPapers: 90,   // CS 분야 국제 탑 컨퍼런스 논문 (가중치 60%)
  repos:     45,   // GitHub 저장소 수 (가중치 20%) — 공개SW 항목과 성과의 links.code 를 합쳐 셉니다 (중복 주소 제외)
  patents:   22    // 국내 특허 등록 4건 + 10건, 국제 등록 8건 → 등록 기준 합계
};


/* ------------------------------------------------------------------
   2. 구성원 — People 페이지에 아래 순서대로 표시됩니다.

      group : PEOPLE_GROUPS 중 하나
      name  : 이름
      desc  : 소속·직위. 교수진은 사진 오른쪽에 표시되고, 참여연구원은 생략합니다.
      email : 교수진만. 기관 메일 주소 (사진 오른쪽 desc 아래에 링크로 표시). 없으면 생략
      role  : 교수진만. 이 과제에서 맡은 부분. 지금은 비워 두었고, 값을 넣으면 desc 아래에 표시됩니다.
      lab   : 참여연구원만 사용. 같은 lab 끼리 묶여 사진이 한 줄에 6명씩 나열됩니다.
      url   : 있으면 이름(교수진은 "홈페이지" 링크)에 링크가 걸립니다 (선택)
      photo : 사진 경로. 예 "images/people/hong-gildong.jpg"
              → 비워 두거나 아예 안 적으면 images/people/placeholder.svg 가 대신 나옵니다.
              세로로 긴 3:4 비율 사진이 가장 잘 맞습니다 (예 450x600). images/people/ 에 넣으세요.
   ------------------------------------------------------------------ */
window.PEOPLE_GROUPS = ["연구책임자", "공동연구자", "참여연구원", "참여기업"];

window.PEOPLE = [
  {
    group: "연구책임자", name: "송현오",
    desc:  "서울대학교 컴퓨터공학부 부교수",
    email: "hyunoh@mllab.snu.ac.kr",
    url:   "https://mllab.snu.ac.kr/hyunoh/",
    photo: "images/people/hyun-oh-song.png"
  },

  // 공동연구자 — 화면에 이 순서대로 한 줄에 두 분씩 나옵니다
  // email 과 photo 는 각 연구실 담당자가 채워 주세요. 비어 있으면 그 줄은 화면에 안 나옵니다.
  {
    group: "공동연구자", name: "이재욱",
    desc:  "서울대학교 컴퓨터공학부 교수",
    email: "",
    url:   "https://arc.snu.ac.kr/people/jw/",
    photo: ""
  },
  {
    group: "공동연구자", name: "김건희",
    desc:  "서울대학교 컴퓨터공학부 교수",
    email: "",
    url:   "https://vision.snu.ac.kr/gunhee/",
    photo: "images/people/gunhee-kim.png"
  },
  {
    group: "공동연구자", name: "심재웅",
    desc:  "서울대학교 전기정보공학부 부교수",
    email: "jaewoong@snu.ac.kr",
    url:   "https://jaewoong.org/",
    photo: "images/people/jaewoong-sim.jpg"
  },
  {
    group: "공동연구자", name: "모상우",
    desc:  "포항공과대학교 산업경영공학과 조교수",
    email: "",
    url:   "https://sites.google.com/view/sangwoomo",
    photo: ""
  },

  // 참여연구원 — 연구실 순서는 위 교수진 순서(송현오 → 이재욱 → 김건희 → 심재웅 → 모상우)와 맞춥니다
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "문승용", photo: "images/people/seungyong-moon.jpg" },
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "이덕재", photo: "images/people/deokjae-lee.jpg" },
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "김진욱", photo: "images/people/jinuk-kim.jpg" },
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "김영인", photo: "images/people/youngin-kim.jpg" },
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "염준영", photo: "images/people/junyoung-yeom.jpg" },
  { group: "참여연구원", lab: "서울대학교 머신러닝 연구실 (송현오)", name: "추시훈", photo: "images/people/sihun-chu.jpg" },

  { group: "참여연구원", lab: "서울대학교 아키텍처 및 코드 최적화 연구실 (이재욱)", name: "이승렬" },
  { group: "참여연구원", lab: "서울대학교 아키텍처 및 코드 최적화 연구실 (이재욱)", name: "박리해" },
  { group: "참여연구원", lab: "서울대학교 아키텍처 및 코드 최적화 연구실 (이재욱)", name: "권상우" },
  { group: "참여연구원", lab: "서울대학교 아키텍처 및 코드 최적화 연구실 (이재욱)", name: "임근수" },

  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "송석원", photo: "images/people/seokwon-song.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "안재우", photo: "images/people/jaewoo-an.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "정진서", photo: "images/people/jinseo-jeong.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "구준서", photo: "images/people/junseo-koo.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "김현수", photo: "images/people/hyunsoo-kim.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "김준서", photo: "images/people/junseo-kim.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "최세연", photo: "images/people/seyeon-choi.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "문지환", photo: "images/people/jihwan-moon.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "박건희", photo: "images/people/keonhee-park.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "이태현", photo: "images/people/taehyun-lee.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "오예림", photo: "images/people/yerim-oh.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "박민수", photo: "images/people/minsu-park.png" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "김소현", photo: "images/people/sohyeon-kim.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "박은규", photo: "images/people/eunkyu-park.jpg" },
  { group: "참여연구원", lab: "서울대학교 시각 및 학습 연구실 (김건희)", name: "우승윤", photo: "images/people/seungyoon-woo.png" },

  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "이준서", photo: "images/people/junseo-lee.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "최관석", photo: "images/people/kwanseok-choi.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "이준기", photo: "images/people/jungi-lee.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "이원범", photo: "images/people/wonbeom-lee.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "조재훈", photo: "images/people/jaehoon-cho.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "이석원", photo: "images/people/seokwon-lee.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "박준용", photo: "images/people/junyong-park.jpg" },
  { group: "참여연구원", lab: "서울대학교 컴퓨터 구조 및 시스템 연구실 (심재웅)", name: "전상윤", photo: "images/people/sangyun-jeon.jpg" },

  { group: "참여연구원", lab: "포항공과대학교 멀티모달 통합지능 연구실 (모상우)", name: "김명수" },
  { group: "참여연구원", lab: "포항공과대학교 멀티모달 통합지능 연구실 (모상우)", name: "조은찬" },
  { group: "참여연구원", lab: "포항공과대학교 멀티모달 통합지능 연구실 (모상우)", name: "장승현" },
  { group: "참여연구원", lab: "포항공과대학교 멀티모달 통합지능 연구실 (모상우)", name: "이수찬" },

  { group: "참여연구원", lab: "㈜노타", name: "이요한" },
  { group: "참여연구원", lab: "㈜노타", name: "신휘명" },

  { group: "참여기업", name: "㈜노타", desc: "공동연구개발기관", url: "https://www.nota.ai/" },
  { group: "참여기업", name: "㈜퓨리오사에이아이", desc: "협력기관", url: "https://furiosa.ai/" }
];


/* ------------------------------------------------------------------
   3. 성과 (논문 · 공개SW · 특허)

      ★ 등록 방법·양식·사사 문구: README.md

      성과가 나오면 window.OUTPUTS = [ 바로 아래에 { } 블록 하나를 추가하세요.
      연도 내림차순으로 자동 정렬되고, 같은 연도 안에서는 적은 순서대로 보입니다.

      type    : "논문" | "공개SW" | "특허"   ← Publications 페이지에서 이 순서로 섹션이 나뉩니다
      lab     : 성과를 낸 연구실 (화면에는 안 나오고 연구실별 집계용)
      title   : 제목
      authors : 저자. 공개SW는 개발 기관, 특허는 출원인
      venue   : 학회·저널 이름. 공개SW는 라이선스, 특허는 "국내" / "국제(PCT)" 등 (status 와 합쳐져 "국내 출원" 으로 표시)
      year    : 연도 (숫자, 따옴표 없이)
      note    : 제목 아래 굵게 붙는 한 줄. "Oral (77/21,575=0.35%)" 처럼. 없으면 ""
      image   : 왼쪽에 놓이는 대표 이미지 경로. 예 "images/publications/kim26icml_2.png"
                → 비워 두거나 안 적으면 images/publications/placeholder.svg 가 대신 나옵니다.
                가로로 긴 그림(논문 1페이지 대표 그림)이 잘 맞습니다. images/publications/ 에 넣으세요.
      links   : { paper: "", code: "", bibtex: "", "project page": "", poster: "" }
                키 이름이 그대로 링크 글자가 됩니다.
                → 값이 비어 있으면 회색 글자로 자리만 표시되고, 눌러도 이동하지 않습니다 (준비 중 표시).
                  링크가 아직 정리 중이면 빈 값("")인 채로 먼저 올리고, 주소가 나오면 따옴표 안만 채우면 됩니다.
                  자리 표시도 원하지 않으면 그 키를 아예 지우세요.
                필요한 키만 적어도 되고 새 키(supp, slides, talk video …)를 추가해도 됩니다.
                bibtex 는 이 리포의 bibtex/ 폴더에 .txt 로 넣고 "bibtex/파일명.txt" 로 적으면 됩니다.
      top10   : 논문만. CS 탑 컨퍼런스(research.com 상위 10%)면 true → Home 집계에 반영
      status  : 특허만. "출원" | "등록" → "등록"만 Home 집계에 반영

      ── 복사해서 쓰는 양식 ──────────────────────────────────────────
      {
        type: "논문",
        lab: "서울대학교 ○○ 연구실",
        title: "",
        authors: "",
        venue: "",
        year: 2026,
        note: "",
        image: "",
        links: { paper: "", code: "", bibtex: "" },
        top10: true
      },
      ─────────────────────────────────────────────────────────────
   ------------------------------------------------------------------ */
window.OUTPUTS = [
  {
    type: "논문",
    lab: "서울대학교 머신러닝 연구실",
    title: "Q-Strata: Hierarchical Bit Allocation for Mixed-Precision Quantization of Mixture-of-Experts LLMs",
    authors: "Deokjae Lee, Sihun Chu, Hyun Oh Song",
    venue: "Empirical Methods in Natural Language Processing (EMNLP)",
    year: 2026,
    note: "",
    image: "",                                          // 대표 이미지 준비 중 → placeholder 표시
    // paper / code / bibtex 정리 중 — 회색으로 자리만 표시됩니다. 주소가 나오면 따옴표 안만 채우면 됩니다
    links: { paper: "", code: "", bibtex: "" },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 머신러닝 연구실",
    title: "Identifiable Token Correspondence for World Models",
    image: "images/publications/kim26icml_2.png",
    authors: "Youngin Kim*, Ray Sun*, Inho Kim, Bumsoo Park, Hyun Oh Song",
    venue: "International Conference on Machine Learning (ICML)",
    year: 2026,
    note: "",
    links: {
      paper: "https://arxiv.org/abs/2605.16457",
      code: "https://github.com/snu-mllab/Identifiable-Token-Correspondence",
      bibtex: "bibtex/Kim-ICML26_2.txt"
    },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 머신러닝 연구실",
    title: "Rule2DRC: Benchmarking LLM Agents for DRC Script Synthesis with Execution-Guided Test Generation",
    image: "images/publications/kim26icml_1_light.png",
    authors: "Jinuk Kim, Junsoo Byun, Donghwi Hwang, Seong-Jin Park, Hyun Oh Song",
    venue: "International Conference on Machine Learning (ICML)",
    year: 2026,
    note: "",
    links: {
      paper: "https://arxiv.org/abs/2605.15669",
      code: "https://github.com/snu-mllab/Rule2DRC",
      bibtex: "bibtex/Kim-ICML26_1.txt",
      "project page": "https://jinukkim.me/blog/rule2drc/",
      poster: "https://drive.google.com/file/d/16YmmpAfSr9LtAfeEjeWdTrLCzXWVpJdA/view"
    },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 시각 및 학습 연구실",
    title: "SiGMA: Sign-Guided Merging and Adaptation for Multimodal Continual Instruction Tuning",
    authors: "Keonhee Park, Gunhee Kim",
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2026,
    note: "",
    image: "images/publications/park26eccv.png",
    links: {
      paper: "https://arxiv.org/pdf/2607.20511",
      code: "https://github.com/pgh2874/SiGMA-Multimodal-Continaul-Instruction-Tuning",
      bibtex: "bibtex/Park-ECCV26.txt"
    },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 시각 및 학습 연구실",
    title: "REPAIR: Resolving Long-Tail Confusion in Scientific Retrievers via Fact-Verified Iterative Refinement",
    authors: "Yerim Oh, Gunhee Kim",
    venue: "Empirical Methods in Natural Language Processing (EMNLP)",
    year: 2026,
    note: "",
    image: "",
    // paper / code / bibtex 정리 중 — 회색으로 자리만 표시됩니다. 주소가 나오면 따옴표 안만 채우면 됩니다
    links: { paper: "", code: "", bibtex: "" },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 시각 및 학습 연구실",
    title: "MULTI3IR: A Benchmark for Multi-perspective, Multi-domain, Multi-modal Information Retrieval",
    authors: "Seokwon Song, Sohyeon Kim, Gunhee Kim",
    venue: "Empirical Methods in Natural Language Processing (EMNLP)",
    year: 2026,
    note: "",
    image: "",
    links: { paper: "", code: "", bibtex: "" },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 시각 및 학습 연구실",
    title: "DuplexGen: Adaptive Synthesis of Human-AI Turn-Taking Dialogues",
    authors: "Takyoung Kim, Kang-wook Kim, Sang Hoon Woo, Julia Hirschberg, Gunhee Kim, Dilek Hakkani-Tür",
    venue: "Empirical Methods in Natural Language Processing (EMNLP)",
    year: 2026,
    note: "",
    image: "images/publications/kim26emnlp_duplexgen.png",
    links: {
      paper: "https://arxiv.org/pdf/2607.26178",
      code: "https://github.com/duplexgen/duplexgen-code",
      bibtex: "bibtex/Kim-EMNLP26.txt"
    },
    top10: true
  },
  {
    type: "논문",
    lab: "서울대학교 시각 및 학습 연구실",
    title: "STREAMALIGN: Streaming Text-Aligned Speech Tokenization",
    authors: "Kang-wook Kim, Jinyoung Park, Jinsoo Kim, Sehun Lee, Tony Woo, Gunhee Kim",
    venue: "Empirical Methods in Natural Language Processing (EMNLP)",
    year: 2026,
    note: "",
    image: "",
    links: { paper: "", code: "", bibtex: "" },
    top10: true
  },
];


/* ------------------------------------------------------------------
   4. 회의 · 세미나 기록
      계획서의 "세미나 교류를 위한 홈페이지" 항목에 해당합니다.
      전체회의, 연구실 간 세미나, 통합 아키텍처 리뷰 등을 한 줄씩 남기면 됩니다.
      항목이 하나도 없으면 Home 의 블록은 자동으로 숨겨집니다.

      date    : "YYYY-MM-DD" (최신순 정렬에 쓰임)
      title   : 한 줄 제목
      speaker : 발표자·주관. 없으면 ""
      place   : 장소. 없으면 ""
   ------------------------------------------------------------------ */
window.SEMINARS = [
  {
    date: "2026-08-19",
    title: "진행상황 및 마일스톤 공유",
    speaker: "서울대학교 · 포항공과대학교 · ㈜노타 · ㈜퓨리오사에이아이",
    place: ""   // 장소를 적으면 제목 아래에 표시됩니다
  },
];
