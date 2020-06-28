import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import loadingGif from './assets/loading.gif'
import history from '../managers/historyManager.js'
import style from './css/style.module.css'
import Header from './components/header.js'


class SpotifyCallbackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: 'null'
    }
  }

  componentDidMount() {
    let playlistData = localStorage.getItem('playlistData')
    let parsed = queryString.parse(window.location.hash)
    let playlistObj = JSON.parse(playlistData)
    let tokenType = "Bearer "
    let accessToken = tokenType.concat(parsed.access_token)
    let headerData = {
      authorizationCode: accessToken,
      playlistData: playlistData,
      'Content-Type': 'application/json',
    }
    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/addPlaylistToSpotify', headerData)
      .then((response) => {
        if (response.status == 200){
          this.setState({
            complete: 'success'
          })
        } else {
          this.setState({
            complete: 'failure'
          })
        }
       
      })
      .catch(error => {
        console.log(error)
        this.setState({
          complete: 'failure'
        })
      })
      .then(()=>{
        setTimeout(() => {
          history.push({
            pathname: '/playlist/'.concat(playlistObj.id),
            state: {
              object: playlistObj
            }
          })
          window.location.reload(false)
        }, 500);
      })
  }

  render() {
    var text = 'adding playlist to your Spotify library...'
    var loadingVisibility = 'visible'
    if (this.state.complete == 'success'){
      text = 'Added to Library'
      loadingVisibility = 'hidden'
    } else if (this.state.complete == 'success') {
      text = 'Error - Could not add to Library'
      loadingVisibility = 'hidden'
    }
    return (
      <span>
        <Header color={'#707070'} logoColor={'#707070'} />

        <div className={style.main}>
          <img src={loadingGif} className={style.img} style = {{visibility:loadingVisibility}}/>
          <h1 className={style.subtitle}>{text}</h1>
        </div>
      </span>
    );
  }

}

export default SpotifyCallbackPage;
