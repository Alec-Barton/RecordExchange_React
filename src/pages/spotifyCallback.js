import React from 'react';
// import { db } from '../firebase.js';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import style from './style.module.css'
// import TrackItem from './trackItem'
// import axios from 'axios';
// import appleLogo from './apple.png'
import queryString from 'query-string';

class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      console.log(window.location.hash)
    let parsed = queryString.parse(window.location.hash)
    console.log(parsed.access_token)
  }


  render() {
    return (
       <div>
           Callback
       </div>
    );
  }

}

export default PlaylistPage;
