import P from 'prop-types';
import './App.css';
import React, { useState, useEffect, useMemo } from 'react';

const Post = ({ post }) => {
  console.log('Fi renderizo!');
  return (
    <div key={post.id} className="post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  console.log(' Renderizou pa');

  // componentDidMount
  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((r) => r.json())
        .then((r) => setPosts(r));
    }, 5000);
  }, []);

  return (
    <div className="App-header">
      <p>
        <input type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      </p>
      {useMemo(() => {
        return posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} />);
      }, [posts])}

      {posts.length <= 0 && <div className="spinner"></div>}
    </div>
  );
}

export default App;
