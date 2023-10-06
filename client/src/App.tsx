import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { EventListContainer } from './modules/events';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <EventListContainer />
    </QueryClientProvider>
  );
}
