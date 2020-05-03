import React from 'react';
import soundBar from './soundBar.module.css'

class SoundBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            color: props.props.color,
            height: props.props.height,
            x: props.props.x, 
            side: props.props.side
        }
        // console.log(this.state)
    }

    render() {
        var containerStyle = {
            height: this.state.height, 
            left: this.state.x 
        }
        if (this.state.side == 'left'){
            containerStyle = {
                height: this.state.height, 
                right: this.state.x 
            }
        }

        return (
            <span className = {soundBar.barFrameContainer} style={containerStyle}>
                <span className={soundBar.barFrame} style={{ height: this.state.height}}>
                    <span className={soundBar.barFill} style={{ backgroundColor: this.props.props.color }} />
                </span>
            </span>

        )
    }
}

export default SoundBar