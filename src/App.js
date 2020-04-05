import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import homePage from './pages/homePage.js';
import HomePage from './pages/homePage.js';
import TrackPage from './pages/TrackPage.js';
import AlbumPage from './pages/AlbumPage.js';
import PlaylistPage from './pages/playlistPage.js';
import SpotifyCallback from './pages/spotifyCallback.js';

// import MusicProvider from './MusicProvider'

import style from './pages/style.module.css'
import history from './classes/history';



class App extends React.Component { 

  constructor(props) {
    super(props);
    console.log("but hole")
    console.log(props)

    // console.log(this.musicInstance)

    // let musicProvider = MusicProvider.sharedProvider();
    // musicProvider.configure();
    // let musicInstance = musicProvider.getMusicInstance();

    // this.state = {isLogin: false, genres:[], albums:[]};
    // this.musicInstance = this.props.musicInstance;
    // //this.signIn();
    // this.setupAlbumsProvider(this.musicInstance);
    // this.setupPlaylistsProvider(this.musicInstance);
  }

  render(){
    return (
    
      <div >
        <div className={style.headerTitle}>
          Record Exchange
        </div>
       
        <Router history = {history}>
          <Switch>
            <Route path="/" exact component = {HomePage}/>
            
            <Route path="/playlist" exact component = {PlaylistPage}/>
    
            <Route path="/playlist/:id" component = {PlaylistPage}/>
            <Route path="/track/:id" component = {TrackPage}/>
            <Route path="/album/:id" component = {AlbumPage}/>
    
            <Route path="/spotifyCallback" component = {SpotifyCallback}/>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

// function App() {

//   return (
    
//   <div >
//     <div className={style.headerTitle}>
//       Record Exchange
//     </div>
   
//     <Router history = {history}>
//       <Switch>
//         <Route path="/" exact component = {HomePage}/>
        
//         <Route path="/playlist" exact component = {PlaylistPage}/>

//         <Route path="/playlist/:id" component = {PlaylistPage}/>
//         <Route path="/track/:id" component = {TrackPage}/>
//         <Route path="/album/:id" component = {AlbumPage}/>

//         <Route path="/spotifyCallback" component = {SpotifyCallback}/>
//       </Switch>
//     </Router>
//   </div>
//   );
// }

export default App;
