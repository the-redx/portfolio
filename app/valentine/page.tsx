"use client";
import { FinishStep } from '@/components/FinishStep';
import { FlowersStep } from '@/components/FlowersStep';
import { PlaceStep } from '@/components/PlaceStep';
import { WannaGoStep } from '@/components/WannaGoStep';
import { Suspense, useCallback, useMemo, useState } from 'react';

export default function ValentinePageContainer() {
  const [step, setStep] = useState(1);

  const handleChangeStep = useCallback(() => {
    setStep(prevStep => prevStep + 1);
  }, []);

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <WannaGoStep onSubmit={handleChangeStep} />;

      case 2:
        return <FlowersStep onSubmit={handleChangeStep} />;

      case 3:
        return <PlaceStep onSubmit={handleChangeStep} />;

      default:
        return <FinishStep />;
    }
  }, [step, handleChangeStep]);

  return <Suspense>{renderStep}</Suspense>;
}
