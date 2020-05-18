import React from 'react';
import MusicKitManager from '../managers/musickitManager.js'
import style from './css/style.module.css'
import PlaylistTrack from './components/playlistTrack'
import SharePopup from './components/sharePopup'
import Popup from './components/popup'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'
import loadingGif from './assets/loading.gif'
import history from '../managers/historyManager.js'
import SoundBarsContainer from './components/soundBarsContainer.js'
import hexBrightnessPercentage from '../managers/colorManager.js'
import Header from './components/header.js'

class PlaylistPage extends React.Component {

  constructor(props) {
    super(props);

    let splitPath = window.location.pathname.split('/')
    let serviceType = splitPath[1]
    let objectId = splitPath[2]


    if (props.location.state != undefined) {
      let playlistData = props.location.state.object
      let shadow = hexBrightnessPercentage(playlistData.color, 0.25)
      let header = hexBrightnessPercentage(playlistData.color, -0.15)
      let tracks = playlistData.tracks

      let listItems = tracks.map((track) => {
        track["stop"] = "true"
        if (track["name"].length > 50){
          track["name"] =  track["name"].slice(0, 50).concat('...')
        }
        return (<PlaylistTrack key={track.spotifyId} props={track} action={this.changeAudio}></PlaylistTrack>)
      });
      this.state = {
        imageState: 'show',
        imageUrl: playlistData.coverImage,
        title: playlistData.name,
        subtitle: playlistData.description,
        listItems: listItems,
        playlistData: playlistData,
        popupDisplay: 'none',
        spotifyPopupDisplay: 'none',
        applePopupDisplay: 'none',
        playlistId: objectId,
        audio: new Audio(),
        tracks: tracks,
        color: playlistData.color,
        headerColor: header,
        shadowColor: shadow,
        barVisibility: 'shown'
      }
      this.state.audio.onended = this.playbackEnded.bind(this)

    } else {
      this.state = {
        imageState: 'loading',
        imageUrl: loadingGif,
        title: 'Loading',
        subtitle: '',
        popupDisplay: 'none',
        spotifyPopupDisplay: 'none',
        applePopupDisplay: 'none',
        playlistId: objectId,
        audio: new Audio(),
        color: 'white',
        headerColor: '#707070',
        barVisibility: 'hidden',
      }
      this.state.audio.onended = this.playbackEnded.bind(this)

      let headerData = {
        id: objectId

      }

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchPlaylist', headerData)
        .then((response) => {

          let playlistData = response.data
          let tracks = playlistData.tracks
          let shadow = hexBrightnessPercentage(playlistData.color, 0.25)
          let header = hexBrightnessPercentage(playlistData.color, -0.15)

          let listItems = tracks.map((track) => {
            track["stop"] = "true"
            if (track["name"].length > 50){
              track["name"] =  track["name"].slice(0, 50).concat('...')
            }
            
            return (<PlaylistTrack key={track.spotifyId} props={track} action={this.changeAudio}></PlaylistTrack>)
          });
          this.setState({
            title: playlistData.name,
            subtitle: playlistData.description,
            imageUrl: playlistData.coverImage,
            playlist: playlistData,
            playlistData: playlistData,
            imageState: 'show',
            listItems: listItems,
            popupDisplay: 'none',
            spotifyPopupDisplay: 'none',
            applePopupDisplay: 'none',
            playlistId: objectId,
            tracks: tracks,
            color: playlistData.color,
            headerColor: header,
            shadowColor: shadow,
            barVisibility: 'visible',

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
          if (this.state.barVisibility == 'visible') {
            this.setState({
              barVisibility: "hide"
            })
          } else {
            this.setState({
              barVisibility: "hidden"
            })
          }
        })
    }
    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);
    this.popupClose = this.popupClose.bind(this)
    this.spotifyPopupClose = this.spotifyPopupClose.bind(this)
    this.applePopupClose = this.applePopupClose.bind(this)

    this.playbackEnded = this.playbackEnded.bind(this);

    this.componentWillUnmount = this.componentWillUnmount.bind(this)

    this.spotifyPlaylistFunction = this.spotifyPlaylistFunction.bind(this)
    this.applePlaylistFunction = this.applePlaylistFunction.bind(this)
  }

  componentWillUnmount() {
    this.state.audio.pause()
  }

  playbackEnded() {
    let tracks = this.state.tracks
    var listItems = tracks.map((track, index) => {
      track["index"] = index
      track["stop"] = true
      if (track["name"].length > 50){
        track["name"] =  track["name"].slice(0, 50).concat('...')
      }
      return (<PlaylistTrack key={index} props={track} action={this.changeAudio}></PlaylistTrack>)
    });

    this.setState({
      listItems: listItems
    })
  }


  spotifyBtnTapped() {
    this.setState({
      spotifyPopupDisplay: 'block'
    })
  }

  appleBtnTapped() {
    this.setState({
      applePopupDisplay: 'block'
    })
  }

  applePlaylistFunction(){
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
            if (response.status == 200){
              this.setState({
                applePopupState: "success"
              })
            } else {
              this.setState({
                applePopupState: "error"
              })
            }
            setTimeout(() => {
              this.applePopupClose()
              this.setState({
                applePopupState: "none"
              })
            }, 2000);
          })
          .catch((error) => {
            console.log(error)
            this.setState({
              applePopupState: "error"
            })
          })
      });
  }

  spotifyPlaylistFunction (){
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

  shareBtnTapped() {
    this.setState({
      popupDisplay: 'block'
    })
  }

  popupClose() {
    this.setState({
      popupDisplay: 'none'
    })
  }

  spotifyPopupClose() {
    this.setState({
      spotifyPopupDisplay: 'none'
    })
  }

  applePopupClose() {

    this.setState({
      applePopupDisplay: 'none',
      appleReset: true
    })
    setTimeout(() => {
      this.setState({
        appleReset: false
      })
    }, 50);
  }

  changeAudio = (playbackState, audioSource) => {
    console.log(playbackState, audioSource, this.state.audio)

    if (playbackState == "play") {
      if (audioSource == this.state.audio) {
        this.state.audio.play()
      } else {
        let tracks = this.state.tracks
        var listItems = tracks.map((track, index) => {
          track["index"] = index
          if (track["preview"] != audioSource) {
            track["stop"] = true
          } else {
            track["stop"] = false
          }
          if (track["name"].length > 50){
            track["name"] =  track["name"].slice(0, 50).concat('...')
          }
          return (<PlaylistTrack key={index} props={track} action={this.changeAudio}></PlaylistTrack>)
        });
        this.setState({
          listItems: listItems,
        }, () => {
          this.state.audio.src = audioSource
          setTimeout(() => {
            this.state.audio.play()
          }, 50);
        })
      }

    } else if (playbackState == "pause") {
      this.state.audio.pause()
      let tracks = this.state.tracks
      var listItems = tracks.map((track, index) => {
        track["index"] = index
        track["stop"] = true
        if (track["name"].length > 50){
          track["name"] =  track["name"].slice(0, 50).concat('...')
        }
        return (<PlaylistTrack key={index} props={track} action={this.changeAudio}></PlaylistTrack>)
      });

      this.setState({
        listItems: listItems
      })
    }
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
      <span>
        <Header color={this.state.headerColor} logoColor={this.state.headerColor} />
        <SoundBarsContainer props={{ "color": this.state.color, "shadowColor": this.state.shadowColor, "visibility": this.state.barVisibility }} />

        <div>
          <div className={style.main}>
            <span className={style.mainBackground} />

            <img src={this.state.imageUrl} className={imageStyle} />
            <h1 className={style.title}>{this.state.title}</h1>
            <h2 className={style.subtitle}>{this.state.subtitle}</h2>
            <Popup display={this.state.applePopupDisplay} closeFunction={this.applePopupClose} actionFunction ={this.applePlaylistFunction} serviceType={'Apple'}  popupState ={this.state.applePopupState} reset = {this.state.appleReset}/>
            <Popup display={this.state.spotifyPopupDisplay} closeFunction={this.spotifyPopupClose} actionFunction ={this.spotifyPlaylistFunction} serviceType={'Spotify'} popupState ={this.state.spotifyPopupState} />
            <SharePopup url={"www.recordexchange.app/playlist/".concat(this.state.playlistId)} display={this.state.popupDisplay} closeFunction={this.popupClose} />
            <div className={containerStyle}>
              <input type="image" onClick={this.spotifyBtnTapped} src={spotifyLogo} className={style.spotifyButton} />
              <input type="image" onClick={this.appleBtnTapped} src={appleLogo} className={style.appleButton} />
              <input type="image" onClick={this.shareBtnTapped} src={shareLogo} className={style.shrButton} />
            </div>
            <ul className={style.myUl}> {this.state.listItems} </ul>
          </div>
        </div>

      </span>

    );
  }
}

export default PlaylistPage;
