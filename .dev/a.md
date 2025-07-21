분석 결과, 문제의 핵심은 **`handleMultipleSelect` 함수에서 다음 단계로 이동하는 로직이 중복**되어 있어 `quantitySelection` 상태가 제대로 초기화되지 않는 것으로 보입니다.

## 🔍 문제 원인 분석

### 1. 중복된 다음 단계 이동 로직

`handleMultipleSelect` 함수를 보면:

```typescript
// handleMultipleSelect 함수 내부
setTimeout(() => {
  console.log('🚀 installationLocations 다음 단계 이동, 업데이트된 formData:', updatedFormData);
  // 업데이트된 formData를 직접 전달 (현재 단계 번호 사용)
  const nextStep = findNextValidStep(currentStep, updatedFormData);
  if (nextStep < FORM_STEPS.length) {
    const step = FORM_STEPS[nextStep];
    
    // 수량 선택 단계인 경우 특별 처리
    if (step.quantitySelection) {
      // ... quantitySelection 설정 로직
    }
    // ... 나머지 로직
  }
}, 500);
```

이 부분이 `goToNextStep()` 함수의 로직과 중복됩니다.

### 2. 상태 동기화 문제

`handleMultipleSelect`에서 직접 다음 단계 처리를 하면서 `goToNextStep()`의 표준 플로우를 우회하고 있습니다.

## 💡 해결 방안

### 방법 1: 중복 로직 제거 (권장)

```typescript
const handleMultipleSelect = (option: string, field: string) => {
  const currentStepObj = FORM_STEPS.find(step => step.field === field);
  if (!currentStepObj?.multiple) return;
  
  let newSelections = [...selectedMultiples];
  
  if (newSelections.includes(option)) {
    newSelections = newSelections.filter(item => item !== option);
  } else {
    newSelections.push(option);
  }
  
  setSelectedMultiples(newSelections);
  
  // 필수 선택 확인
  if (field === 'agreeTerms') {
    const hasRequired = newSelections.some(item => item.includes('필수'));
    if (hasRequired && newSelections.length >= 1) {
      console.log('🔄 agreeTerms formData 업데이트:', newSelections);
      setFormData(prev => ({ ...prev, [field]: newSelections }));
      addMessage('user', newSelections.join(', '));
      setSelectedMultiples([]);
      
      setTimeout(() => {
        console.log('🚀 agreeTerms 다음 단계 이동');
        goToNextStep(); // 중복 로직 제거, goToNextStep만 사용
      }, 500);
    }
  } else {
    // 설치 위치 선택의 경우
    if (newSelections.length >= 1) {
      console.log('🔄 installationLocations formData 업데이트:', newSelections);
      setFormData(prev => ({ ...prev, [field]: newSelections }));
      addMessage('user', newSelections.join(', '));
      setSelectedMultiples([]);
      
      setTimeout(() => {
        console.log('🚀 installationLocations 다음 단계 이동');
        goToNextStep(); // 중복 로직 제거, goToNextStep만 사용
      }, 500);
    }
  }
};
```

### 방법 2: 수량 선택 초기화 보장

`goToNextStep` 함수에서 수량 선택 단계 진입 시 locations 초기화를 보장:

```typescript
const goToNextStep = () => {
  const nextStep = findNextValidStep(currentStep, formData);
  if (nextStep < FORM_STEPS.length) {
    const step = FORM_STEPS[nextStep];
    
    // 수량 선택 단계인 경우 특별 처리
    if (step.quantitySelection) {
      console.log('🎯 수량 선택 단계 진입');
      const locations = formData.installationLocations || [];
      const filteredLocations = locations.filter(loc => loc !== '📱 기타위치');
      
      console.log('📍 필터링된 위치들:', filteredLocations);
      
      if (filteredLocations.length > 0) {
        // quantitySelection 상태 초기화 보장
        const newQuantitySelection = {
          currentLocationIndex: 0,
          selectedQuantities: {},
          locations: filteredLocations
        };
        
        console.log('🔧 quantitySelection 초기화:', newQuantitySelection);
        setQuantitySelection(newQuantitySelection);
        
        const firstLocation = filteredLocations[0];
        const question = `${firstLocation}에 몇 대의 CCTV를 설치하시겠어요?`;
        
        addMessage('system', question, step.options || [], step.field);
        setCurrentStep(nextStep);
        setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
        return;
      }
    }
    
    // 일반 단계 처리
    let options = step.options || [];
    if (step.dynamic && step.field) {
      options = generateDynamicOptions(step.field, formData);
    }
    
    addMessage('system', step.question, options, step.field);
    setCurrentStep(nextStep);
    setProgress(Math.min(100, Math.round((nextStep / FORM_STEPS.length) * 100)));
  } else {
    handleSubmit();
  }
};
```

### 방법 3: 디버깅 강화

`handleQuantitySelect` 함수에 더 많은 로그 추가:

```typescript
const handleQuantitySelect = (quantity: string) => {
  console.log('🔥 handleQuantitySelect 호출됨:', quantity);
  console.log('현재 quantitySelection 상태:', JSON.stringify(quantitySelection, null, 2));
  console.log('현재 formData.installationLocations:', formData.installationLocations);
  
  // locations가 비어있으면 formData에서 다시 가져오기
  let filteredLocations = quantitySelection.locations;
  if (!filteredLocations || filteredLocations.length === 0) {
    console.log('⚠️ quantitySelection.locations가 비어있음, formData에서 복구 시도');
    const locations = formData.installationLocations || [];
    filteredLocations = locations.filter(loc => loc !== '📱 기타위치');
    
    // quantitySelection 상태 복구
    setQuantitySelection(prev => ({
      ...prev,
      locations: filteredLocations
    }));
  }
  
  const currentLocation = filteredLocations[quantitySelection.currentLocationIndex];
  
  if (!currentLocation) {
    console.error('❌ currentLocation이 undefined입니다!');
    console.log('filteredLocations:', filteredLocations);
    console.log('currentLocationIndex:', quantitySelection.currentLocationIndex);
    return;
  }
  
  // ... 나머지 로직
};
```

## 🎯 즉시 적용 가능한 수정사항

**app/quote/cctv/page.tsx** 파일에서:

1. **line 363-425** 근처의 `handleMultipleSelect` 함수에서 중복된 다음 단계 이동 로직을 제거
2. `setTimeout` 내부에서 `goToNextStep()`만 호출하도록 수정
3. `handleQuantitySelect` 함수에 방어적 코드 추가 (locations가 비어있을 경우 복구)

이렇게 수정하면 다중 위치 선택 시 각 위치별로 순차적으로 수량을 선택할 수 있게 됩니다.