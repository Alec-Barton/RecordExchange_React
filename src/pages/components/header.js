import React from 'react';
import Logo from '../assets/logo.png';
import style from '../css/style.module.css'
import history from '../../managers/historyManager.js';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.tapped = this.tapped.bind(this)
    }

    tapped(){
        history.push({
            pathname: '/'
        })
        window.location.reload(false)
    }

    render() {
        var fontColor = "#707070";
        if (this.props.color != undefined){
            fontColor = this.props.color
            console.log("piss")
        }
        return (
            <div className ={style.headerContainer} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                <img src ={Logo} className = {style.headerLogo}/>
                <span className={style.headerTitle} style = {{color: fontColor}}>
                    <span style = {{fontSize:"30pt", color: fontColor}}>R</span>
                    <span style = {{fontSize:"25pt", color: fontColor}}>ECORD</span>
                    <span style = {{fontSize:"30pt", paddingLeft: "25px", color: fontColor}}>E</span>
                    <span style = {{fontSize:"25pt", color: fontColor}}>XCHANGE</span>
                </span>
            </div>
        )
    }
}

export default Header

