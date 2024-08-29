import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

const noBtnMessages = [
  'No',
  'Are you sure?',
  'Really sure?',
  'Are you positive???',
  'Pookie please',
  'Just think about it',
  "If you say no, I'll be very sad",
  "I'll be very very sad",
  "Just kidding, PLEASE SAY YES",
  "You're breaking my heart ;("
];

export interface WannaGoStepProps {
  onSubmit: () => void;
}

// no button will increase yes button
export const WannaGoStep: React.FC<WannaGoStepProps> = ({ onSubmit }) => {
  const [yesBtnSize, setYesBtnSize] = useState(16);
  const [noBtnMessageIndex, setNoBtnMessageIndex] = useState(0);

  const isNoBtnTurned = noBtnMessageIndex >= noBtnMessages.length;

  const handleClickNo = useCallback(() => {
    if (isNoBtnTurned) {
      return onSubmit();
    }

    setYesBtnSize(prevSize => prevSize + 16);
    setNoBtnMessageIndex(prevIndex => prevIndex + 1);
  }, [isNoBtnTurned, onSubmit]);

  return (
    <div className="container">
      <Image
        alt="do you wanna go?"
        width={300}
        height={300}
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMWF4OG8yc3p6Ymdvd3g2d245amdveDhyYmx6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif"
      />

      <h2 className="question">Will you be my Valentine?</h2>

      <div className="button-container">
        <button
          className="button button--yes"
          style={{ fontSize: `${yesBtnSize}px` }}
          onClick={onSubmit}
        >
          Yes
        </button>

        <button
          className={classNames('button', !isNoBtnTurned ? 'button--no' : 'button--yes')}
          onClick={handleClickNo}
        >
          {!isNoBtnTurned ? noBtnMessages[noBtnMessageIndex] : 'Yes'}
        </button>
      </div>
    </div>
  );
};
