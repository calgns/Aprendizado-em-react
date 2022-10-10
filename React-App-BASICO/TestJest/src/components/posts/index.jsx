import { PostCard } from "../PostCard";
import P from "prop-types";
import "./styles.css";

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        title={post.title}
        cover={post.cover}
        body={post.body}
        key={post.id}
        id={post.id}
      />
    ))}
  </div>
);

Posts.defaultProps = { posts: [] };

Posts.propTypes = {
  posts: P.array,
};
