import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import App from './App';
import { defaultTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  body{
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
    line-height: 1.2;
  }

  a{
    color: #FFF;
    text-decoration: none;
  }
`;

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('root is undefined');
const root = ReactDOM.createRoot(rootEl);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={defaultTheme}>      
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);