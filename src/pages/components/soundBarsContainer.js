import React from 'react';
import soundBar from '../css/soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)

        var leftHeightArray = [7.5, 10, 15, 20, 25, 30, 35, 50, 75, 100, 150, 225, 350, 475, 630, 675, 600, 450, 275, 175, 100, 65, 35, 27.5, 30, 37.5, 45, 35, 27.5, 22.5, ]
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
                'x': String((i * 35)).concat('px'),
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
                'x': String((i * 35)-10).concat('px'),
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