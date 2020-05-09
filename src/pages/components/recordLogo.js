import React from 'react';
import LogoFilter from '../assets/logoFilter.png';
import style from '../css/style.module.css'

class RecordLogo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className ={style.recordLogoContainer}>
                <span className ={style.recordLogoBackground} style = {{backgroundColor: this.props.color}}/>
                <img src = {LogoFilter} className = {style.recordLogoFilter}  />
            </span>
        )
    }
}

export default RecordLogo