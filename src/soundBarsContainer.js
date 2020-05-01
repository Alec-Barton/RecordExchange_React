import React from 'react';
import soundBar from './soundBar.module.css'
import SoundBar from './soundBar.js'


class SoundBarsContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            color: props.props.color,
            height: props.props.height
        }
    }

    render() {

    
        return (
    
          <div className ={soundBar.barFrame} style ={{height:'400px'}}>
              <div className ={soundBar.barFill} style = {{backgroundColor: 'red'}}/>
          </div>
        )
      }
}

export default SoundBarsContainer