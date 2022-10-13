import "./styles.css";
import P from "prop-types";

export const PostCard = ({ title, body, id, cover }) => (
  <div className="post-card">
    <img src={cover} alt={title} />

    <div className="card-text">
      {/* <h2>{title} && {id}</h2> */}
      <h2>
        {title} {id}
      </h2>
      <hr />
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  body: P.string.isRequired,
  cover: P.string.isRequired,
  id: P.number.isRequired,
};

// const {post} = props;
// <h1 key={post.id}>{post.title}</h1>
