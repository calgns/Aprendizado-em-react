import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  // public class fields / class fields elimina constructor
  handlepClick = this.handlepClick.bind(this); // react não faz binding, this;
  state = { name: "Luiz Otávio", counter: 0 };

  // constructor(props) {
  //   super(props);
  //   this.handlepClick = this.handlepClick.bind(this); // react não faz binding, this;
  //   this.state = { name: "Luiz Otávio", counter: 0 };
  // }

  handlepClick() {
    this.setState({ name: "Jinui" });
    const { name } = this.state;
    console.log(`<p> Clicado ${name}`);
  }

  handleAClick = (event) => {
    //  para não fazer binding você usa arrow functions
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    // const name = this.state.name;
    const { name, counter } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p
            onClick={
              this.handlepClick
              // _=>{
              // console.log("xdtcyfvgubhinjmk",_ );
              // const colors = ["red", "green", "blue", "pink", "purple", "orange", "yellow", "wheat", "white", "#197022"]
              // const outOfTen = Math.round(Math.random()*10);
              // _.target.style.color = colors[outOfTen];
            }
          >
            Qualquer Coisa rudimentar: {name} {counter}
          </p>
          <a
            onClick={this.handleAClick}
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
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
*/
export default App;
