import React from 'react';
import style from './css/style.module.css'
import AlbumTrack from './components/AlbumTrack.js'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'
import SharePopup from './components/sharePopup'
import loadingGif from './assets/loading.gif'
import history from '../managers/historyManager.js'

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    let splitPath = window.location.pathname.split('/')
    let serviceType = splitPath[1]
    let objectId = splitPath[2]

    if (props.location.state != undefined) {
      let albumData = props.location.state.object
      let tracks = albumData.tracks
      var listItems = tracks.map((track, index) => {
        track["index"] = index
        track["stop"] = "true"
        return (<AlbumTrack key={index} props={track} action={this.changeAudio}></AlbumTrack>)
      });

      this.state = {
        imageState: 'show',
        imageUrl: albumData.coverImage,
        title: albumData.name,
        subtitle: albumData.artist,
        listItems: listItems,
        spotifyId: albumData.spotifyId,
        appleId: albumData.appleId,
        albumId: objectId,
        popupDisplay: 'none',
        audio: new Audio(''),
        tracks: tracks
      }



    } else {

      this.state = {
        imageState: 'loading',
        imageUrl: loadingGif,
        title: 'Loading',
        subtitle: '',
        albumId: objectId,
        popupDisplay: 'none',
      }

      let headerData = {
        id: objectId
      }

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchAlbum', headerData)
        .then((response) => {
          let albumData = response.data
          let tracks = albumData.tracks
          let listItems = tracks.map((track, index) => {
            track["index"] = index
            track["stop"] = "true"
            return (<AlbumTrack key={index} props={track} action={this.changeAudio}></AlbumTrack>)
          });

          this.setState({
            title: albumData.name,
            subtitle: albumData.artist,
            imageUrl: albumData.coverImage,
            album: albumData,
            imageState: 'show',
            listItems: listItems,
            audio: new Audio(''),
            tracks: tracks
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
            title: 'Album not Found',
            subtitle: '',
            imageState: 'hidden',
          })
        })
    }
    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);
    this.popupClose = this.popupClose.bind(this)

    this.playbackEnded = this.playbackEnded.bind(this);
    this.state.audio.onended = this.playbackEnded

    this.componentWillUnmount = this.componentWillUnmount.bind(this)
  }

  componentWillUnmount(){
    this.state.audio.pause()
  }

  playbackEnded(){
    let tracks = this.state.tracks
    var listItems = tracks.map((track, index) => {
      track["index"] = index
      track["stop"] = true
      return (<AlbumTrack key={index} props={track} action={this.changeAudio}></AlbumTrack>)
    });

    this.setState({
      listItems: listItems
    })
  }

  spotifyBtnTapped() {
    const url = 'https://open.spotify.com/album/'.concat(this.state.spotifyId)
    window.open(url, '_blank');
  }

  appleBtnTapped() {
    const url = 'https://music.apple.com/us/album/'.concat(this.state.appleId)
    window.open(url, '_blank');
  }

  shareBtnTapped() {
    this.stopAllPlayback()
  }

  popupClose() {
    this.setState({
      popupDisplay: 'none'
    })
  }

  changeAudio = (playbackState, audioSource) => {
    if (playbackState == "play") {
      if (audioSource == this.state.audio){
        this.state.audio.play()
      } else {
        let tracks = this.state.tracks
        var listItems = tracks.map((track, index) => {
          track["index"] = index
          if (track["preview"] != audioSource){
            track["stop"] = true
          } else {
            track["stop"] = false
          }
          return (<AlbumTrack key={index} props={track} action={this.changeAudio}></AlbumTrack>)
        });
        this.setState({
          listItems: listItems,
        }, ()=>{
          this.state.audio.src = audioSource
          setTimeout(()=>{ 
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
          return (<AlbumTrack key={index} props={track} action={this.changeAudio}></AlbumTrack>)
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
      <div className={style.main}>
        <img src={this.state.imageUrl} className={imageStyle} />
        <h1 className={style.title}>{this.state.title}</h1>
        <h2 className={style.subtitle}>{this.state.subtitle}</h2>
        <SharePopup url={"www.recordexchange.app/album/".concat(this.state.albumId)} display={this.state.popupDisplay} closeFunction={this.popupClose} />
        <div className={containerStyle}>
          <input type="image" src={spotifyLogo} className={style.spotifyButton} onClick={this.spotifyBtnTapped} />
          <input type="image" src={appleLogo} className={style.appleButton} onClick={this.appleBtnTapped} />
          <input type="image" src={shareLogo} className={style.shrButton} onClick={this.shareBtnTapped} />
        </div>

        <ul className={style.myUl} > {this.state.listItems} </ul>
      </div>
    );
  }
}

export default AlbumPage;
