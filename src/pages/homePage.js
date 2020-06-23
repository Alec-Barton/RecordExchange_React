import React from 'react';
import axios from 'axios';
import style from './css/style.module.css'
import { parseUrl } from '../managers/UrlManager.js'
import history from '../managers/historyManager.js'
import ProgressBarItem from './components/ProgessBar.js'
import SoundBarsContainer from './components/soundBarsContainer.js'
import hexBrightnessPercentage from '../managers/colorManager.js'
import Header from './components/header.js'

const firebase = require("firebase");
require("firebase/functions");


class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);

    this.loadingComplete = false

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAWshYQ6RhgMh_OWs0GApH2zDf-nKpJSXk',
        authDomain: "the-record-exchange.firebaseapp.com",
        projectId: "the-record-exchange",
        databaseURL: "https://the-record-exchange.firebaseio.com",
      });
    }

    this.state = {
      title: 'Search by URL',
      subtitle: 'Input the Spotify or Apple Music link to a Song, Album or Playlist',
      imageUrl: '',
      inputValue: '',
      imageState: 'hidden',
      shareButtonState: 'hidden',
      loadingBarState: 'hidden',
      inputBarState: 'visible',

      serviceType: '',
      objectType: '',
      objectId: '',

      progress: 0,

      color: '#707070', 
      logoColor: '#bababa',
      barVisibility: "hidden"
    };
  }

  beginProgress(items, timePerItem) {
    this.setState({
      progress: 0
    });
  }

  begin(totalTime) {
    var msTime = totalTime * 1000
    // let totalTime = itemCount * itemDelay + delay
    let percentageTime = msTime/100
    var progress = 0
    for (let i = 1; i < 100; i++) {

      let delay = i * percentageTime
      setTimeout(() => {
        if (!this.loadingComplete) {
          progress += 1
          this.setState({
            progress: progress
          })
        }
      }, (delay));
    }
  }

  stop() {
    this.loadingComplete = true
    this.setState({
      progress: 100
    })
  }


  shareBtnTapped() {
    let headerData = {
      serviceType: this.state.serviceType,
      objectType: this.state.objectType,
      id: this.state.objectId
    }
    this.setState({
      loadingBarState: 'visible',
      inputBarState: 'hidden',
      shareButtonState: 'hidden'

    })
    var totalTime = 10 
    if (this.state.objectType == 'playlist'){
      if (this.state.playlist){
        if (this.state.playlist.tracks){
          totalTime = ((this.state.playlist.tracks.length+1)/4) + 2
        }
      }
    }
    this.begin(totalTime)
    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/convertObject', headerData).then((response) => {
      var path = ''
      if (this.state.objectType == 'playlist') {
        path = '/playlist/'.concat(response.data.id)
      }
      else if (this.state.objectType == 'track') {
        path = '/track/'.concat(response.data.id)
      }
      else if (this.state.objectType == 'album') {
        path = '/album/'.concat(response.data.id)
      }

      this.stop()
      setTimeout(() => {
        history.push({
          pathname: path,
          state: {
            object: response.data
          }
        })
        window.location.reload(false)
      }, 1000)

    }).catch((error) => {
      this.setState({
        title: 'Unable to convert Music',
        subtitle: 'something went wrong and your music could not be converted',
        loadingBarState: 'hidden',
        inputBarState: 'visible',
        shareButtonState: 'hidden',
        progress: 0,
        barVisibility: "hide",

      })
      this.stop()
    })
  }

  handleChange(event) {
    let url = event.target.value
    this.setState({
      inputValue: url,
    });

    if (url == '') {
      this.setState({
        title: 'Search by url',
        subtitle: 'copy and paste url of a playlist, album or song',
        imageUrl: '',
        inputValue: '',
        imageState: 'hidden',
        shareButtonState: 'hidden',
        logoColor: '#bababa',
        barVisibility: 'hide'
      })
    }
    else {
      let parsedUrl = parseUrl(url)
      if (parsedUrl.serviceType != 'invalid') {

        this.setState({
          imageState: 'loading',
          imageUrl: 'https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif',
          title: 'Fetching Music...',
          subtitle: ' ',

          serviceType: parsedUrl.serviceType,
          objectType: parsedUrl.objectType,
          objectId: parsedUrl.id,
          shareButtonState: 'hidden',
          barVisibility: 'hide',
          logoColor: '#bababa',
        })

        let headerData = {
          serviceType: parsedUrl.serviceType,
          objectType: parsedUrl.objectType,
          id: parsedUrl.id
        }
        axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/getPreview', headerData)
          .then((response) => {
            let shadow = hexBrightnessPercentage(response.data.color, 0.25)
            if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'track') {
              let subtitle = response.data.artist.concat('  ●  ', response.data.album)
              this.setState({
                title: response.data.name,
                subtitle: subtitle,
                imageUrl: response.data.coverImage,
                track: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',
              })
            }
            else if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'album') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.artist,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',
              })
            }
            else if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'playlist') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.description,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',

              })
            }

            else if (parsedUrl.serviceType == 'apple' && parsedUrl.objectType == 'track') {
              let subtitle = response.data.artist.concat('  ●  ', response.data.album)
              this.setState({

                title: response.data.name,
                subtitle: subtitle,
                imageUrl: response.data.coverImage,
                track: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',
              })
            }
            else if (parsedUrl.serviceType == 'apple' && parsedUrl.objectType == 'album') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.artist,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',
              })
            }
            else if (parsedUrl.serviceType == 'apple' && (parsedUrl.objectType == 'playlist' || parsedUrl.objectType == 'catalogPlaylist')) {
              this.setState({
                title: response.data.name,
                subtitle: response.data.description,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible',
                color: response.data.color,
                logoColor: response.data.color,
                shadowColor: shadow,
                barVisibility: 'visible',
              })
            }
          })
          .catch((error) => {
            this.setState({
              title: 'Could not find Music',
              subtitle: 'your music could not be found',
              imageState: 'hidden',
              color: '#707070',
              logoColor: '#bababa',
              shareButtonState: 'hidden',
              progress: 0,
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

      } else {
        this.setState({
          title: 'Invalid Link',
          subtitle: 'this link is not properly formatted',
          imageState: 'hidden',
          shareButtonState: 'hidden',
          color: '#707070',
          logoColor: '#bababa',
          
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
      }

    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    let lightColor = hexBrightnessPercentage(this.state.color,  0.85)

    let headerColor = hexBrightnessPercentage(this.state.logoColor, -0.15)

    let darkColor = hexBrightnessPercentage(this.state.color, -0.3)

    var imageStyle = style.imgHidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
    } else if (this.state.imageState == 'visibleHome') {
      imageStyle = style.visibleHome
    }

    var shareButtonStyle = style.shareButton
    if (this.state.shareButtonState == 'hidden') {
      shareButtonStyle = style.hidden
    }

    var inputBarStyle = style.homeForm
    if (this.state.inputBarState == 'hidden') {
      inputBarStyle = style.hidden
    }

    return (
      
      <span>
        <Header color = {headerColor} logoColor = {headerColor}/>
        <SoundBarsContainer props={{"color":this.state.color, "shadowColor":this.state.shadowColor, "visibility":this.state.barVisibility, "screenSize":  window.innerWidth}}/>
        {/* <span className={style.homeBackground}></span> */}
        <div className={style.main}>
          <img src={this.state.imageUrl} className={imageStyle} />
          {/* <span className={style.homeBackground}/> */}
          <h1 className={style.homeTitle}>{this.state.title}</h1>
          <h2 className={style.homeSubtitlePadded}>{this.state.subtitle}</h2>         
          
          <form className={inputBarStyle} onSubmit={this.handleSubmit}>
            <input className={style.homeInput} type="search" value={this.state.inputValue} onChange={this.handleChange} />
          </form>

          <button className={shareButtonStyle} onClick={this.shareBtnTapped} style={{backgroundColor: lightColor, color: darkColor}}>Share</button>
          <ProgressBarItem percentage={this.state.progress} color={this.state.color} visibility={this.state.loadingBarState}  />
        </div>
      </span>

    )
  }
}

export default HomePage;