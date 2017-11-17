/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQBe0ST5RIdXRiHuIRcUrc7YLaRtVMPeGTUo2vtoqG-N2q2kG6rA0eTGKEFawYgDZepcJlHuDg7m8zwZVBPf2e_x7GVIQdXsLqFAxDmjfB1LbfhGiRFNx959497kqwvt7G95i3-BiipbHbiJzV9YN0-28Q';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      songsLoaded : false,
      tracks : null,
      id : 0
    };
  }


  componentDidMount(){
    /* Get songs from spotify */
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(this.setState({
                      text : "Let's get schwifty!",
                      songsLoaded : true,
                      tracks : data['items'],
                      currentTrack : data['items'][getRandomNumber(20)].track
                    }), data)
      })

      setTimeout(() => this.switchTrack(), 30000)
  }

  checkAnswer(id){
    if (id === this.state.currentTrack.id){
      swal('Bravo', '', 'success').then(this.switchTrack());
    }

    else {
      swal ('Faux! ', '', 'error')
    }
  }

  switchTrack(){
    this.setState({currentTrack : this.state.tracks[getRandomNumber(20)].track})
  }


  render() {
    if (this.state.songsLoaded) {
      var currentTrack = this.state.currentTrack
      var track2 = this.state.tracks[getRandomNumber(20)].track
      var track3 = this.state.tracks[getRandomNumber(20)].track

      var arr = [currentTrack, track2, track3]
      arr = shuffleArray(arr)

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to blindtest -burp- Morty</h1>
          </header>
          <p>{this.state.text}</p>
          <p>We can play with {this.state.tracks.length} tracks!</p>
            <div className="App-images">
              <AlbumCover track = {this.state.currentTrack}/>
              <Sound url={this.state.currentTrack.preview_url} playStatus={Sound.status.PLAYING}/>
            </div>
        <div className="App-buttons">
          <Button onClick={() => this.checkAnswer(arr[0].id)}> {arr[0].name}</Button>
          <Button onClick={() => this.checkAnswer(arr[1].id)}> {arr[1].name}</Button>
          <Button onClick={() => this.checkAnswer(arr[2].id)}> {arr[2].name}</Button>
        </div>
      </div>
      )
    } else {
        return(
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to blindtest -burp- Morty</h1>
            </header>
              <div className="App-images">
                <img src={loading} className="App-loading" alt="loading"/>
              </div>
          <div className="App-buttons">
          </div>
        </div>
      );
    }
  }
}

class AlbumCover extends Component {
  render(track = this.props.track) {
     /* recueprer le parametre passe en argumetn dans la balise*/
     const alt = 'Album cover for ' +track.album.name;
    const src = track.album.images[0].url; // A changer ;)
    return (<img src={src} alt ={alt} style={{ width: 400, height: 400 }} />);
  }
}

export default App;
