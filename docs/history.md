# 작업 이력

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
