import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { IEvent } from '../../common/interfaces';
import { EVENTS_URLS } from '../../../config/urls';
import { BettingModal, EventList } from '../components';

export default function EventListContainer() {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const { isLoading, error, data } = useQuery<IEvent[]>('events', async () => {
    const res = await fetch(EVENTS_URLS.LIST);
    const parsed = await res.json();
    return parsed.result;
  });

  if (isLoading || !data)
    return <span className="loading loading-spinner text-primary"></span>;

  if (error)
    return (
      <p className="text-3xl text-red-600">
        {(error as Error)?.message || 'Something went wrong with fetching!'}
      </p>
    );

  const handleSelectEvent = (event: IEvent) => setSelectedEvent(event);
  const handleCloseModal = () => setSelectedEvent(null);
  const handleBet = () => {
    toast.success('Betting was successfull!! 🚀');
    handleCloseModal();
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-4xl font-bold mb-4 text-center  text-slate-600">
        Events
      </h1>
      <EventList handleSelectEvent={handleSelectEvent} events={data} />
      <BettingModal
        handleBet={handleBet}
        handleCloseModal={handleCloseModal}
        event={selectedEvent}
      />
    </div>
  );
}
