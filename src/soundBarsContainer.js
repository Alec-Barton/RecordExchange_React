import React from 'react';
import soundBar from './soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)

        var leftHeightArray = [10, 15, 20, 25, 30, 35, 50, 75, 100, 150, 225, 350, 475, 630, 675, 600, 450, 275, 125, 60, 40, 30, 25, 20, 15, 25, 30, 25, 20, 15]
        var rightHeightArray = leftHeightArray.slice().reverse()

        this.state = {
            leftHeights: leftHeightArray,
            rightHeights: rightHeightArray
        }
        // var leftbarArray = []
        // for (let i = 0; i < 30; i++) {
        //     let data = {
        //         'color': 'cadetBlue',
        //         'height': String(rightHeightArray[i]).concat('px'),
        //         'x': String((i * 35)).concat('px'),
        //         'side':'left'
        //     }
        //     leftbarArray.push(data)
        // }

        // let leftBars = leftbarArray.map((data, index) => {
        //     return (<SoundBar key={index} props={data}></SoundBar>)
        // });

        // var rightbarArray = []
        // for (let i = 0; i < 30; i++) {
        //     let data = {
        //         'color': 'cadetBlue',
        //         'height': String(rightHeightArray[i]).concat('px'),
        //         'x': String((i * 35)-10).concat('px'),
        //         'side':'right'
        //     }
        //     rightbarArray.push(data)
        // }

        // let rightBars = rightbarArray.map((data, index) => {
        //     return (<SoundBar key={index} props={data}></SoundBar>)
        // });

        // this.state = {
        //     leftBars: leftBars,
        //     rightBars: rightBars
        // }

    }

    render() {
        var leftbarArray = []
        for (let i = 0; i < 30; i++) {
            let data = {
                'color': this.props.props.color,
                'height': String(this.state.rightHeights[i]).concat('px'),
                'x': String((i * 35)).concat('px'),
                'side':'left'
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
                'height': String(this.state.rightHeights[i]).concat('px'),
                'x': String((i * 35)-10).concat('px'),
                'side':'right'
            }
            rightbarArray.push(data)
        }

        let rightBars = rightbarArray.map((data, index) => {
            return (<SoundBar key={index} props={data}></SoundBar>)
        });

        console.log(this.props.visibility)
        return (
            <span>
                <span className={soundBar.leftBarsContainer} style={{"visibility": this.props.props.visibility}}>
                    {leftBars}
                </span>
                <span className={soundBar.rightBarsContainer}>
                    {rightBars}
                </span>
            </span>
        )
    }
}

export default SoundBarsContainer