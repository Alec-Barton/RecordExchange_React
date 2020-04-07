import React from 'react';
import style from './style.module.css'


class TrackItem extends React.Component {
    constructor(props) {
        super(props);
        // console.log('prop', props)
        this.state = {
            name: props.props.name, 
            artist: props.props.artist,
            coverImage: props.props.coverImage
        };
    }

    render(){
        return (
            <div>
                <li className = {style.trackItem}>
                    <img src = {this.state.coverImage} className ={style.trackImage}></img>
                    <span className = {style.trackInfo}>
                        <h3 className={style.trackName}>{this.state.name}</h3>
                        <h4 className={style.trackAttributes}>{this.state.artist}</h4>
                    </span>
                </li>
            </div>
        )
    }
}

export default TrackItem;