import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from './pages/components/header.js'
import HomePage from './pages/homePage.js';
import TrackPage from './pages/TrackPage.js';
import AlbumPage from './pages/AlbumPage.js';
import PlaylistPage from './pages/playlistPage.js';
import SpotifyCallbackPage from './pages/spotifyCallbackPage.js';

import style from './pages/css/style.module.css'
import history from './managers/historyManager.js';

import SoundBarsContainer from './soundBarsContainer.js'

class App extends React.Component { 

  constructor(props) {
    super(props);
  }

  render(){
    return (
    
      <div >
        <Header/>
        <SoundBarsContainer/>
        <Router history = {history}>
          <Switch>
    
            <Route path="/playlist/:id" component = {PlaylistPage}/>
            <Route path="/track/:id" component = {TrackPage}/>
            <Route path="/album/:id" component = {AlbumPage}/>
    
            <Route path="/spotifyCallback" component = {SpotifyCallbackPage}/>
            <Route path="/" component = {HomePage}/>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
