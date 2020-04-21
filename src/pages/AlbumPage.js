import React from 'react';
import style from './css/style.module.css'
import AlbumTrack from './components/AlbumTrack.js'
import axios from 'axios';
import appleLogo from './assets/apple.png'
import spotifyLogo from './assets/spotify.png'
import shareLogo from './assets/shareLogo.png'

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    if (props.location.state != undefined) {
      let albumData = props.location.state.object
      let tracks = albumData.tracks
      let listItems = tracks.map((track, index) => {
        track["index"] = index
        return (<AlbumTrack key={index} props={track} ></AlbumTrack>)
      });

      this.state = {
        imageState: 'show',
        imageUrl: albumData.coverImage,
        title: albumData.name,
        subtitle: albumData.artist,
        listItems: listItems,
        spotifyId: albumData.spotifyId,
        appleId: albumData.appleId,
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

      axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/fetchAlbum', headerData)
        .then((response) => {
          let albumData = response.data
          let tracks = albumData.tracks
          let listItems = tracks.map((track, index) => {
            track["index"] = index
            return (<AlbumTrack key={index} props={track} ></AlbumTrack>)
          });

          this.setState({
            title: albumData.name,
            subtitle: albumData.artist,
            imageUrl: albumData.coverImage,
            album: albumData,
            imageState: 'show',
            listItems: listItems

          })
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            title: 'Album not Found',
            subtitle: '',
            imageState: 'hidden',
          })
        })
    }
    this.spotifyBtnTapped = this.spotifyBtnTapped.bind(this);
    this.appleBtnTapped = this.appleBtnTapped.bind(this);
    this.shareBtnTapped = this.shareBtnTapped.bind(this);
  }

  spotifyBtnTapped(){
    const url = 'https://open.spotify.com/album/'.concat(this.state.spotifyId)
    window.open(url, '_blank');
  }

  appleBtnTapped(){
    const url = 'https://music.apple.com/us/album/'.concat(this.state.appleId)
    window.open(url, '_blank');
  }

  shareBtnTapped(){

  }

  render() {
    var imageStyle = style.imgHidden
    var containerStyle = style.btnContainerHidden
    if (this.state.imageState == 'loading') {
      imageStyle = style.loading
      
    } else if (this.state.imageState == 'show') {
      imageStyle = style.visible
      containerStyle = style.btnContainer
    }

    return (
      <div className={style.main}>
        <img src={this.state.imageUrl} className={imageStyle} />
        <h1 className={style.title}>{this.state.title}</h1>
        <h2 className={style.subtitle}>{this.state.subtitle}</h2>

        <div className={containerStyle}>
          <input type="image" src={spotifyLogo} className={style.spotifyButton} onClick={this.spotifyBtnTapped}/>
          <input type="image" src={appleLogo} className={style.appleButton} onClick={this.appleBtnTapped}/>
          <input type="image" src={shareLogo} className={style.shrButton} onClick={this.shareBtnTapped}/>
        </div>

        <ul className={style.myUl} > {this.state.listItems} </ul>
      </div>
    );
  }
}

export default AlbumPage;
