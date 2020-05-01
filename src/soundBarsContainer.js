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
                <SoundBar props = {{'color':'red', 'height': '100px'}}/>
                <SoundBar props = {{'color':'red', 'height': '400px'}}/>
                <SoundBar props = {{'color':'red', 'height': '500px'}}/>
                <SoundBar props = {{'color':'red', 'height': '200px'}}/>
                <SoundBar props = {{'color':'blue', 'height': '50px'}}/>
                <SoundBar props = {{'color':'red', 'height': '500px'}}/>
            </span>
           
        )
      }
}

export default SoundBarsContainer