import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

export interface FlowersStepProps {
  onSubmit: () => void;
}

// no button will jump around the screen
export const FlowersStep: React.FC<FlowersStepProps> = ({ onSubmit }) => {
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const [noBtnPosition, setNoBtnPosition] = useState({});
  const [noBtnClickCount, setNoBtnClickCount] = useState(0);

  const [params, setParams] = useState({ MIN_Y: 0, MAX_Y: 0, MIN_X: 0, MAX_X: 0 });

  const isNoBtnTurned = noBtnClickCount >= 20;

  useEffect(() => {
    const rect = noBtnRef.current?.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    if (rect && bodyRect) {
      const MIN_Y = rect.y;
      const MAX_Y = bodyRect.height - rect.y - 50;

      const MIN_X = rect.x;
      const MAX_X = bodyRect.width - rect.x - 50;

      setParams({ MIN_Y, MAX_Y, MIN_X, MAX_X });
    }
  }, [noBtnRef]);

  const handleHoverNo = useCallback(() => {
    const top = Math.random() * (Math.random() > 0.5 ? params.MAX_Y : -params.MIN_Y);
    const left = Math.random() * (Math.random() > 0.5 ? params.MAX_X : -params.MIN_X);

    setNoBtnClickCount(prevCount => prevCount + 1);
    setNoBtnPosition({ transform: `translate(${left}px, ${top}px)` });
  }, [params]);

  return (
    <div className="container">
      <Image
        alt="did you recieve flowers?"
        width={300}
        height={300}
        src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
      />

      <h2 className="question">Did you like the flowers?</h2>

      <div className="button-container">
        <button className="button button--yes" onClick={onSubmit}>
          Yes, very much
        </button>

        <button
          ref={noBtnRef}
          style={noBtnPosition}
          onClick={handleHoverNo} // for mobile view
          onMouseEnter={handleHoverNo}
          className={classNames('button button--no', isNoBtnTurned && 'button--arrow-effect')}
        >
          No
        </button>
      </div>
    </div>
  );
};
