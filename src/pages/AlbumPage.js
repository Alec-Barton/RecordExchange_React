import React from 'react';
import { db } from '../firebase.js';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import style from './style.module.css'
import AlbumTrack from './AlbumTrack.js'
import axios from 'axios';
import appleLogo from './apple.png'

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    if (props.location.state != undefined) {
      let albumData = props.location.state.object
      let tracks = albumData.tracks

      console.log(tracks)

      let listItems = tracks.map((track) =>
      <AlbumTrack key = {track.spotifyId} props = {track}></AlbumTrack>
      );

      this.state = {
        imageState: 'show', 
        imageUrl: albumData.coverImage,
        title: albumData.name,
        subtitle: albumData.artist,
        listItems: listItems
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
        let albumData = response.data
        console.log(albumData)
        let tracks = albumData.tracks
        let listItems = tracks.map((track) =>
        <AlbumTrack key = {track.spotifyId} props = {track}></AlbumTrack>
        );
        
        this.setState({
          title: albumData.name,
          subtitle: albumData.artist,
          imageUrl: albumData.coverImage,
          album: albumData,
          imageState: 'show',
        //   listItems: listItems

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
          <input type="image" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" className = {style.spotifyButton}/>
          <input type="image" src={appleLogo} className = {style.appleButton}/>
          <input type="image" src="https://cdn1.iconfinder.com/data/icons/black-round-web-icons/100/round-web-icons-black-29-512.png" className = {style.shrButton} />
        </div>

        <ul className={style.myUl} > {this.state.listItems} </ul>
      </div>
    );
  }
}

export default AlbumPage;
