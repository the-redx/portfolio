import { useCallback, useState } from 'react';

import { WannaGoStep } from '../WannaGoStep';
import { FlowersStep } from '../FlowersStep';
import { PlaceStep } from '../PlaceStep';
import { FinishStep } from '../FinishStep';

export const Stepper: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleChangeStep = useCallback(() => {
    setStep(prevStep => prevStep + 1);
  }, []);

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
};
