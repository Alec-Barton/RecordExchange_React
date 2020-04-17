import React from 'react';
import { db } from '../firebase.js';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MusicKitManager from './musickitManager.js'
import style from './style.module.css'
import TrackItem from './trackItem'
import axios from 'axios';
import appleLogo from './apple.png'

class PlaylistPage extends React.Component {

  // document.addEventListener('musickitloaded', function() {
  //   // MusicKit global is now defined
    
  // });

  constructor(props) {
    super(props);

    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);

    if (props.location.state != undefined) {
      let playlistData = props.location.state.object
      let tracks = playlistData.tracks
      // console.log(tracks)


      let listItems = tracks.map((track) =>
      <TrackItem key = {track.spotifyId} props = {track}></TrackItem>
      );

      this.state = {
        imageState: 'show', 
        imageUrl: playlistData.coverImage,
        title: playlistData.name,
        subtitle: playlistData.description,
        listItems: listItems,
        playlistData: playlistData
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
        console.log("data", playlistData)
        let tracks = playlistData.tracks

        let listItems = tracks.map((track) =>
        <TrackItem key = {track.spotifyId} props = {track}></TrackItem>
        );
        
        this.setState({
          title: playlistData.name,
          subtitle: playlistData.description,
          imageUrl: playlistData.coverImage,
          playlist: playlistData,
          playlistData: playlistData,
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

      // window.addEventListener('musickitloaded', () => {
      //   // console.log("OKEYD OKEY")
      // })

    }
    console.log("ok", this.state.listItems)
  }

  spotifyBtnTapped(){
    // console.log("OK")

    const stateKey = 'playlistData';
    const state = JSON.stringify(this.state.playlistData);
    // console.log(state)
    localStorage.setItem(stateKey, state);

    // console.log(localStorage.getItem('playlistData'))
      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/getSpotifyAuthUrl')
      .then((response) => {
        // console.log(response)
        window.location = response.data

        

        // let playlistData = response.data
        // let tracks = playlistData.tracks

        // let listItems = tracks.map((track) =>
        // <TrackItem key = {track.spotifyId} props = {track}></TrackItem>
        // );
        
        // this.setState({
        //   title: playlistData.name,
        //   subtitle: playlistData.description,
        //   imageUrl: playlistData.coverImage,
        //   playlist: playlistData,
        //   imageState: 'show',
        //   listItems: listItems

        // })
      })
      .catch ((error) => {
        console.log(error)
        // https://accounts.spotify.com/authorize?response_type=token&client_id=a46438b4ef724143bd34928fee96a742&scope=user-read-private%20user-read-email&redirect_uri=localhost%3A3000&state=abcdefg
        // this.setState({
        //   title: 'ERROR',
        //   subtitle: 'something went wrong',
        //   imageState: 'hidden',
        // })
      })
  }

  appleBtnTapped(){

    

    let musicProvider = MusicKitManager.provider();
    musicProvider.configure();
    let musicInstance = musicProvider.getMusicInstance();
    // musicInstance.authorize
    // console.log(musicInstance)
    // let musicProvider = MusicProvider.sharedProvider();
    // musicProvider.configure();
    // let musicInstance = musicProvider.getMusicInstance();
    // let playlistData = 
    console.log(this.state.playlistData)
    musicInstance.authorize()
    .then(musicUserToken => {
      console.log(this.state.playlistData)
      let headerData = {
        userToken: musicUserToken,
        playlistData: this.state.playlistData
      }

      console.log(`Authorized, music-user-token: ${musicUserToken}`);


      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/addPlaylistToApple', headerData)
      .then((response) => {
        console.log(response)
        console.log(response.data)


      })
      .catch ((error) => {
        console.log(error)
      })
    });

  }

  render() {
    var imageStyle = style.hidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
    } else if (this.state.imageState == 'show') {
      imageStyle = style.visible
    }

    return (
      <div>
        
        <div className={style.main}>

          <img src={this.state.imageUrl} className={imageStyle} />
          <h1 className={style.title}>{this.state.title}</h1>
          <h2 className={style.subtitle}>{this.state.subtitle}</h2>
          

          <div className = {style.btnContainer}>
            <input type="image" onClick = {this.spotifyBtnTapped} src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" className = {style.spotifyButton}/>
            <input type="image" onClick = {this.appleBtnTapped} src={appleLogo} className = {style.appleButton}/>
            <input type="image" src="https://cdn1.iconfinder.com/data/icons/black-round-web-icons/100/round-web-icons-black-29-512.png" className = {style.shrButton} />
            {/* <button className = {style.spotifyButton}/>
            <button className = {style.appleButton}/>
            <button className = {style.shrButton}/> */}
          </div>

          <ul className={style.myUl} > {this.state.listItems} </ul>
        </div>
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
