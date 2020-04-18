import React from 'react';
import style from '../css/style.module.css'
import playIcon from '../assets/play.png'
import pauseIcon from '../assets/pause.png'
import playingIcon from '../assets/playing.png'

class AlbumTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.props.index + 1,
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
            indexVisibility: 'visible',
            audio: new Audio(this.props.props.preview),
            itemClass: style.albumTrackItem,
            
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
            indexVisibility: 'visible',
        })
    }

    tapped(){
        if (this.state.audio.paused){
            this.state.audio.play()
            this.setState({ 
                playing: true,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
            })
            
        } else {
            this.state.audio.pause()
            this.setState({ 
                playing: false,
                playbackIcon: playingIcon,
            })
        }
    }

    hoverBegan(){
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackIcon: playIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
            })
        } else {
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
            })
        }
    }

    hoverEnded(){
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'hidden',
                indexVisibility: 'visible',
            })
        } else {
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
                playbackIcon: playingIcon,
            })
        }
    }

    render(){
        return (
            <div>
                <li className = {this.state.itemClass} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    <span className ={style.playbackContainer} >
                        <h3 className={style.abPlaybackIndex} style = {{visibility: this.state.indexVisibility}} >{this.state.index}</h3>
                        <img src = {this.state.playbackIcon} className ={style.abPlaybackIcon} style = {{visibility: this.state.playbackVisibility}} ></img>
                    </span>
                    <span className = {style.albumTrackInfo}>
                        <h3 className={style.albumTrackName}>{this.state.name}</h3>
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