import React from 'react';
import style from './css/style.module.css'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'
import playIcon from './assets/play.png'
import pauseIcon from './assets/pause.png'
import playingIcon from './assets/playing.png'
import loadingGif from './assets/loading.gif'
import SharePopup from './components/sharePopup'
import history from '../managers/historyManager.js'

import SoundBarsContainer from '../soundBarsContainer.js'
import hexBrightnessPercentage from '../managers/colorManager.js'


class TrackPage extends React.Component {
  constructor(props) {
    super(props);

    let splitPath = window.location.pathname.split('/')
    let serviceType = splitPath[1]
    let objectId = splitPath[2]


    if (props.location.state != undefined) {
      let trackData = props.location.state.object
      console.log(trackData)

      let shadow = hexBrightnessPercentage(trackData.color, 0.25)

      this.state = {
        imageState: 'show',
        imageUrl: trackData.coverImage,
        title: trackData.name,
        subtitle: trackData.artist.concat('  ●  ', trackData.album),
        playbackVisibility: "hidden",
        playbackIcon: playIcon,
        audio: new Audio(trackData.preview),
        spotifyId: trackData.spotifyId,
        appleLink: trackData.appleLink,
        trackId: objectId,
        popupDisplay: 'none',
        color: trackData.color, 
        shadowColor: shadow,
        barVisibility: 'shown'
      }

    } else {

      this.state = {
        imageState: 'loading',
        imageUrl: loadingGif,
        title: 'Loading',
        subtitle: '',
        playbackVisibility: "hidden",
        trackId: objectId,
        popupDisplay: 'none',
        color: 'white', 
        barVisibility: 'hidden'
      }

      let headerData = {
        id: objectId
      }

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchTrack', headerData)
        .then((response) => {
          let trackData = response.data
          console.log(trackData)
          let shadow = hexBrightnessPercentage(trackData.color, 0.25)

          this.setState({
            title: trackData.name,
            subtitle: trackData.artist.concat('  ●  ', trackData.album),
            imageUrl: trackData.coverImage,
            track: trackData,
            imageState: 'show',
            playbackVisibility: "hidden",
            playbackIcon: playIcon,
            audio: new Audio(trackData.preview),
            spotifyId: trackData.spotifyId,
            appleLink: trackData.appleLink,

            color: trackData.color, 
            shadowColor: shadow,
            barVisibility: 'visible'

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
            title: 'Song not Found',
            subtitle: '',
            imageState: 'hidden',
          })

          if (this.state.barVisibility == 'visible'){
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
    this.playbackTapped = this.playbackTapped.bind(this);
    this.hoverBegan = this.hoverBegan.bind(this);
    this.hoverEnded = this.hoverEnded.bind(this);
    this.playbackEnded = this.playbackEnded.bind(this);
    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);
    this.popupClose = this.popupClose.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)

  }

  componentWillUnmount() {
    this.state.audio.pause()
  }

  playbackEnded() {
    this.setState({
      playing: false,
      playbackIcon: playIcon,
      playbackVisibility: 'hidden',
      indexVisibility: 'visible',
    })
  }

  playbackTapped() {
    if (this.state.imageState == 'show') {
      if (this.state.audio.paused) {
        this.state.audio.play()
        this.setState({
          playing: true,
          playbackIcon: pauseIcon,
          playbackVisibility: 'visible',
          indexVisibility: 'hidden',
        })
      } else {
        this.state.audio.pause()
        this.setState({
          playing: false,
          playbackIcon: playIcon,
        })
      }
    }
  }

  hoverBegan() {
    if (this.state.imageState == 'show') {
      if (this.state.audio.paused) {
        this.setState({
          itemClass: style.trackCoverHover,
          playbackIcon: playIcon,
          playbackVisibility: 'visible',
          indexVisibility: 'hidden',
        })
      } else {
        this.setState({
          itemClass: style.trackCoverHover,
          playbackIcon: pauseIcon,
          playbackVisibility: 'visible',
          indexVisibility: 'hidden',
        })
      }
    }
  }

  hoverEnded() {
    if (this.state.imageState == 'show') {
      if (this.state.audio.paused) {
        this.setState({
          itemClass: style.trackCover,
          playbackVisibility: 'hidden',
          indexVisibility: 'visible',
        })
      } else {
        this.setState({
          itemClass: style.trackCover,
          playbackVisibility: 'visible',
          indexVisibility: 'hidden',
          playbackIcon: playingIcon,
        })
      }
    }
  }

  spotifyBtnTapped() {
    const url = 'https://open.spotify.com/track/'.concat(this.state.spotifyId)
    window.open(url, '_blank');
  }

  appleBtnTapped() {
    console.log(this.state.appleLink)
    window.open(this.state.appleLink, '_blank');
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

  render() {
    var imageStyle = style.imgHidden
    var containerStyle = style.btnContainerHidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
    } else if (this.state.imageState == 'show') {
      imageStyle = style.trackCover
      containerStyle = style.btnContainer
    }

    return (
      <span>
        <SoundBarsContainer props={{ "color": this.state.color, "shadowColor": this.state.shadowColor, "visibility": this.state.barVisibility }} />
        <div className={style.main}>

          <span className={style.trackCoverContainer} onClick={this.playbackTapped} onMouseEnter={this.hoverBegan} onMouseLeave={this.hoverEnded}>
            <img src={this.state.imageUrl} className={imageStyle} ></img>
            <img src={this.state.playbackIcon} className={style.trackCoverIcon} style={{ visibility: this.state.playbackVisibility }} ></img>
          </span>
          <h1 className={style.title}>{this.state.title}</h1>
          <pre><h2 className={style.subtitlePadded}>{this.state.subtitle}</h2></pre>
          <SharePopup url={"www.recordexchange.app/track/".concat(this.state.trackId)} display={this.state.popupDisplay} closeFunction={this.popupClose} />
          <div className={containerStyle}>
            <input type="image" src={spotifyLogo} className={style.spotifyButton} onClick={this.spotifyBtnTapped} />
            <input type="image" src={appleLogo} className={style.appleButton} onClick={this.appleBtnTapped} />
            <input type="image" src={shareLogo} className={style.shrButton} onClick={this.shareBtnTapped} />
          </div>
        </div>
      </span>
    );
  }
}

export default TrackPage;
