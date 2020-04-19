import React from 'react';
import style from './css/style.module.css'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'

class TrackPage extends React.Component {
  constructor(props) {
    super(props);

    if (props.location.state != undefined) {
      let trackData = props.location.state.object

      this.state = {
        imageState: 'show', 
        imageUrl: trackData.coverImage,
        title: trackData.name,
        subtitle: trackData.artist.concat(' ● ', trackData.album),
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
      .catch ((error) => {
        console.log(error)
        this.setState({
          title: 'ERROR',
          subtitle: 'something went wrong',
          imageState: 'hidden',
        })
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
        <img src={this.state.imageUrl} className={imageStyle} />
        <h1 className={style.title}>{this.state.title}</h1>
        <h2 className={style.subtitle}>{this.state.subtitle}</h2>

        <div className = {style.btnContainer}>
          <input type="image" src={spotifyLogo} className = {style.spotifyButton}/>
          <input type="image" src={appleLogo} className = {style.appleButton}/>
          <input type="image" src={shareLogo} className = {style.shrButton} />
        </div>

      </div>
    );
  }
}

export default TrackPage;
