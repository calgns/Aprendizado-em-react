import { Component } from "react";
import "./App.css";

export class App extends Component {
  state = {
    counter: 0,
  }

  handleClick = () => {
    this.setState((prevState, prevProps) => { 
      console.log("PREV", prevState.counter);
      return { counter: prevState.counter + prevProps.numProp } },
      () => {console.log('POST', this.state.counter)}
    // this.setState({counter: this.state.counter + 1},()=>{console.log(this.state.counter)}
      );
    // console.log(this.state.counter);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.counter}</h1>
          <button onClick={this.handleClick}>Acréscimo</button>
        </header>
      </div>
    );
  }
}

