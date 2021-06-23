import {hot} from "react-hot-loader/root";
import React from "react";
import Time from './components/Time';
import './App.scss';

const App = () => {
  return(
    <div className="App">
      <h1>Hello, World!</h1>
      <h2><Time /></h2>
    </div>
  )
}

export default hot(App);
