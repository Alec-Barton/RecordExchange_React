import React from 'react';
import style from '../css/style.module.css'
import playIcon from '../assets/play.png'
import pauseIcon from '../assets/pause.png'
import playingIcon from '../assets/playing.png'

class PlaylistTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            playbackIcon: playIcon,
            audio: new Audio(this.props.props.preview),
            playbackVisibility: 'hidden',
            playbackStyle: style.plPlaybackImage,
        };
        this.tapped = this.tapped.bind(this);
        this.hoverBegan = this.hoverBegan.bind(this);
        this.hoverEnded = this.hoverEnded.bind(this);
        this.playbackEnded = this.playbackEnded.bind(this);
        this.state.audio.onended = this.playbackEnded
    }

    playbackEnded (){
        this.setState({ 
            playing: false,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
        })
    }

    tapped(){
        if (!this.state.playing){
            this.state.audio.play()
            this.setState({ 
                playing: true,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
                playbackStyle: style.plPlaybackImageHover,
            })
        } else {
            this.state.audio.pause()
            this.setState({ 
                playing: false,
                playbackIcon: playIcon,
                playbackStyle: style.plPlaybackImage,
            })
        }
    }

    hoverBegan(){
        this.setState({
            isHovered: true,
            playbackStyle: style.plPlaybackImageHover,
            playbackVisibility: 'visible',
        })
        if (!this.state.audio.paused){
            this.setState({
                playbackIcon: pauseIcon,
            })
        }
    }

    hoverEnded(){
        this.setState({
            isHovered: false,
            playbackStyle: style.plPlaybackImage,
        })
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'hidden',
                
            })
        } else {
            this.setState({
                playbackIcon: playingIcon,
            })
        }
    }

    render(){
        return (
            <div>
                <li className = {style.trackItem} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    <span className ={style.playbackContainer} >
                        <img src = {this.state.coverImage} className ={this.state.playbackStyle} ></img>
                        <img src = {this.state.playbackIcon} className ={style.playbackIcon} style = {{visibility: this.state.playbackVisibility}} ></img>
                    </span>
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

export default PlaylistTrack;