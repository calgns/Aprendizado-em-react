// import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }
  
  // fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json()).then(posts => this.setState({posts}))

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson =  await posts.json();
    const photosJson =  await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    });

    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;

    return (
      <section>
        <div className="posts">
          {posts.map((post) => (
            // <h1 key={post.id}>{post.title}</h1>
            <div className="post">
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className="post-card">
                <h1>{post.title}</h1>
                <hr/>
                <p>{post.body}</p>
              </div>
            </div>))}
        </div>
      </section>
    );
  }
}

export default App;
