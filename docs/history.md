# 작업 이력

### [2026-10-30] 할 일 항목을 카드 형태로 변경
- **작업 내용**: `src/App.css` — `.todo-list`를 세로 flex(gap 10px)로, `li`를 카드(배경 `--card`, 둥근 모서리, 옅은 초록 테두리, 그림자, hover 효과)로 변경. `src/index.css` — 카드 배경용 `--card` 변수 추가(라이트 #f4f9f3 / 다크 #1c2822)
- **변경 사유**: 항목을 카드로 구분해 가독성을 높이고 초록 테마와 통일
- **검증 결과**: `npm run build` 성공. 브라우저 확인은 하지 않음

### [2026-10-30] 배경색을 초록 테마에 맞게 변경
- **작업 내용**: `src/index.css` — 라이트 `--bg` #fff → #f3f7f4, 다크 #16171d → #141b17. `--border`, `--code-bg`, `--text`, `--text-h`도 초록 톤으로 맞춤
- **변경 사유**: 초록 테마 색과 어울리는, 눈이 편한 배경으로 통일
- **검증 결과**: `npm run build` 성공. 브라우저 확인은 하지 않음

### [2026-10-30] 테마 색상을 차분한 초록색으로 변경
- **작업 내용**: `src/index.css` — 라이트 `--accent` #aa3bff → #3f7d5c, 다크 #c084fc → #7fbf9b (bg/border 계열 값도 같은 색 기준으로 변경)
- **변경 사유**: 눈이 편한 채도 낮은 초록 테마로 변경. 테마 색은 `App.jsx`가 아닌 `index.css`의 CSS 변수에 정의되어 있음
- **검증 결과**: `npm run build` 성공. 브라우저 확인은 하지 않음

### [2026-10-30] Todo 항목별 메모 기능 추가
- **작업 내용**:
  - `src/components/TodoMemo.jsx` 신규: 메모 입력 textarea 컴포넌트
  - `src/App.jsx`: todo에 `memo` 필드 추가, Memo 버튼(열기/닫기), `updateMemo`/`toggleMemo` 핸들러
  - `src/App.css`: 항목 줄바꿈(`flex-wrap`), `.todo-memo` 스타일, 메모가 있으면 Memo 버튼 강조(`.has-memo`)
- **변경 사유**: 각 할 일에 부가 설명을 남길 수 있도록 함
- **검증 결과**: `npm run build` 성공 (18 modules, 오류 없음). 브라우저 동작은 미확인

### [2026-10-30] Todo 리스트 페이지 구현
- **작업 내용**: `src/App.jsx`, `src/App.css` — 추가/완료/수정/삭제, 필터(All/Active/Done), 완료 항목 정리, localStorage 저장
- **변경 사유**: Vite 기본 화면을 Todo 리스트 페이지로 교체
- **검증 결과**: 실행 검증 없음
