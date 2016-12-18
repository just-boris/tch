import 'babel-polyfill';
import {h, render} from 'preact';
import Router from 'preact-router';
import {createHashHistory} from 'history';
import IndexPage from './pages/index';
import StreamPage from './pages/stream';

render(
    <Router history={createHashHistory()}>
        <IndexPage path="/" />
        <StreamPage path="/:channel" />
    </Router>,
    document.getElementById('root')
);
