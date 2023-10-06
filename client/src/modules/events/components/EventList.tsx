import { IEvent } from '../../common/interfaces';

interface IProps {
  events: IEvent[];
  handleSelectEvent: (event: IEvent) => void;
}

export default function EventList({ events, handleSelectEvent }: IProps) {
  return (
    <div className="grid grid-cols-1 gap-6 py-10 cursor-pointer">
      {events.map((event) => (
        <div
          key={`${event.name}_${event.id}`}
          className="card w-96 bg-base-100 shadow-xl"
        >
          <div
            className="card-body items-center"
            onClick={() => handleSelectEvent(event)}
          >
            <h2 className="card-title">{event.name}</h2>
            <div className="mt-2 flex flex-row p-5  text-lime-500 font-semibold gap-10">
              <p>ID: {event.id}</p>
              <p>Odds: {event.odds}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
