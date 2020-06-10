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

    popupCopyButton() {
        navigator.clipboard.writeText(this.props.url)
        this.setState({
            copied: true
        })
        setTimeout(() => {
            this.props.closeFunction()
            this.setState({
                copied: false
            })
        }, 2000);
    }

    popupCloseButton() {
        this.props.closeFunction()
    }

    render() {
        var popStyle = style.popup
        var infoDipsplay = 'inline-block'
        var textDipsplay = 'none'
        if (this.state.copied) {
            popStyle = style.popupFadeOut
            var infoDipsplay = 'none'
            var textDipsplay = 'inline-block'
        }
        return (
            <div className={popStyle} style={{ display: this.props.display }}>
                {/* <button className={style.popupCloseButton} onClick={this.popupCloseButton} style ={{display:infoDipsplay}} >X</button> */}
                <h1 className={style.popupTitle } style={{display:infoDipsplay}}> Copy & Share Link</h1>

                <textarea disabled className={style.popupTextArea} rows="1" style ={{display:infoDipsplay}}>
                    {this.props.url}
                </textarea>
                <button className={style.popupActionButton} onClick={this.popupCloseButton}  style={{display:infoDipsplay}} >Cancel</button>
                <button className={style.popupActionButton} onClick={this.popupCopyButton} style ={{display:infoDipsplay}}>Copy Link</button>
                <h1 className = {style.popupCopied} style ={{display:textDipsplay}}> Copied </h1>
            </div>
        )
    }
}

export default SharePopup;