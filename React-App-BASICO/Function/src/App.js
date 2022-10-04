import logo from "./logo.svg";
import "./App.css";
// import { Component } from "react";

function App() {
  const colors = ["red", "green", "blue", "pink", "purple", "orange", "yellow", "wheat", "white", "#197022",];
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          onClick={_ => {
            const outOfTen = Math.round(Math.random() * 10);
            console.log(outOfTen, _);
            _.target.style.color = colors[outOfTen];
          }}
        >
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
