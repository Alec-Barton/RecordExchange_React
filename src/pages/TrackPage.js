import React from 'react';
import style from './css/style.module.css'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'
import playIcon from './assets/play.png'
import pauseIcon from './assets/pause.png'
import playingIcon from './assets/playing.png'

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("o", props)
    if (props.location.state != undefined) {
      let trackData = props.location.state.object

      this.state = {
        imageState: 'show',
        imageUrl: trackData.coverImage,
        title: trackData.name,
        subtitle: trackData.artist.concat(' ● ', trackData.album),
        playbackVisibility: "hidden",
        playbackIcon: playIcon,
        audio: new Audio(trackData.preview),
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

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchTrack', headerData)
        .then((response) => {
          let trackData = response.data

          this.setState({
            title: trackData.name,
            subtitle: trackData.artist.concat(' ● ', trackData.album),
            imageUrl: trackData.coverImage,
            track: trackData,
            imageState: 'show',
          })
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            title: 'ERROR',
            subtitle: 'something went wrong',
            imageState: 'hidden',
          })
        })
    }
    this.tapped = this.tapped.bind(this);
    this.hoverBegan = this.hoverBegan.bind(this);
    this.hoverEnded = this.hoverEnded.bind(this);
    this.playbackEnded = this.playbackEnded.bind(this);
  }

  playbackEnded (){
    this.setState({ 
        playing: false,
        playbackIcon: playIcon,
        playbackVisibility: 'hidden',
        indexVisibility: 'visible',
    })
}

  tapped(){
    console.log('ok')
    if (this.state.audio.paused){
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

  hoverBegan() {
    if (this.state.audio.paused){
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

  hoverEnded() {
    if (this.state.audio.paused){
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

  render() {
    var imageStyle = style.hidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
    } else if (this.state.imageState == 'show') {
      imageStyle = style.visible
    }

    return (
      <div className={style.main}>

        <span className={style.trackCoverContainer} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
          <img src={this.state.imageUrl} className={style.trackCover} ></img>
          <img src={this.state.playbackIcon} className={style.trackCoverIcon} style = {{visibility: this.state.playbackVisibility}} ></img>
        </span>

        {/* <img src={this.state.imageUrl} className={imageStyle} onMouseEnter={this.hoverBegan} onMouseLeave={this.hoverEnded} /> */}
        <h1 className={style.title}>{this.state.title}</h1>
        <h2 className={style.subtitle}>{this.state.subtitle}</h2>

        <div className={style.btnContainer}>
          <input type="image" src={spotifyLogo} className={style.spotifyButton} />
          <input type="image" src={appleLogo} className={style.appleButton} />
          <input type="image" src={shareLogo} className={style.shrButton} />
        </div>

      </div>
    );
  }
}

export default TrackPage;
