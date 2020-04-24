import React from 'react';
import MusicKitManager from '../managers/musickitManager.js'
import style from './css/style.module.css'
import PlaylistTrack from './components/playlistTrack'
import SharePopup from './components/sharePopup'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'
import loadingGif from './assets/loading.gif'
import history from '../managers/historyManager.js'

class PlaylistPage extends React.Component {

  constructor(props) {
    super(props);

    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);
    this.popupClose = this.popupClose.bind(this)

    let splitPath = window.location.pathname.split('/')
    let serviceType = splitPath[1]
    let objectId = splitPath[2]

    console.log(objectId)
    if (props.location.state != undefined) {
      let playlistData = props.location.state.object
      let tracks = playlistData.tracks

      let listItems = tracks.map((track) =>
        <PlaylistTrack key={track.spotifyId} props={track}></PlaylistTrack>
      );
      console.log('playlistData')
      this.state = {
        imageState: 'show',
        imageUrl: playlistData.coverImage,
        title: playlistData.name,
        subtitle: playlistData.description,
        listItems: listItems,
        playlistData: playlistData,
        popupDisplay: 'none',
        playlistId: objectId
      }

    } else {
      this.state = {
        imageState: 'loading',
        imageUrl: loadingGif,
        title: 'Loading',
        subtitle: '',
        popupDisplay: 'none',
        playlistId: objectId
      }

      let headerData = {
        id: objectId
        
      }

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchPlaylist', headerData)
        .then((response) => {

          let playlistData = response.data
          let tracks = playlistData.tracks

          let listItems = tracks.map((track) =>
            <PlaylistTrack key={track.spotifyId} props={track}></PlaylistTrack>
          );

          console.log(objectId)
          this.setState({
            title: playlistData.name,
            subtitle: playlistData.description,
            imageUrl: playlistData.coverImage,
            playlist: playlistData,
            playlistData: playlistData,
            imageState: 'show',
            listItems: listItems,
            popupDisplay: 'none',
            playlistId: objectId

          })
          history.push({
            state: {
              object: response.data
            }
          })
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            title: 'Playlist Not Found',
            subtitle: '',
            imageState: 'hidden',
          })
        })
    }
  }

  spotifyBtnTapped() {
    const stateKey = 'playlistData';
    const state = JSON.stringify(this.state.playlistData);
    console.log(state)
    localStorage.setItem(stateKey, state);
    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/getSpotifyAuthUrl')
      .then((response) => {
        window.location = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  appleBtnTapped() {
    let musicProvider = MusicKitManager.provider();
    musicProvider.configure();
    let musicInstance = musicProvider.getMusicInstance();
    musicInstance.authorize()
      .then(musicUserToken => {
        let headerData = {
          userToken: musicUserToken,
          playlistData: this.state.playlistData
        }
        axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/addPlaylistToApple', headerData)
          .then((response) => {
          })
          .catch((error) => {
            console.log(error)
          })
      });
  }

  shareBtnTapped(){
    this.setState({
      popupDisplay: 'block'
    })
  }

  popupClose(){
    this.setState({
      popupDisplay: 'none'
    })
  }

  render() {
    var imageStyle = style.imgHidden
    var containerStyle = style.btnContainerHidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
    } else if (this.state.imageState == 'show') {
      imageStyle = style.visible
      containerStyle = style.btnContainer
    }
    return (
      <div>
        <div className={style.main}>
          <img src={this.state.imageUrl} className={imageStyle} />
          <h1 className={style.title}>{this.state.title}</h1>
          <h2 className={style.subtitle}>{this.state.subtitle}</h2>
            <SharePopup url ={"www.recordexchange.app/playlist/".concat(this.state.playlistId)} display = {this.state.popupDisplay} closeFunction = {this.popupClose}/>
          <div className={containerStyle}>
            <input type="image" onClick={this.spotifyBtnTapped} src={spotifyLogo} className={style.spotifyButton} />
            <input type="image" onClick={this.appleBtnTapped} src={appleLogo} className={style.appleButton} />
            <input type="image" onClick={this.shareBtnTapped} src={shareLogo} className={style.shrButton}/>    
          </div>
          <ul className={style.myUl}> {this.state.listItems} </ul>
        </div>
      </div>
    );
  }
}

export default PlaylistPage;
