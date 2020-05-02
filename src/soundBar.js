import React from 'react';
import soundBar from './soundBar.module.css'

class SoundBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            color: props.props.color,
            height: props.props.height,
            x: props.props.x
        }
        console.log(this.state)
    }

    render() {


        return (
            <span className = {soundBar.barFrameContainer} style={{height: this.state.height, left: this.state.x }}>
                <span className={soundBar.barFrame} style={{ height: this.state.height}}>
                    <span className={soundBar.barFill} style={{ backgroundColor: this.state.color }} />
                </span>
            </span>

        )
    }
}

export default SoundBar