import React from 'react';
import style from '../css/style.module.css'


class SharePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
        };
        this.popupCopyButton = this.popupCopyButton.bind(this)
        this.popupCloseButton = this.popupCloseButton.bind(this)
    }

    componentDidMount() {
        window.addEventListener("click", this.handleMouseClick);
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.handleMouseClick);
    }


    popupCopyButton(){

        // this.setState({
        //     close: true
        // }, ()=>{

        //     setTimeout(()=>{ 
        //         this.setState({
        //             close: false
        //         })
        //     }, 500);
        // })
    }

    popupCloseButton(){

        // this.setState({
        //     close: true,
        //     display: 'none'
        // }, ()=>{

            // setTimeout(()=>{ 
            //     this.setState({
            //         close: false
            //     })
            // }, 2000);
        // })
        this.props.closeFunction()
    }

    render() {
        // console.log("aaa", this.props.display)
        // var display = this.props.display
        // if (this.state.close){
        //     display = 'none'
        //     // this.props.display = 'none'
        // }
        // } else {
        //     var display = this.state.display
        // }
        return (
            <div className = {style.popup} style ={{display:this.props.display}}>
                <button className={ style.popupCloseButton} onClick={this.popupCloseButton}>X</button>
                <h1 className = {style.popupTitle}> Copy & Share Link</h1>

                <textarea disabled className = {style.popupTextArea}>
                {this.props.url}
                </textarea>
                <button className={ style.popupCopyButton} onClick={this.popupCopyButton}>Copy</button>
            </div>  
        )
    }
}

export default SharePopup;