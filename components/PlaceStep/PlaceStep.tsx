import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

export interface PlaceStepProps {
  onSubmit: () => void;
}

// no button will dissapear
export const PlaceStep: React.FC<PlaceStepProps> = ({ onSubmit }) => {
  const [isNoBtnClicked, setIsNoBtnClicked] = useState(false);

  const handleClickNo = useCallback(() => {
    setIsNoBtnClicked(true);
  }, []);

  return (
    <div className="container">
      <Image
        alt="did you recieve flowers?"
        width={300}
        height={300}
        src="https://gifdb.com/images/high/abrazos-mocha-hugging-peach-tightly-bweopmh3f1zfiqhb.gif"
      />
      <h2 className="question">
        I will wait for you{' '}
        <a target="_blank" href="https://maps.app.goo.gl/6EpDD9ChKHLqBLqp9">
          here
        </a>{' '}
        at 18:00
      </h2>

      <div className="question-list">
        <span className="question-title">You need to take with you:</span>
        <ul>
          <li>
            Warm clothes
            <div className="question-list-popup">
              <Image
                alt="very cooold"
                width={150}
                height={150}
                src="https://media1.tenor.com/m/a8AgDZ4K0Q4AAAAC/cold-cute.gif"
              />
            </div>
          </li>
          <li>
            Good mood{' '}
            <div className="question-list-popup">
              <Image
                alt="good mood"
                width={150}
                height={150}
                src="https://gifdb.com/images/high/kawaii-bear-in-raincoat-i0kbmhmdyjzo4xhh.gif"
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="button-container">
        <button className="button button--yes" onClick={onSubmit}>
          I will be there
        </button>

        <button
          onClick={handleClickNo}
          className={classNames('button button--no', isNoBtnClicked && 'button--disappear-effect')}
        >
          I will not come
        </button>
      </div>
    </div>
  );
};
