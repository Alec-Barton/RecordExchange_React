import React from 'react';
import MusicKitManager from '../managers/musickitManager.js'
import style from './css/style.module.css'
import PlaylistTrack from './components/playlistTrack'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'

class PlaylistPage extends React.Component {

  constructor(props) {
    super(props);

    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);

    if (props.location.state != undefined) {
      let playlistData = props.location.state.object
      let tracks = playlistData.tracks

      let listItems = tracks.map((track) =>
        <PlaylistTrack key={track.spotifyId} props={track}></PlaylistTrack>
      );

      this.state = {
        imageState: 'show',
        imageUrl: playlistData.coverImage,
        title: playlistData.name,
        subtitle: playlistData.description,
        listItems: listItems,
        playlistData: playlistData
      }

    } else {
      let splitPath = window.location.pathname.split('/')
      let serviceType = splitPath[1]
      let objectId = splitPath[2]

      this.state = {
        imageState: 'loading',
        imageUrl: 'https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif',
        title: 'Loading',
        subtitle: '',
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

          this.setState({
            title: playlistData.name,
            subtitle: playlistData.description,
            imageUrl: playlistData.coverImage,
            playlist: playlistData,
            playlistData: playlistData,
            imageState: 'show',
            listItems: listItems

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


          <div className={containerStyle}>
            <input type="image" onClick={this.spotifyBtnTapped} src={spotifyLogo} className={style.spotifyButton} />
            <input type="image" onClick={this.appleBtnTapped} src={appleLogo} className={style.appleButton} />
            <input type="image" src={shareLogo} className={style.shrButton} />
          </div>

          <ul className={style.myUl} > {this.state.listItems} </ul>
        </div>
      </div>

    );
  }
}

export default PlaylistPage;
