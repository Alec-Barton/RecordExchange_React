import React from 'react';
import {Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import style from './style.module.css'
import {ParsedUrl, parseUrl} from  '../classes/UrlManager.js'
import history from '../classes/history'
// import ProgressBar from 'react-animated-progress-bar';;
// import ProgressBar from 'react-bootstrap/ProgressBar'
// import './bootstrap.min.css';

import ProgressBarItem from './ProgessBar.js'
import AudioBarContainer from './AudioBar.js'


const firebase = require("firebase");
require("firebase/functions");


/*
class progressManager {

  constructor(state, itemCount, itemDelay){
    this.storedState = state
    console.log(this.storedState)
    this.progress = 0
    this.isComplete = false
    this.isInProgress = false
    this.itemCount = itemCount
    this.setState = {
      storedState: this.storedState.progress,
      progress: this.progress
    }
    // let pard = parseInt(c.progress)
    // this.storedState.progress += 50
    // state.progress += 40
    // a += 50
    // console.log(a)
  }

  begin (){
    this.isInProgress = true
    this.isComplete = false
    this.progress = 0
    // var self = this
    for (let i = 1; i <= this.itemCount; i++){
      // console.log(i)
      let delay = i*100
      // this.incrementProgress()
      // await this.timer(1000)
      this.progress += 1
      this.storedState.progress = this.progress
      setTimeout(()=>{
        this.progress += 1
        this.storedState.progress = this.progress
        console.log(this.storedState.progress)
      }, (delay));
    }
  }

  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  incrementProgress (){
    // console.log('alright')
    // console.log(this.progress)
    this.progress += 1
    console.log(this.progress)
    this.storedState.progress = this.progress
  }

  
}
*/


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
      title: 'Search by url',
      subtitle: 'copy and paste url of a playlist, album or song',
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
      progress2: 0

    };
  }

  beginProgress(items, timePerItem){
    this.setState({
      // inputValue: url,
      progress: 0
    });
  }

  begin (itemCount, itemDelay, delay){
    // this.isInProgress = true
    // this.isComplete = false
    let totalTime = itemCount * itemDelay + delay
    let percentageTime = totalTime/100
    var progress = 0
    // var self = this
    for (let i = 1; i < 100; i++){
      
      let delay = i*percentageTime
      setTimeout(()=>{
        if (!this.loadingComplete){
          progress += 1
          this.setState({
            progress: progress
          })
        }
      }, (delay));
    }
  }

  beginProgress2(items, timePerItem){
    this.setState({
      // inputValue: url,
      progress: 0
    });
  }

  begin2 (){
    console.log('ok')
    // this.isInProgress = true
    // this.isComplete = false
    // let totalTime = itemCount * itemDelay + delay
    // let percentageTime = totalTime/100
    var progress2 = 0
    // var self = this
    for (let i = 1; i < 100; i++){
      let delay = i*100
      setTimeout(()=>{
        progress2 += 1
        this.setState({
          progress2: progress2
        })
        console.log(this.state.progress2)
        
      }, (delay));
    }
  }


  stop(){
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
      console.log(response.data)
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
      setTimeout(()=>{
        history.push({
          pathname: path,
          state: { 
            object: response.data
          }
        })
        window.location.reload(false)
      }, 1000)
      
    }).catch((error)=>{
      this.stop()
      console.log(error)
    })
  } 

  handleChange(event) {
    let url =  event.target.value
    this.setState({
      inputValue: url,
      // progress: '50'
    });
    // console.log("update")
    
    // let manager = new progressManager(this.state, 100, 1)
    // manager.begin()
    // console.log(this.state.progress)
    // this.setState({
      
    // })
    this.begin2()

    if (url == ''){
      this.setState({
        title: 'Search by url',
        subtitle: 'copy and paste url of a playlist, album or song',
        imageUrl: '',
        inputValue: '',
        imageState: 'hidden',
        shareButtonState: 'hidden'
      })
    }
    else{
      let parsedUrl = parseUrl(url)
      console.log(parsedUrl)
      
      if (parsedUrl.serviceType != 'invalid'){

        this.setState({
          imageState: 'loading',
          imageUrl: 'https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif',
          title: 'Fetching Music...',
          subtitle: '',

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
          if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'track'){
            let subtitle = response.data.artist.concat(' ● ', response.data.album)
            this.setState({
              title: response.data.name,
              subtitle: subtitle,
              imageUrl: response.data.coverImage,
              track: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }
          else if (parsedUrl.serviceType == 'spotify' && parsedUrl.objectType == 'album'){
            this.setState({
              title: response.data.name,
              subtitle: response.data.artist,
              imageUrl: response.data.coverImage,
              playlist: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }
          else if (parsedUrl.serviceType == 'spotify' &&  parsedUrl.objectType == 'playlist'){
            this.setState({
              title: response.data.name,
              subtitle: response.data.description,
              imageUrl: response.data.coverImage,
              playlist: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }

          else if (parsedUrl.serviceType == 'apple' &&  parsedUrl.objectType == 'track'){
            let subtitle = response.data.artist.concat(' ● ', response.data.album)
            console.log(response.data)
            this.setState({
              
              title: response.data.name,
              subtitle: subtitle,
              imageUrl: response.data.coverImage,
              track: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }
          else if (parsedUrl.serviceType == 'apple' &&  parsedUrl.objectType == 'album'){
            console.log(response.data)
            this.setState({
              title: response.data.name,
              subtitle: response.data.artist,
              imageUrl: response.data.coverImage,
              playlist: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }
          else if (parsedUrl.serviceType == 'apple' &&  parsedUrl.objectType == 'playlist'){
            this.setState({
              title: response.data.name,
              subtitle: response.data.description,
              imageUrl: response.data.coverImage,
              playlist: response.data,
              imageState: 'visible',
              shareButtonState: 'visible'
              
            })
          }
          
          // console.log(response)          
        })
        .catch ((error) => {
          console.log(error)
          this.setState({
            title: 'ERROR',
            subtitle: 'something went wrong',
            imageState: 'hidden',
            shareButtonState: 'hidden'
          })
        })
        
      } else {
        this.setState({
          title: 'Invalid Url',
          subtitle: 'Something is wrong with the url, try again',
          imageState: 'hidden',
          shareButtonState: 'hidden'
        })
      }
      
    }
  }

  handleSubmit(event) {
    this.setState({title: event.target.value})
  }


  render() {
    var imageStyle = style.imgHidden
    if (this.state.imageState == 'loading'){
        imageStyle = style.loading
    } else if (this.state.imageState == 'visible'){
      imageStyle = style.visible
    }

    var shareButtonStyle = style.shareButton
    if (this.state.shareButtonState == 'hidden'){
      shareButtonStyle = style.hidden
    } 

    var inputBarStyle = style.homeForm
    if (this.state.inputBarState == 'hidden'){
      inputBarStyle = style.hidden
    }

    // var loadingBarStyle = style.hidden
    // if (this.state.loadingBarState == 'hidden'){
    //   loadingBarStyle = style.hidden
    // }

    return (
      <div className = {style.main}>




        <img src ={this.state.imageUrl} className={imageStyle}/>
        <h1 className={style.title}>{this.state.title}</h1>
        <h2 className={style.subtitle}>{this.state.subtitle}</h2>

        <form className={inputBarStyle} onSubmit={this.handleSubmit}>
            <input className={style.homeInput} type="search" value={this.state.inputValue} onChange={this.handleChange} />          
        </form>

        <button className={shareButtonStyle} onClick = {this.shareBtnTapped}>Share</button>
        <ProgressBarItem percentage={this.state.progress}  visibility = {this.state.loadingBarState}/>
        {/* <AudioBarContainer percentage={this.state.progress2}/> */}
        {/* <ProgressBar animated now={this.state.progress} label={`${this.state.progress}%`} /> */}
        
      </div>
    )

  }
}

export default HomePage;