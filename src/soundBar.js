import React from 'react';
import soundBar from './soundBar.module.css'

class SoundBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

    
        return (
    
          <div className ={soundBar.barFrame} style ={{height:'400px'}}>
              <div className ={soundBar.barFill} style = {{backgroundColor: 'red'}}/>
          </div>
        )
      }
}

export default SoundBar