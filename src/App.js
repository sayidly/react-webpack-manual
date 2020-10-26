import {hot} from "react-hot-loader/root";
import React, { Component} from "react";
import Table from './components/Table';
import Form from './components/Form';
import './App.scss';

class App extends Component {
  state = {
    characters: [],
  }

  removeCharacter = (index) => {
    const {characters} = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i != index
      }),
    })
  }

  handleSubmit = (character) => {
    this.setState({characters: [...this.state.characters, character]})
  }

  render(){
    const { characters } = this.state

    return(
      <div className="App">
        <h1> Hello, World!</h1>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default hot(App);
