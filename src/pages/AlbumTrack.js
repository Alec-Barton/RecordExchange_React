import React from 'react';
import style from './style.module.css'
import playIcon from './play.png'
import pauseIcon from './pause.png'


class AlbumTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
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
        })
        console.log("edned")
    }

    tapped(){
        if (!this.state.playing){
            this.state.audio.play()
            this.setState({ 
                playing: true,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
            })
            
        } else {
            this.state.audio.pause()
            this.state.audio.currentTime = 0;
            this.setState({ 
                playing: false,
                playbackIcon: playIcon,
            })
        }
    }

    hoverBegan(){
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackVisibility: 'visible',
            })
        }
    }

    hoverEnded(){
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'hidden',
            })
        } 
    }

    render(){
        return (
            <div>
                <li className = {this.state.itemClass} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    {/* <img src = {this.state.coverImage} className ={style.trackImage}></img> */}
                    <img src = {this.state.playbackIcon} className ={style.playbackIcon} style ={{visibility: this.state.playbackVisibility}}></img>
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