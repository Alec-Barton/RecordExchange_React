import React from 'react';
import style from './style.module.css'
import playIcon from './play.png'
import pauseIcon from './pause.png'
import PlaybackIcon from './playlistPlayIcon'


class TrackItem extends React.Component {
    // audio

    constructor(props) {
        super(props);
        // console.log("props", props)
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage,
            duration: props.props.duration,
            playing: false,
            playbackIcon: playIcon,
            audio: new Audio(this.props.props.preview),
            // isHovered: false,
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
            this.state.audio.currentTime = 0;
            this.setState({ 
                playing: false,
                playbackIcon: playIcon,
                playbackStyle: style.plPlaybackImage,
            })
        }
    }

    hoverBegan(){
        this.setState({
            isHovered: true
        })
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackVisibility: 'visible',
                playbackStyle: style.plPlaybackImageHover,
            })
        }
    }

    hoverEnded(){
        this.setState({
            isHovered: false
        })
        if (this.state.audio.paused){
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'hidden',
                playbackStyle: style.plPlaybackImage,
            })
        } 
    }
    
    // tapped(){
    //     if (!this.state.playing){
    //         this.state.audio.play()
    //         this.setState({ playing: true})
    //     } else {
    //         this.state.audio.pause()
    //         this.state.audio.currentTime = 0;
    //         this.setState({ playing: false})
    //     }
    // }

    // clearPlayback (){
    //     this.state.audio.pause = 0;
    //     this.state.audio.currentTime = 0;
    // }

    render(){
        // console.log(this.state.isHovered)
        return (
            <div>
                {/* <audio controls>
                    <source src="https://p.scdn.co/mp3-preview/2bf625d5deccb26455ce3d20121dc4aa9f3cd500?cid=a46438b4ef724143bd34928fee96a742" type="audio/mpeg"/>
                </audio> */}

                <li className = {style.trackItem} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    {/* <img src = {this.state.coverImage} className ={style.trackImage} ></img> */}
                    {/* <PlaybackIcon coverImage = {this.state.coverImage}  isHovered= { this.state.isHovered} visibility = {this.state.playbackVisibility}></PlaybackIcon> */}
                    <span className ={style.plPlaybackContainer} >
                        <img src = {this.state.coverImage} className ={this.state.playbackStyle} ></img>
                        <img src = {this.state.playbackIcon} className ={style.plPlaybackIcon} style = {{visibility: this.state.playbackVisibility}} ></img>
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

export default TrackItem;