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
            // playbackState : "stopped",
            playing: false,
            playbackIcon: playIcon,
            playbackVisibility: 'hidden',
            indexVisibility: 'visible',
            // audio: new Audio(this.props.props.preview),
            itemClass: style.albumTrackItem,    
            isHovered: false,        
        };
        this.tapped = this.tapped.bind(this);
        this.hoverBegan = this.hoverBegan.bind(this);
        this.hoverEnded = this.hoverEnded.bind(this);
        // this.playbackEnded = this.playbackEnded.bind(this);
        // this.state.audio.onended = this.playbackEnded
        this.stopPlayback = this.stopPlayback.bind(this)
        this.startPlayback = this.startPlayback.bind(this)
        console.log("created")
        // if (props.props.playbackState == "stopped"){
        //     this.setState
        // }
    }

    // playbackEnded (){
    //     this.setState({ 
    //         playing: false,
    //         // playbackState: "stopped",
    //         playbackIcon: playIcon,
    //         playbackVisibility: 'hidden',
    //         indexVisibility: 'visible',
    //     })
    // }

    stopPlayback(){
        // setTimeout(()=>{ 
        if (this.state.playing) {
            setTimeout(()=>{ 
                this.setState({
                    playing:false
                })
            }, 50);
            
        }
            
        // }, 50);
    }

    startPlayback(){
        if (!this.state.playing) {
            setTimeout(()=>{ 
                this.setState({
                    playing:true
                })
            }, 50);
            
        }
    }

    tapped(){
        // console.log(aa)
        
        // this.props.playbackFunction(this.props.props.preview)
        if (!this.state.playing){
            this.props.action("play", this.props.props.preview)
            // this.state.audio.play()
            this.setState({ 
                playing: true,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
            })
            
        } else {
            // this.props.action(this.props.props.preview)
            // this.state.audio.pause()
            this.props.action("pause", this.props.props.preview)
            this.setState({ 
                playing: false,
                playbackIcon: playIcon,
            })
        }
    }

    hoverBegan(){
        if (!this.state.playing){
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackIcon: playIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
                isHovered: true,
            })
        } else {
            this.setState({
                itemClass: style.albumTrackItemHover,
                playbackIcon: pauseIcon,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
                isHovered: true,
            })
        }
    }

    hoverEnded(){
        if (!this.state.playing){
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'hidden',
                indexVisibility: 'visible',
                isHovered: false,
            })
        } else {
            this.setState({
                itemClass: style.albumTrackItem,
                playbackVisibility: 'visible',
                indexVisibility: 'hidden',
                playbackIcon: playingIcon,
                isHovered: false,
            })
        }
    }

    render(){
        console.log('asadad')

        var indexVisibility = this.state.indexVisibility
        var playbackVisibility = this.state.playbackVisibility
        var playbackIcon = this.state.playbackIcon
        if (this.props.props.stop){
            // console.log("stopeed")
            if(!this.state.isHovered){
                indexVisibility = 'visible'
                playbackVisibility = 'hidden'
            }
            
            playbackIcon = playIcon
            this.stopPlayback()
        }else {
            this.startPlayback()
            // indexVisibility = 'hidden'
            // playbackVisibility = 'visible'
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