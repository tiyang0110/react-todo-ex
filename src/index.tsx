import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('root is undefined');
const root = ReactDOM.createRoot(rootEl);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>
);