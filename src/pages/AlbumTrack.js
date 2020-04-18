import React from 'react';
import style from './style.module.css'


class AlbumTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            audio: new Audio(this.props.props.preview)
        };
        this.tapped = this.tapped.bind(this);
    }

    tapped(){
        if (!this.state.playing){
            this.state.audio.play()
            this.setState({ playing: true})
        } else {
            this.state.audio.pause()
            this.state.audio.currentTime = 0;
            this.setState({ playing: false})
        }
    }

    render(){
        return (
            <div>
                <li className = {style.albumTrackItem } onClick = {this.tapped} >
                    {/* <img src = {this.state.coverImage} className ={style.trackImage}></img> */}
                    <span className = {style.albumTrackInfo}>
                        <h3 className={style.albumTrackName}>{this.state.name}</h3>
                        {/* <h4 className={style.trackAttributes}>{this.state.artist}</h4> */}
                    </span>
                    <span className = {style.trackDurationInfo}>
                        <h3 className={style.trackDuration}> {this.state.duration} </h3>
                    </span>
                </li>
            </div>
        )
    }
}

export default AlbumTrack;