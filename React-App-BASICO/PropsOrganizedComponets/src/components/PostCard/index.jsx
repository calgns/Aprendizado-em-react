import './styles.css';

export const PostCard = ({title, body, id, cover}) => (
  <div className="post-card">
    <img src={cover} alt={title} />
    
    <div className="card-text">
      <h2>{title} && {id}</h2>
      <hr/>
      <p>{body}</p>
    </div>
  </div>
);
    
// const {post} = props;
// <h1 key={post.id}>{post.title}</h1>