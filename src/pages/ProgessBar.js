import React from 'react';
import progressBar from './progressBar.module.css'


class ProgressBarItem extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      percentage: 0
    }
    
    // this.nextStep = this.nextStep.bind(this)
  }
  
  // nextStep() {
  //   if(this.state.percentage === 100) return 
  //   this.setState(prevState => ({ percentage: prevState.percentage + 20 }))
  // }
  
  render() {
    return (
      <div>
        
       
        <ProgressBar percentage={this.state.percentage} />

      </div>
    )
  }  
}

const ProgressBar = (props) => {
  return (
      <div className={progressBar.progressBar} style ={{visibility: `${props.visibility}`}}>
        {/* <label>{props.percentage}</label> */}
        <Filler percentage={props.percentage} />
      </div>
    )
}

const Filler = (props) => {
  return (
        <div className={progressBar.filler} style={{ width: `${props.percentage}%` }} >
            <h5 className={progressBar.progressLabel} style={{ width: `${props.percentage}%` }}>
                {props.percentage}%

            </h5>
        </div>
    )
}

// ReactDOM.render(
//   <ProgressBarExample />,
//   document.querySelector('#app')
// )

export default ProgressBar
