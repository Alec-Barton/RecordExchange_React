import React from 'react';
import soundBar from './soundBar.module.css'

class SoundBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            color: props.props.color,
            height: props.props.height
        }
        console.log(this.state)
    }

    render() {

    
        return (
    
          <span className ={soundBar.barFrame} style ={{height:this.state.height}}>
              <span className ={soundBar.barFill} style = {{backgroundColor:this.state.color}}/>
          </span>
        )
      }
}

export default SoundBar