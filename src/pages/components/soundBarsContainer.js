import React from 'react';
import soundBar from '../css/soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)

        var leftHeightArray = [5.625, 7.5, 11.25, 15.0, 18.75, 22.5, 26.25, 37.5, 56.25, 75.0, 112.5, 168.75, 262.5, 356.25, 472.5, 506.25, 450.0, 337.5, 206.25, 131.25, 75.0, 48.75, 26.25, 20.625, 22.5, 28.125, 33.75, 26.25, 20.625, 16.875]
        // var leftHeightArray = [7.5, 10, 15, 20, 25, 30, 35, 50, 75, 100, 150, 225, 350, 475, 630, 675, 600, 450, 275, 175, 100, 65, 35, 27.5, 30, 37.5, 45, 35, 27.5, 22.5, ]
        var rightHeightArray = leftHeightArray.slice().reverse()

        this.state = {
            leftHeights: leftHeightArray,
            rightHeights: rightHeightArray
        }

    }

    render() {
        var leftbarArray = []
        for (let i = 0; i < 30; i++) {
            let data = {
                'color': this.props.props.color,
                'shadowColor': this.props.props.shadowColor,
                'height': String(this.state.rightHeights[i]).concat('px'),
                'x': String((i * 26.25)).concat('px'),
                'side':'left',
                'visibility': this.props.props.visibility,
                'index': (i+1)
            }
            leftbarArray.push(data)
        }

        let leftBars = leftbarArray.map((data, index) => {
            return (<SoundBar key={index} props={data}></SoundBar>)
        });

        var rightbarArray = []
        for (let i = 0; i < 30; i++) {
            let data = {
                'color': this.props.props.color,
                'shadowColor': this.props.props.shadowColor,
                'height': String(this.state.rightHeights[i]).concat('px'),
                'x': String((i * 26.25)-10).concat('px'),
                'side':'right', 
                'visibility': this.props.props.visibility,
                'index': 1
            }
            rightbarArray.push(data)
        }

        let rightBars = rightbarArray.map((data, index) => {
            return (<SoundBar key={index} props={data}></SoundBar>)
        });

        return (
            <span>
                <span className={soundBar.leftBarsContainer} style={{"visibility": this.props.props.visibility}}>
                    {leftBars}
                </span>
                <span className={soundBar.rightBarsContainer} style={{"visibility": this.props.props.visibility}}>
                    {rightBars}
                </span>
            </span>
        )
    }
}

export default SoundBarsContainer