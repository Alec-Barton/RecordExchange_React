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
        return (
            <div className ={style.headerContainer} onClick = {this.tapped} onMouseEnter= {this.hoverBegan} onMouseLeave = {this.hoverEnded}>
                <img src ={Logo} className = {style.headerLogo}/>
                <span className={style.headerTitle}>
                    <span style = {{fontSize:"30pt"}}>R</span>
                    <span style = {{fontSize:"25pt"}}>ECORD</span>
                    <span style = {{fontSize:"30pt", paddingLeft: "25px"}}>E</span>
                    <span style = {{fontSize:"25pt"}}>XCHANGE</span>
                </span>
            </div>
        )
    }
}

export default Header

