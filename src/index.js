import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import MusicProvider from './MusicProvider'


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// let musicProvider = MusicProvider.sharedProvider();
// musicProvider.configure();
// let musicInstance = musicProvider.getMusicInstance();

// ReactDOM.render(<App musicInstance={musicInstance}/>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
