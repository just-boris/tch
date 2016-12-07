import 'babel-polyfill';
import { h, render } from 'preact';
import IndexPage from './pages/index';

render(
  <IndexPage />,
  document.getElementById('root')
);
