import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme } from './theme';

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('root is undefined');
const root = ReactDOM.createRoot(rootEl);


root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>      
      <App />
    </ThemeProvider>
  </RecoilRoot>
);