import React from 'react';
import style from '../css/style.module.css'


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           serviceType: 'Spotify'
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
        var infoDipsplay = 'block'
        if (this.state.copied) {
            popStyle = style.popupFadeOut
            var infoDipsplay = 'none'
        }
        return (
            <div className={popStyle} style={{ display: this.props.display }}>
                <button className={style.popupCloseButton} onClick={this.popupCloseButton} style ={{display:infoDipsplay}} >X</button>
                <h1 className={style.popupTitle } style={{display:infoDipsplay}}> Save </h1>
                <h2 className={style.popupsubTitle } style={{display:infoDipsplay}}> Add this playlist to your {this.state.serviceType} Library? </h2>

                <button className={style.popupActionButton} onClick={this.popupCopyButton} >Cancel</button>
                <button className={style.popupActionButton} onClick={this.popupCopyButton} >Save Playlist</button>
            </div>
        )
    }
}

export default Popup;