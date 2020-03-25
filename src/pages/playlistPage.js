import React from 'react';
import { db } from '../firebase.js';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import style from './style.module.css'
import TrackItem from './trackItem'
import axios from 'axios';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);

    if (props.location.state != undefined) {
      let playlistData = props.location.state.playlist
      let tracks = playlistData.tracks
      console.log(tracks)

      console.log('123')

      let listItems = tracks.map((track) =>
      <TrackItem key = {track.spotifyId} props = {track}></TrackItem>
      );

      this.state = {
        imageState: 'show', 
        imageUrl: playlistData.coverImage,
        title: playlistData.name,
        subtitle: playlistData.description,
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

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchPlaylist', headerData)
      .then((response) => {
        let playlistData = response.data
        let tracks = playlistData.tracks

        let listItems = tracks.map((track) =>
        <TrackItem key = {track.spotifyId} props = {track}></TrackItem>
        );
        
        this.setState({
          title: playlistData.name,
          subtitle: playlistData.description,
          imageUrl: playlistData.coverImage,
          playlist: playlistData,
          imageState: 'show',
          listItems: listItems

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
      imageStyle = style.show
    }

    return (
      <div className={style.main}>
        <img src={this.state.imageUrl} className={imageStyle} />
        <h1>{this.state.title}</h1>
        <h2>{this.state.subtitle}</h2>

        <ul> {this.state.listItems} </ul>
      </div>
    );
  }
}

// class Playlist {
//   constructor(name, description, coverImage, tracks) {
//     this.name = name
//     this.description = description
//     this.coverImage = coverImage
//     this.tracks = tracks
//   }
// }

// class Track {
//   constructor(name, artist, album, coverImage) {
//     this.name = name
//     this.artist = artist
//     this.album = album
//     this.coverImage = coverImage
//   }
// }

export default PlaylistPage;
