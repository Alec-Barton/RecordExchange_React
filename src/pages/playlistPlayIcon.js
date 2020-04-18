// import React from 'react';
// import style from './style.module.css'
// import playIcon from './play.png'
// import pauseIcon from './pause.png'


// class PlaybackIcon extends React.Component {

//     constructor(props) {
//         super(props);
//         // console.log("prop2", props)
//         this.state = {
//             coverImage: props.coverImage,
//             playbackIcon: pauseIcon,
//             imageStyle: style.plPlaybackImage,
//             iconVisibility: props.visibility,
//             isHovered: props.isHovered

//         }        
//     }

//     // componentDidUpdate(prevProps, prevState, snapshot){
//     //     console.log("prebv", prevState)
//     //     if (this.state.isHovered) {
//     //         console.log("is")
//     //         this.setState({
//     //             imageStyle: style.plPlaybackImageHover,
//     //             iconVisibility: 'visible'
//     //         })
//     //     }
//     //     else {
//     //         this.setState({
//     //             imageStyle: style.plPlaybackImage,
//     //             iconVisibility: 'hidden'
//     //         })
//     //     }
//     // }
//     // componentDidUpdate(prevProps, prevState, snapshot){
//     //     console.log(prevState)
//     // }

//     componentDidMount(){
        
//     }

//     render(){
//         // console.log(this.state.isHovered)

//         return (
//             <span className ={style.plPlaybackContainer} >
//                 <img src = {this.state.coverImage} className ={style.plPlaybackImage} ></img>
//                 <img src = {this.state.playbackIcon} className ={style.plPlaybackIcon} style = {{visibility: this.state.iconVisibility}} ></img>
//             </span>
//         )
//     }
// }

// export default PlaybackIcon;