import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import loadingGif from './assets/loading.gif'
import history from '../managers/historyManager.js'
import style from './css/style.module.css'

class SpotifyCallbackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let playlistData = localStorage.getItem('playlistData')
    let parsed = queryString.parse(window.location.hash)
    let playlistObj = JSON.parse(playlistData)
    console.log(playlistObj.id)
    let tokenType = "Bearer "
    let accessToken = tokenType.concat(parsed.access_token)
    let headerData = {
      authorizationCode: accessToken,
      playlistData: playlistData,
      'Content-Type': 'application/json',
    }
    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/addPlaylistToSpotify', headerData)
      .then((response) => {
      })
      .catch(error => {
        console.log(error)
      })
      .then(()=>{
        history.push({
          pathname: '/playlist/'.concat(playlistObj.id)
        })
        window.location.reload(false)
      })
  }

  render() {
    return (
      <div>
        <div className={style.main}>
          <img src={loadingGif} className={style.img} />
          <h1 className={style.subtitle}>adding playlist to your Spotify library...</h1>
        </div>
      </div>
    );
  }

}

export default SpotifyCallbackPage;
