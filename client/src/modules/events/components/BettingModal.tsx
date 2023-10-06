import { ChangeEvent, useState } from 'react';
import { IEvent } from '../../common/interfaces';

interface IProps {
  event: IEvent | null;
  handleBet: () => void;
  handleCloseModal: () => void;
}

export default function BettingModal({
  event,
  handleBet,
  handleCloseModal,
}: IProps) {
  const [bet, setBet] = useState('');

  const handleBetBtnClick = () => {
    handleBet();
    setBet('');
  };
  const handleCloseBtnClick = () => {
    handleCloseModal();
    setBet('');
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setBet(event.target.value);

  return (
    <dialog className="modal" open={!!event}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">{event?.name}</h3>
        <p className="py-4 text-center">Make a Bet</p>
        <div className="modal-action">
          <form method="dialog" className="flex flex-col w-full items-center">
            <input
              type="text"
              value={bet}
              placeholder="Bet"
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-xs"
            />

            <div className="flex flex-row justify-between w-full  max-w-xs m-2 pt-4">
              <button
                onClick={handleBetBtnClick}
                className="btn hover:bg-lime-600 bg-lime-500 text-gray-700"
              >
                Bet
              </button>
              <button
                onClick={handleCloseBtnClick}
                className="btn hover:bg-red-700 bg-red-500 text-gray-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
