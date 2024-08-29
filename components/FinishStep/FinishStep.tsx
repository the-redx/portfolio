import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const FinishStep: React.FC = () => {
  const { push } = useRouter();

  const handleClickTravel = () => {
    push('/valentine/travel');
  };

  return (
    <div className="container">
      <div>
        <Image
          alt="we are finished"
          width={300}
          height={300}
          src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
        />
      </div>

      <h2 className="question">Yeeeyyyy!! We are finished</h2>

      <div className="button-container">
        <button className="button button--blue" onClick={handleClickTravel}>
          My travel
        </button>
      </div>
    </div>
  );
};
