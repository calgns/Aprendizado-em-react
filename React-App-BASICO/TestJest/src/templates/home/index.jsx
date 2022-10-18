import "./Home.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts";
import { LoadMoreBtn } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { useCallback, useEffect, useState } from "react";

export const Home = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // const [postsPerPage, setPostsPerPage] = useState(11);
  const [postsPerPage] = useState(11);

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : posts;
  // console.log(filteredPosts);

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleString("pt-br"), new Date());
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);

    // console.log(`PAGE: ${page}, POSTS:`, posts, `ALLPOSTS:`, allPosts,`POSTSPERPAGE: ${postsPerPage},NEXTPAGE: ${nextPage}, NEXTOFNEXTPAGE:${nextPage + postsPerPage}`);
    // console.log("load more posts called...");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="section-container">
      <div className="in">
        {!!searchValue && (
          <h1>
            Search: <br /> {searchValue}
          </h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      <div className="search-container">
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <h6>Search not found.</h6>}
      </div>

      <div className="more-container">
        {!searchValue && (
          <LoadMoreBtn
            isDisabled={noMorePosts}
            text="Load More"
            onClicky={loadMorePosts}
          />
        )}
      </div>
    </section>
  );
};
