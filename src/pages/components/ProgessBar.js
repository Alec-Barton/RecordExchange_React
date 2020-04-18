import React from 'react';
import progressBar from '../css/progressBar.module.css'


class ProgressBarItem extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      percentage: 0
    }
    
  }
  
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
        <Filler percentage={props.percentage} color = {props.color}/>
      </div>
    )
}

const Filler = (props) => {
  return (
        <div className={progressBar.filler} style={{ width: `${props.percentage}%`, backgroundColor: `${props.color}` }} >
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
