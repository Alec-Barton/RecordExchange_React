import React from 'react';
import style from './style.module.css'


class TrackItem extends React.Component {
    // audio

    constructor(props) {
        super(props);
        // console.log('prop', props)
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            audio: new Audio(this.props.props.preview)
        };
        // audio = new Audio("https://p.scdn.co/mp3-preview/2bf625d5deccb26455ce3d20121dc4aa9f3cd500?cid=a46438b4ef724143bd34928fee96a742")
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

    clearPlayback (){
        this.state.audio.pause = 0;
        this.state.audio.currentTime = 0;
    }

    render(){
        return (
            <div>
                <audio controls>
                    <source src="https://p.scdn.co/mp3-preview/2bf625d5deccb26455ce3d20121dc4aa9f3cd500?cid=a46438b4ef724143bd34928fee96a742" type="audio/mpeg"/>
                </audio>

                <li className = {style.trackItem}>
                    <img src = {this.state.coverImage} className ={style.trackImage} onClick = {this.tapped} ></img>
                    <span className = {style.trackInfo}>
                        <h3 className={style.trackName}>{this.state.name}</h3>
                        <h4 className={style.trackAttributes}>{this.state.artist}</h4>
                        
                    </span>
                    <span className = {style.trackDurationInfo}>
                        <h3 className={style.trackDuration}> {this.state.duration} </h3>
                    </span>
                    
                </li>
            </div>
        )
    }
}

export default TrackItem;