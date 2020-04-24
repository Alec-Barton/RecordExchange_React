import React from 'react';
import style from '../css/style.module.css'


class SharePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
        };
        this.popupCopyButton = this.popupCopyButton.bind(this)
    }

    popupCopyButton(){
        this.setState({
            close: true
        }, ()=>{

            setTimeout(()=>{ 
                this.setState({
                    close: false
                })
            }, 500);
        })
    }

    render() {
        var display = this.props.display
        if (this.state.close){
            display = 'none'
        }
        return (
            <div className = {style.popup} style ={{display:display}}>
                <button className={ style.popupCloseButton} onClick={this.popupCopyButton}>X</button>
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