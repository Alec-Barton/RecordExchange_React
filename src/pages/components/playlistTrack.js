import React from 'react';
import style from '../css/style.module.css'
import playIcon from '../assets/play.png'
import pauseIcon from '../assets/pause.png'
import playingIcon from '../assets/playing.png'

import {isMobile} from 'react-device-detect';

class PlaylistTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: !props.props.stop,
            isHovered: false, //!props.props.stop,
            playbackIcon: playIcon,
            // audio: new Audio(this.props.props.preview),
            playbackVisibility: 'hidden',
            playbackStyle: style.plPlaybackImage,
        };
        this.tapped = this.tapped.bind(this);
        this.hoverBegan = this.hoverBegan.bind(this);
        this.hoverEnded = this.hoverEnded.bind(this);
        this.stopPlayback = this.stopPlayback.bind(this);
        this.playbackEnded = this.playbackEnded.bind(this);
        // this.state.audio.onended = this.playbackEnded
    }

    playbackEnded (){
        this.setState({ 
            playing: false,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
        })
    }

    stopPlayback(){
        console.log("stop:", this.state.name)
        if (this.state.playing) {
            setTimeout(()=>{ 
                this.setState({
                    playing:false
                })
            }, 50);
        }
    }

    tapped(){
        if (this.state.playing){
            this.props.action("pause", this.props.props.preview)
            this.setState({ 
                playing: false,
            })
            
        } else {
            this.props.action("play", this.props.props.preview)
            this.setState({ 
                playing: true,
            })
        }
    }

    hoverBegan(){
        this.setState({
            isHovered: true,
        })
    }

    hoverEnded(){
        this.setState({
            isHovered: false,
        })
    }

    render(){
        var indexVisibility = "visible"
        var playbackVisibility = "hidden"
        var playbackIcon = playIcon

        if (this.props.props.stop){
            if(!this.state.isHovered){
                indexVisibility = 'visible'
                playbackVisibility = 'hidden'
            } else {
                indexVisibility = 'hidden'
                playbackVisibility = 'visible'
            }
            playbackIcon = playIcon
            this.stopPlayback()
        }else {
            indexVisibility = 'hidden'
            playbackVisibility = 'visible'
            if(this.state.isHovered && !isMobile){
                playbackIcon = pauseIcon
            } else {
                playbackIcon = playingIcon
            }
        }

        return (
            <div>
                <li className = {style.trackItem} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    <span className ={style.playbackContainer} >
                        <img src = {this.state.coverImage} className ={this.state.playbackStyle} ></img>
                        <img src = {playbackIcon} className ={style.playbackIcon} style = {{visibility: playbackVisibility}} ></img>
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