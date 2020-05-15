import React from 'react';
import style from '../css/style.module.css'
import loadingGif from '../assets/loading.gif'


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           loading: 'none',
           serviceType: this.props.serviceType
        };
        this.popupCopyButton = this.popupCopyButton.bind(this)
        this.popupCloseButton = this.popupCloseButton.bind(this)
        this.popupSaveButton = this.popupSaveButton.bind(this)
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
        }, 1000);
    }

    popupCloseButton() {
        this.props.closeFunction()
    }

    popupSaveButton() {
       this.setState({
           loading: 'loading'
       })
       this.props.actionFunction()
    }



    render() {
        var subtitle = `Add this playlist to your ${this.state.serviceType} Library?`
        var popStyle = style.popup
        var buttonDisplay = 'inline-block'
        var titleDisplay = 'block'
        var subtitleDisplay = 'block'
        var loadingDisplay = 'none'
        if (this.state.loading == 'loading') {
            var buttonDisplay = 'none'
            var loadingDisplay = 'block'
            var subtitleDisplay = 'none'
        }

        if (this.props.popupState && this.state.isClosing) {
            if (this.props.popupState == 'success'){
                var titleDisplay = 'none'
                subtitle = "Added to Library"
                subtitleDisplay = 'block'
                loadingDisplay = 'none'
                console.log('1')
                setTimeout(() => {
                    console.log('2')
                    this.props.closeFunction()
                }, 5000);
            } else if (this.props.popupState == 'error'){
                var titleDisplay = 'none'
                subtitle = "Error - Could not add to Library"
                subtitleDisplay = 'block'
                loadingDisplay = 'none'
                setTimeout(() => {
                    this.props.closeFunction()
                }, 5000);
            }
        }
        return (
            <div className={popStyle} style={{ display: this.props.display }}>
                <h1 className={style.popupTitle } style={{display:titleDisplay}}> Save </h1>
                <h2 className={style.popupsubTitle } style={{display:subtitleDisplay}}> {subtitle} </h2>
                <img src={loadingGif} className={style.popupLoadingIndicator} style={{display:loadingDisplay}} />
                <button className={style.popupActionButton} onClick={this.popupCloseButton}  style={{display:buttonDisplay}} >Cancel</button>
                <button className={style.popupActionButton} onClick={this.popupSaveButton}  style={{display:buttonDisplay}} >Save Playlist</button>
            </div>
        )
    }
}

export default Popup;