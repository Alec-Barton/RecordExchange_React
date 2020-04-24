import React from 'react';
import axios from 'axios';
import style from './css/style.module.css'
import { parseUrl } from '../managers/UrlManager.js'
import history from '../managers/historyManager.js'
import ProgressBarItem from './components/ProgessBar.js'

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

    };
  }

  beginProgress(items, timePerItem) {
    this.setState({
      progress: 0
    });
  }

  begin(itemCount, itemDelay, delay) {
    let totalTime = itemCount * itemDelay + delay
    let percentageTime = totalTime / 100
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
    this.begin(10, 1000, 5000)
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
        loadingBarState: 'Unable to convert Music',
        inputBarState: 'something went wrong and your music could not be converted',
        shareButtonState: 'hidden'
  
      })
      this.stop()
      console.log(error)
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
        shareButtonState: 'hidden'
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
          shareButtonState: 'hidden'
        })

        let headerData = {
          serviceType: parsedUrl.serviceType,
          objectType: parsedUrl.objectType,
          id: parsedUrl.id
        }
        axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/getPreview', headerData)
          .then((response) => {
            if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'track') {
              let subtitle = response.data.artist.concat('  ●  ', response.data.album)
              this.setState({
                title: response.data.name,
                subtitle: subtitle,
                imageUrl: response.data.coverImage,
                track: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible'

              })
            }
            else if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'album') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.artist,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible'

              })
            }
            else if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'playlist') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.description,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible'

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
                shareButtonState: 'visible'

              })
            }
            else if (parsedUrl.serviceType == 'apple' && parsedUrl.objectType == 'album') {
              this.setState({
                title: response.data.name,
                subtitle: response.data.artist,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible'

              })
            }
            else if (parsedUrl.serviceType == 'apple' && (parsedUrl.objectType == 'playlist' || parsedUrl.objectType == 'catalogPlaylist')) {
              this.setState({
                title: response.data.name,
                subtitle: response.data.description,
                imageUrl: response.data.coverImage,
                playlist: response.data,
                imageState: 'visibleHome',
                shareButtonState: 'visible'
              })
            }
          })
          .catch((error) => {
            this.setState({
              title: 'Could not find Music',
              subtitle: 'your music could not be found',
              imageState: 'hidden',
              shareButtonState: 'hidden'
            })
          })

      } else {
        this.setState({
          title: 'Invalid Link',
          subtitle: 'something is wrong with this url - try again',
          imageState: 'hidden',
          shareButtonState: 'hidden'
        })
      }

    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
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

      <div className={style.main}>
        <img src={this.state.imageUrl} className={imageStyle} />
        <pre><h1 className={style.title}>{this.state.title}</h1></pre>
        <h2 className={style.subtitlePadded}>{this.state.subtitle}</h2>

        <form className={inputBarStyle} onSubmit={this.handleSubmit}>
          <input className={style.homeInput} type="search" value={this.state.inputValue} onChange={this.handleChange}/>
        </form>

        <button className={shareButtonStyle} onClick={this.shareBtnTapped}>Share</button>
        <ProgressBarItem percentage={this.state.progress} color={'#fc0330'} visibility={this.state.loadingBarState} />
      </div>
    )
  }
}

export default HomePage;