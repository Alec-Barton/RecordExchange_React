import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class SpotifyCallbackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let playlistData = localStorage.getItem('playlistData')
    let parsed = queryString.parse(window.location.hash)
    console.log(parsed.access_token)
    let tokenType = "Bearer "
    let accessToken = tokenType.concat(parsed.access_token)
    let headerData = {
      authorizationCode: accessToken,
      playlistData: playlistData,
      'Content-Type': 'application/json',
    }
    axios.post('https://us-central1-the-record-exchange.cloudfunctions.net/test', headerData)
      .then((response) => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        Callback
      </div>
    );
  }

}

export default SpotifyCallbackPage;
