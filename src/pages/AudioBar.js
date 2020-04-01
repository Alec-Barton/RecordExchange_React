import React from 'react';
import style from './AudioBar.module.css'


class AudioBarContainer extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        percentage: 50
      }
      
    }
    
    
    render() {
      return (
        <div>
          
         

          <AudioBar percentage={this.state.percentage} maxHeight = {100}/>

          <AudioBar percentage={this.state.percentage} maxHeight = {100}/>

          <AudioBar percentage={this.state.percentage} maxHeight = {100}/>
          <AudioBar percentage={this.state.percentage} maxHeight = {150}/>
  
        </div>
      )
    }  
  }
  
  const AudioBar = (props) => {
    return (
        <div className={style.audioBar} >
          {/* <label>{props.percentage}</label> */}
          <Filler percentage={props.percentage} />
        </div>
      )
  }
  
  const Filler = (props) => {
    return (
        //, marginTop: `${(props.maxHeight * (props.percentage / 100)/2)}px`
        //
            <div className={style.filler} style={{ heigth: `${props.percentage}%`}} ></div>
        //   <div className={style.filler} style={{ height: `${(props.percentage/100) * props.maxHeight}px`}} >
        //   </div>
      )
  }
  
  // ReactDOM.render(
  //   <ProgressBarExample />,
  //   document.querySelector('#app')
  // )
  
  export default AudioBarContainer
