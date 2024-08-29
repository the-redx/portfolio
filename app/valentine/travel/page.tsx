"use client";
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import Image from 'next/image';

const PROGRESS_STEPS = 3;

export default function TravelPage() {
  const [travelProgress, setTravelProgress] = useLocalStorage('travel-progress', 0);
  const [resetProgressClicks, setResetProgressClicks] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleClickNext = useCallback(() => {
    if (travelProgress === PROGRESS_STEPS) {
      return;
    }

    if (travelProgress + 1 === PROGRESS_STEPS) {
      let count = 0;

      const timer = setInterval(() => {
        count++;

        if (count === 10) {
          clearInterval(timer);
        }
      }, 150);
    }

    setTravelProgress(travelProgress + 1);
  }, [travelProgress, setTravelProgress]);

  const handleResetProgress = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (resetProgressClicks >= 4) {
      setTravelProgress(0);
      setResetProgressClicks(0);
    } else {
      setResetProgressClicks(resetProgressClicks + 1);

      timer.current = setTimeout(() => {
        setResetProgressClicks(0);
      }, 3000);
    }
  }, [resetProgressClicks, timer, setResetProgressClicks, setTravelProgress]);

  return (
    <div className="container">
      <div onClick={handleResetProgress}>
        <Image alt="our travel" className="image" width="300" height="300" src="/images/travel.gif" />
      </div>

      <h2 className="question">My travel progress</h2>

      <div className="progress-container">
        <div className="progress">
          <div
            className="progress-bar"
            style={{ height: `${(100 / PROGRESS_STEPS) * travelProgress}%` }}
          />
        </div>

        <div className="progress-steps-container">
          <div
            className={classNames('progress-step progress-step--step-1 is-active')}
            onClick={handleClickNext}
          >
            <div className="progress-step-title">Start the discovery</div>
          </div>

          <div
            className={classNames(
              'progress-step progress-step--step-2',
              travelProgress >= 1 && 'is-active',
            )}
            onClick={handleClickNext}
          >
            <Image alt="flowers" src="/images/peonia.png" height="150" width="150" />
          </div>

          <div
            className={classNames(
              'progress-step progress-step--step-3',
              travelProgress >= 2 && 'is-active',
            )}
            onClick={handleClickNext}
          >
            <Image alt="dyson" src="/images/dyson.jpg" height="150" width="150" />
          </div>
        </div>
      </div>
    </div>
  );
}
