import React from 'react';
// import { db } from '../firebase.js';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import style from './style.module.css'
// import TrackItem from './trackItem'
import axios from 'axios';
// import appleLogo from './apple.png'
import queryString from 'query-string';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      let playlistData = localStorage.getItem('playlistData')
    // let s = JSON.stringify(a)
    // console.log("as2s", a)
    // let b = JSON.parse(a)
    // console.log("ababsb", b)
    // console.log(window.location.hash)
    let parsed = queryString.parse(window.location.hash)
    console.log(parsed.access_token)
    let tokenType = "Bearer "
    let accessToken = tokenType.concat(parsed.access_token)
    let headerData = {
        // content
        authorizationCode: accessToken,
        playlistData: playlistData
    }

    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/addPlaylistToLibrarySpotify', headerData)
    .then((response) => {
        console.log(response.data)
    })
  }


  render() {
    return (
       <div>
           Callback
       </div>
    );
  }

}

export default PlaylistPage;
