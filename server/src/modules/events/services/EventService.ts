import { EventProvider } from '..';

export const getEvents = async () => {
  try {
    const events = await EventProvider.findMany({
      orderBy: {
        odds: 'asc',
      },
    });

    return events;
  } catch (err) {
    console.error('An error occurred while tring to get events:', err.message);
    throw new Error(err);
  }
};
