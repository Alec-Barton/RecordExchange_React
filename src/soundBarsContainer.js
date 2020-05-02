import React from 'react';
import soundBar from './soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)
        
    }

    render() {

    
        return (
            <span className={soundBar.barsContainer}>
                {/* <soundBar/> */}
                <SoundBar props = {{'color':'red', 'height': '100px', 'x': '20px'}}/>
                <SoundBar props = {{'color':'red', 'height': '400px', 'x': '50px'}}/>
                <SoundBar props = {{'color':'red', 'height': '500px', 'x': '80px'}}/>
                <SoundBar props = {{'color':'red', 'height': '200px', 'x': '110px'}}/>
                <SoundBar props = {{'color':'blue', 'height': '50px', 'x': '140px'}}/>
                <SoundBar props = {{'color':'red', 'height': '500px', 'x': '1700px'}}/>
            </span>
           
        )
      }
}

export default SoundBarsContainer