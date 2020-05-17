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
            playing: !props.props.stop,
            isHovered: !props.props.stop,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
            indexVisibility: 'visible',
            itemClass: style.albumTrackItem,    
            // isHovered: false,        
        };
        this.tapped = this.tapped.bind(this);
        this.hoverBegan = this.hoverBegan.bind(this);
        this.hoverEnded = this.hoverEnded.bind(this);
        this.stopPlayback = this.stopPlayback.bind(this)
    }

    stopPlayback(){
        if (this.state.playing) {
            setTimeout(()=>{ 
                this.setState({
                    playing:false
                })
            }, 50);
        }
    }

    tapped(){
        if (!this.state.playing){
            this.props.action("play", this.props.props.preview)
            this.setState({ 
                playing: true,
            })
            
        } else {
            this.props.action("pause", this.props.props.preview)
            this.setState({ 
                playing: false,
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
            if(this.state.isHovered){
                playbackIcon = pauseIcon
            } else {
                playbackIcon = playingIcon
            }
        }
        
        return (
            <div>
                <li className = {this.state.itemClass} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                    <span className ={style.playbackContainer} >
                        <h3 className={style.abPlaybackIndex} style = {{visibility: indexVisibility}} >{this.state.index}</h3>
                        <img src = {playbackIcon} className ={style.abPlaybackIcon} style = {{visibility: playbackVisibility}} ></img>
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