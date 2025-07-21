# CCTV 견적 폼 다중 위치별 수량 선택 기능 해결의뢰서

## 📋 프로젝트 개요

**프로젝트명**: 케어온(CareOn) - B2B 종합 렌탈 플랫폼  
**파일 경로**: `/app/quote/cctv/page.tsx`  
**기술 스택**: Next.js 15, TypeScript, React, Zustand, Tailwind CSS  
**문제 발생 일시**: 2025-01-22  
**Git 커밋 해시**: `0573993c400f4f2ca6115488a10f2b2b5afd9ff1`

## 🎯 핵심 문제점

### 문제 상황
CCTV 견적 폼에서 **다중 위치 선택 후 각 위치별 수량을 개별 선택하는 기능**이 정상적으로 작동하지 않음.

### 구체적 증상
1. **단일 위치 선택**: 정상 작동 ✅
2. **다중 위치 선택**: 첫 번째 위치 수량 선택 후 바로 다음 단계로 넘어감 ❌
3. **예상 동작**: 선택한 모든 위치에 대해 순차적으로 수량 선택 진행
4. **실제 동작**: 첫 번째 위치 수량 선택 후 나머지 위치 수량 선택 단계 건너뜀

## 🔍 기술적 분석

### 상태 구조
```typescript
type QuantitySelectionState = {
  currentLocationIndex: number;
  selectedQuantities: {[location: string]: number};
  locations: string[]; // 최근 추가된 필드
};
```

### 핵심 함수들
1. **handleMultipleSelect**: 다중 위치 선택 처리
2. **handleQuantitySelect**: 각 위치별 수량 선택 처리
3. **findNextValidStep**: 조건부 단계 전환 로직

### 시도된 해결책
1. ✅ **상태 동기화 개선**: `quantitySelection.locations` 필드 추가
2. ✅ **비동기 상태 업데이트 문제 해결**: `formData` 대신 `quantitySelection.locations` 사용
3. ✅ **타입 안전성 확보**: 모든 `setQuantitySelection` 호출에 `locations` 속성 추가
4. ✅ **디버깅 로그 추가**: 상태 추적 및 문제 진단 용이성 향상

## 📊 최신 테스트 결과

### 단일 위치 선택 (정상 작동)
```
🌳 실외/주차장 선택 → 2대 선택 → 다음 단계 이동 ✅
filteredLocations.length: 1
nextLocationIndex: 1
결과: "모든 위치 선택 완료!" → 정상 진행
```

### 다중 위치 선택 (문제 지속)
```
예상: 입구/출입구 + 카운터 + 주차장 선택 → 각각 수량 선택
실제: 첫 번째 위치 수량 선택 후 바로 완료 처리
```

## 🚨 현재 상황

### 해결된 부분
- [x] 상태 동기화 문제 해결
- [x] TypeScript 타입 오류 수정
- [x] 단일 위치 선택 정상 작동
- [x] 수량 선택 UI 조건부 렌더링 개선

### 미해결 부분
- [ ] 다중 위치 선택 시 순차적 수량 선택 미작동
- [ ] `filteredLocations` 배열이 올바르게 전달되지 않는 문제 의심
- [ ] 상태 업데이트 타이밍 이슈 가능성

## 📝 상세 로그 분석

### 문제 발생 지점
```javascript
// handleQuantitySelect 함수에서
const filteredLocations = quantitySelection.locations;
console.log('filteredLocations:', filteredLocations); // 예상: 다중 배열, 실제: 단일 요소?
```

### 의심 지점
1. **handleMultipleSelect**에서 `quantitySelection.locations` 설정 시점
2. **상태 업데이트 비동기 처리**로 인한 최신 값 미반영
3. **React 상태 배치 업데이트**로 인한 타이밍 이슈

## 🎯 요청사항

### 1. 근본 원인 분석
- 다중 위치 선택 시 `quantitySelection.locations` 배열이 올바르게 설정되지 않는 이유
- React 상태 업데이트 타이밍과 관련된 문제점 파악

### 2. 해결 방안 제시
- 안정적인 다중 위치별 순차 수량 선택 구현 방법
- 상태 동기화 문제의 근본적 해결책

### 3. 코드 개선안
- 현재 코드 구조에서 최소한의 변경으로 문제 해결
- 유지보수성과 확장성을 고려한 리팩토링 제안

## 📁 관련 파일 및 코드

### 주요 파일
- `/app/quote/cctv/page.tsx` (메인 컴포넌트)

### 핵심 코드 블록
```typescript
// 문제가 되는 handleQuantitySelect 함수
const handleQuantitySelect = (quantity: string) => {
  const filteredLocations = quantitySelection.locations; // 이 부분이 핵심
  const currentLocation = filteredLocations[quantitySelection.currentLocationIndex];
  
  // ... 수량 처리 로직
  
  if (nextLocationIndex < filteredLocations.length) {
    // 다음 위치로 이동 (여기서 문제 발생 의심)
  } else {
    // 모든 위치 완료 (너무 빨리 도달)
  }
};
```

## 🔧 개발 환경

- **Node.js**: v18+
- **Next.js**: 15.3.4
- **React**: 18+
- **TypeScript**: 5+
- **개발 서버**: http://localhost:3001

## 📞 연락처 및 추가 정보

**개발자**: Shin Ja-dong  
**프로젝트**: CareOn B2B 렌탈 플랫폼  
**우선순위**: 높음 (핵심 비즈니스 로직)  
**데드라인**: 가능한 빠른 시일 내

---

## 💡 추가 참고사항

이 문제는 사용자 경험에 직접적인 영향을 미치는 핵심 기능입니다. 다중 위치 CCTV 설치 견적이 정확하게 계산되지 않으면 비즈니스 로직 전체에 문제가 발생할 수 있습니다.

전문가의 신속하고 정확한 해결책을 기대합니다. 🙏
