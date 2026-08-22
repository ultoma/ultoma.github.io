/* =========================================================================
   ★★★ 평소에 고치는 파일은 여기 하나입니다 ★★★

   과제: 차세대 옴니모달 에이전트를 위한 초장기 계층형 기억·추론 아키텍처
   과제번호: RS-2026-25524173

   - 사람이 늘면  PEOPLE 에 { } 블록 하나 추가
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
  repos:     45,   // GitHub 저장소 수 (가중치 20%)
  patents:   22    // 국내 특허 등록 4건 + 10건, 국제 등록 8건 → 등록 기준 합계
};


/* ------------------------------------------------------------------
   2. 구성원 그룹 — 이 순서대로 People 페이지에 표시됩니다.
      PEOPLE 의 group 값은 반드시 아래 목록 중 하나와 똑같이 적으세요.
   ------------------------------------------------------------------ */
window.PEOPLE_GROUPS = [
  "초장기 기억 및 추론",
  "차세대 모델 아키텍처",
  "옴니모달 에이전트 응용",
  "참여기업"
];


/* ------------------------------------------------------------------
   3. 구성원

      photo: images 폴더에 넣은 사진 경로. 없으면 "" 로 두면
             이름 첫 글자가 대신 표시됩니다 (깨진 이미지 안 뜸).

      ※ 개인정보 주의
        - 휴대전화 번호는 절대 넣지 마세요. 계획서에는 있지만 웹 게시용이 아닙니다.
        - 참여연구원 41명(박사 27, 석사 10 등)의 이름·사진·이메일을 올리려면
          본인 동의를 먼저 받으세요. 동의 없이는 교수진과 기관만 게시하는 게 안전합니다.
        - 아래 이메일은 계획서에 기재된 기관 계정만 넣어두었습니다.
   ------------------------------------------------------------------ */
window.PEOPLE = [
  {
    group: "초장기 기억 및 추론",
    name: "송현오",
    nameEn: "Hyun Oh Song",
    role: "연구책임자 · 부교수",
    affiliation: "서울대학교 컴퓨터공학부 · 머신러닝 연구실",
    interest: "알고리즘 · 인공지능 경량화 및 맥락 압축",
    photo: "",
    email: "hyunoh@snu.ac.kr",
    homepage: "",
    scholar: ""
  },
  {
    group: "초장기 기억 및 추론",
    name: "심재웅",
    nameEn: "Jaewoong Sim",
    role: "부교수",
    affiliation: "서울대학교 전기정보공학부 · 컴퓨터 구조 및 시스템 연구실",
    interest: "시스템 · 인공지능 추론 시스템 최적화",
    photo: "",
    email: "",
    homepage: "",
    scholar: ""
  },
  {
    group: "차세대 모델 아키텍처",
    name: "이재욱",
    nameEn: "Jaewook Lee",
    role: "교수",
    affiliation: "서울대학교 컴퓨터공학부 · 아키텍처 및 코드 최적화 연구실",
    interest: "시스템 · 모델 아키텍처 특이적 HW/SW 최적화",
    photo: "",
    email: "",
    homepage: "",
    scholar: ""
  },
  {
    group: "차세대 모델 아키텍처",
    name: "모상우",
    nameEn: "Sangwoo Mo",
    role: "조교수",
    affiliation: "포항공과대학교 산업경영공학과 · 멀티모달 통합지능 연구실",
    interest: "알고리즘 · 계층적 문맥 병합, SSM",
    photo: "",
    email: "sangwoo.mo@postech.ac.kr",
    homepage: "",
    scholar: ""
  },
  {
    group: "옴니모달 에이전트 응용",
    name: "김건희",
    nameEn: "Gunhee Kim",
    role: "교수",
    affiliation: "서울대학교 컴퓨터공학부 · 시각 및 학습 연구실",
    interest: "알고리즘 · 옴니모달 인공지능",
    photo: "",
    email: "",
    homepage: "",
    scholar: ""
  },
  {
    group: "참여기업",
    name: "㈜노타",
    nameEn: "Nota AI",
    role: "공동연구개발기관",
    affiliation: "AI 모델 최적화·경량화 플랫폼 NetsPresso, 비전-언어 모델 NVA",
    interest: "옴니모달 에이전트 응용 · 시스템",
    photo: "",
    email: "",
    homepage: "https://www.nota.ai/",
    scholar: ""
  },
  {
    group: "참여기업",
    name: "㈜퓨리오사에이아이",
    nameEn: "FuriosaAI",
    role: "협력기관",
    affiliation: "데이터센터 AI 추론 가속기 RNGD NPU 및 Furiosa SDK",
    interest: "NPU 실증 및 상용 레퍼런스 확보",
    photo: "",
    email: "",
    homepage: "https://furiosa.ai/",
    scholar: ""
  }
];


/* ------------------------------------------------------------------
   4. 저자 강조
      성과 목록의 저자 이름이 아래와 일치하면 굵게 표시됩니다.
      참여연구원이 늘면 여기에 이름을 계속 추가하세요.
   ------------------------------------------------------------------ */
window.OUR_AUTHORS = [
  "송현오", "Hyun Oh Song",
  "심재웅", "Jaewoong Sim",
  "이재욱", "Jaewook Lee",
  "모상우", "Sangwoo Mo",
  "김건희", "Gunhee Kim"
];


/* ------------------------------------------------------------------
   5. 성과 (논문 · 공개SW · 특허)

      type   : "논문" | "공개SW" | "특허"   ← 필터 버튼이 이 값으로 만들어집니다
      top10  : 논문일 때만 사용. CS 분야 국제 탑 컨퍼런스(research.com
               'Best Computer Science Conferences' 상위 10%)에 해당하면 true.
               ★ 이 값이 true 인 것만 90편 목표에 카운트됩니다.
      status : 특허일 때만 사용. "출원" 또는 "등록"
      note   : "Oral", "Spotlight", "SMART AAA" 등 부가 정보. 없으면 ""
      links  : 없는 항목은 "" 로 두면 표시되지 않습니다.

      ※ 아래 5건은 화면 형식을 보여주기 위한 예시입니다.
        발표자료에 저자가 "Kim et al." 형태로만 적혀 있어 그대로 옮겼으니,
        실제 게시 전에 전체 저자 목록으로 바꾸고 과제 성과로 교체하세요.
   ------------------------------------------------------------------ */
window.OUTPUTS = [
  {
    year: 2025,
    type: "논문",
    top10: true,
    title: "KVzip: Query-Agnostic KV Cache Compression with Context Reconstruction",
    authors: "Kim et al.",
    venue: "NeurIPS 2025",
    note: "Oral · Top 0.35%",
    links: { pdf: "", arxiv: "", code: "https://github.com/snu-mllab/KVzip", doi: "" }
  },
  {
    year: 2025,
    type: "논문",
    top10: true,
    title: "Gaze Beyond the Frame: Forecasting Egocentric 3D Visual Span",
    authors: "Yun et al.",
    venue: "NeurIPS 2025",
    note: "Spotlight · Top 3.19%",
    links: { pdf: "", arxiv: "", code: "", doi: "" }
  },
  {
    year: 2025,
    type: "논문",
    top10: false,
    title: "Sparsified State-Space Models are Efficient Highway Networks",
    authors: "Song et al.",
    venue: "TMLR 2025",
    note: "저널 · 탑 컨퍼런스 지표 미해당",
    links: { pdf: "", arxiv: "", code: "", doi: "" }
  },
  {
    year: 2025,
    type: "공개SW",
    title: "KVzip — 질의 비의존적 KV 캐시 압축 구현체",
    authors: "머신러닝 연구실",
    venue: "MIT License",
    note: "",
    links: { pdf: "", arxiv: "", code: "https://github.com/snu-mllab/KVzip", doi: "" }
  },
  {
    year: 2026,
    type: "특허",
    status: "출원",
    title: "위치 비의존적 KV 캐시 재사용 및 압축 방법과 그 장치",
    authors: "서울대학교 산학협력단",
    venue: "국내 출원",
    note: "출원번호 입력 필요",
    links: { pdf: "", arxiv: "", code: "", doi: "" }
  }
];


/* ------------------------------------------------------------------
   6. 세미나 · 연구팀 교류 기록
      계획서의 "세미나 교류를 위한 홈페이지" 항목에 해당합니다.
      월 1회 통합 아키텍처 리뷰 기록을 여기에 쌓으면 됩니다.
      항목이 하나도 없으면 Home 의 세미나 블록은 자동으로 숨겨집니다.
   ------------------------------------------------------------------ */
window.SEMINARS = [
  {
    date: "2026-09-15",
    title: "통합 아키텍처 리뷰 #1 — 위치 비의존적 KV 캐시 모듈화",
    speaker: "머신러닝 연구실",
    place: "서울대 해동첨단공학관 313호"
  },
  {
    date: "2026-10-20",
    title: "통합 아키텍처 리뷰 #2 — SSM Hybrid 모델 설계 방향",
    speaker: "멀티모달 통합지능 연구실 (POSTECH)",
    place: "온라인"
  }
];
