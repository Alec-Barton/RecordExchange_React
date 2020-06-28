import React from 'react';
import soundBar from '../css/soundBar.module.css'

class SoundBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            color: props.props.color,
            height: props.props.height,
            x: props.props.x, 
            side: props.props.side
        }
    }

    render() {
        var fillClass = soundBar.barEmpty
        if (this.props.props.visibility == 'visible'){
            fillClass = soundBar.barFill
        } else if (this.props.props.visibility == 'shown'){
            fillClass = soundBar.barShown
        }else if (this.props.props.visibility == 'hide'){
            fillClass = soundBar.barHide
        }

        var zIndex = (this.props.props.index * -1)

        var containerStyle = {
            height: this.state.height, 
            left: this.state.x,
            zIndex : zIndex
        }
        if (this.state.side == 'left'){
            containerStyle = {
                height: this.state.height, 
                right: this.state.x 
            }
        }
        let shadowStyle = '10px 10px 5px 5px '.concat(this.props.props.shadowColor).concat('AA')

        return (
            <span className = {soundBar.barFrameContainer} style={containerStyle}>
                <span className={soundBar.barFrame} style={{ height: this.state.height}}>
                    <span className={fillClass} style={{ backgroundColor: this.props.props.color, boxShadow: shadowStyle, zIndex: zIndex}} />
                </span>
            </span>
        )
    }
}

export default SoundBar