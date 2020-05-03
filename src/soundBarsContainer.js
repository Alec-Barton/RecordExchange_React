import React from 'react';
import soundBar from './soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)

        let a = [1,2,3]
        let b = a.slice().reverse()
        // b.reverse()
        console.log(a, b)
        var leftHeightArray = [10, 15, 20, 25, 30, 35, 50, 75, 100, 150, 225, 350, 475, 630, 675, 600, 450, 275, 125, 60, 40, 30, 25, 20, 15, 25, 30, 25, 20, 15]
        var rightHeightArray = leftHeightArray.slice().reverse()

        var leftbarArray = []
        for (let i = 0; i < 30; i++) {
            let data = {
                'color': 'cadetblue',
                'height': String(rightHeightArray[i]).concat('px'),
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
                'color': 'cadetblue',
                'height': String(rightHeightArray[i]).concat('px'),
                'x': String((i * 35) - 20).concat('px'),
                'side':'right'
            }
            rightbarArray.push(data)
        }

        let rightBars = rightbarArray.map((data, index) => {
            return (<SoundBar key={index} props={data}></SoundBar>)
        });

        this.state = {
            leftBars: leftBars,
            rightBars: rightBars
        }

    }

    render() {
        return (
            <span>
                <span className={soundBar.leftBarsContainer}>
                    {this.state.leftBars}
                </span>
                <span className={soundBar.rightBarsContainer}>
                    {this.state.rightBars}
                </span>
            </span>
        )
    }
}

export default SoundBarsContainer