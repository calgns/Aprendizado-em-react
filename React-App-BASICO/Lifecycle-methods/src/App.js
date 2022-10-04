// import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    counter: 0,
    posts: [{id: 1,title: "O titulo 1",body: "O corpo 1",}, {id: 2,title: "O titulo 2",body: "O corpo 2",}, {id: 3,title: "O titulo 3",body: "O corpo 3",},],
  };

  timeoutUpdate = null;

  componentDidMount() {// loga assim que a pagina carregar
    this.handleTimeout();
  }

  componentDidUpdate(){
    this.handleTimeout();
  }
  
  componentWillUnmount(){
    clearTimeout(this.timeoutUpdate);

  }

  handleTimeout() {// loga assim que a pagina carregar
    const { posts, counter } = this.state;
    posts[0].title = 'O titulo mudou';

    this.timeoutUpdate = setTimeout(() => {
      this.setState({posts, counter: counter + 1})
      // this.setState({posts: [ { id: 1, title: "O titulo 1", body: "O corpo 1" }, { id: 2, title: "O titulo 2", body: "O corpo 2" }, { id: 3, title: "O titulo 3", body: "O corpo 3" },],})
    }, 1);

    console.log("OIa!");
  }

  render() {
    const { posts, counter } = this.state;

    return (
      <div className="App">
        <h3>{counter}</h3>
        {posts.map((post) => (
          // <h1 key={post.id}>{post.title}</h1>
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
