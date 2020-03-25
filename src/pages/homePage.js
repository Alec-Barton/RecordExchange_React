import React from 'react';
import {Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import style from './style.module.css'
import {ParsedUrl, parseUrl} from  '../classes/UrlManager.js'
import history from '../classes/history';

const firebase = require("firebase");
require("firebase/functions");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);

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

      serviceType: '',
      objectType: '',
      objectId: '',
    };
  }


  shareBtnTapped() {
    let headerData = {
      serviceType: this.state.serviceType,
      objectType: this.state.objectType,
      id: this.state.objectId
    }

    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/convertObject', headerData).then((response) => {
      console.log("ok")
      let path = '/playlist/'.concat(response.data.id)
      history.push({
        pathname: path,
        state: { 
          playlist: response.data
        }
      })
      window.location.reload(false)
    })
  } 

  handleChange(event) {
    let url =  event.target.value
    this.setState({
      inputValue: url,
    });
    if (url == ''){
      this.setState({
        title: 'Search by url',
        subtitle: 'copy and paste url of a playlist, album or song',
        imageUrl: '',
        inputValue: '',
        imageState: 'hidden'
      })
    }
    else{
      let parsedUrl = parseUrl(url)
    
      if (parsedUrl.serviceType != 'invalid'){
        this.setState({
          imageState: 'loading',
          imageUrl: 'https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif',
          title: 'Fetching Music...',
          subtitle: '',

          serviceType: parsedUrl.serviceType,
          objectType: parsedUrl.objectType,
          objectId: parsedUrl.id
        })
  
        let headerData = {
          serviceType: parsedUrl.serviceType,
          objectType: parsedUrl.objectType,
          id: parsedUrl.id
        }
        axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/getPreview', headerData)
        .then((response) => {
          this.setState({
            title: response.data.name,
            subtitle: response.data.description,
            imageUrl: response.data.coverImage,
            playlist: response.data,
            imageState: 'show',
            
          })
          console.log(response)          
        })
        .catch ((error) => {
          console.log(error)
          this.setState({
            title: 'ERROR',
            subtitle: 'something went wrong',
            imageState: 'hidden',
          })
        })
        
      } else {
        this.setState({
          title: 'Invalid Url',
          subtitle: 'Something is wrong with the url, try again',
          imageState: 'hidden',
        })
      }
    }
  }

  handleSubmit(event) {
    this.setState({title: event.target.value})
  }


  render() {
    var imageStyle = style.hidden
    if (this.state.imageState == 'loading'){
        imageStyle = style.loading
    } else if (this.state.imageState == 'show'){
      imageStyle = style.show
    }

    return (
      <div className = {style.main}>

        <img src ={this.state.imageUrl} className={imageStyle}/>
        <h1>{this.state.title}</h1>
        <h2>{this.state.subtitle}</h2>

        <form onSubmit={this.handleSubmit}>
            <input type="search" value={this.state.inputValue} onChange={this.handleChange} />          
        </form>

        <button onClick = {this.shareBtnTapped}>Share</button>
      </div>
    )

  }
}

export default HomePage;