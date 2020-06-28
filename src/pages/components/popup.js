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
        this.popupCloseButton = this.popupCloseButton.bind(this)
        this.popupSaveButton = this.popupSaveButton.bind(this)
        this.reset = this.reset.bind(this)
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

    reset(){
        this.setState({
            loading: 'none',

        })
    }

    render() {
        if (this.props.reset && this.state.loading == 'loading'){
            this.reset()
        } else {
            var title = 'Save'
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
                if (this.props.popupState) {
                    popStyle = style.popupFadeOut
                    if (this.props.popupState == 'success'){
                        var titleDisplay = 'block'
                        title = 'Complete'
                        subtitle = "Added to Library"
                        subtitleDisplay = 'block'
                        loadingDisplay = 'none'
                        setTimeout(() => {
                            this.props.closeFunction()
                        }, 3000);
                    } else if (this.props.popupState == 'error'){
                        var titleDisplay = 'block'
                        title = 'Error'
                        subtitle = "Could not add to Library"
                        subtitleDisplay = 'block'
                        loadingDisplay = 'none'
                        setTimeout(() => {
                            this.props.closeFunction()
                        }, 3000);
                    } else {
                        title = 'Save'
                        subtitle = `Add this playlist to your ${this.state.serviceType} Library?`
                        popStyle = style.popup
                        buttonDisplay = 'inline-block'
                        titleDisplay = 'block'
                        subtitleDisplay = 'block'
                        loadingDisplay = 'none'
                    }
                }
            }
        }
        return (
            <div className={popStyle} style={{ display: this.props.display }}>
                <h1 className={style.popupTitle } style={{display:titleDisplay}}> {title} </h1>
                <h2 className={style.popupsubTitle } style={{display:subtitleDisplay}}> {subtitle} </h2>
                <img src={loadingGif} className={style.popupLoadingIndicator} style={{display:loadingDisplay}} />
                <button className={style.popupActionButton} onClick={this.popupCloseButton}  style={{display:buttonDisplay}} >Cancel</button>
                <button className={style.popupActionButton} onClick={this.popupSaveButton}  style={{display:buttonDisplay}} >Save</button>
            </div>
        )
    }
}

export default Popup;