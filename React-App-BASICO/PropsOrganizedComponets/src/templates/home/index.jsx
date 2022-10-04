// import logo from "./logo.svg";
import "./Home.css";
import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts";
import { MoreBtn } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 11,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  
  // fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json()).then(posts => this.setState({posts}))

  loadPosts = async () => {
    const { page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    
    });
  }

  loadMorePosts = () => {
    const { page, posts, allPosts, postsPerPage } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });

    // console.log(`PAGE: ${page}, POSTS:`, posts, `ALLPOSTS:`, allPosts,`POSTSPERPAGE: ${postsPerPage},NEXTPAGE: ${nextPage}, NEXTOFNEXTPAGE:${nextPage + postsPerPage}`);
    // console.log("load more posts called...");
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }


  render() {
    const { page, posts, allPosts, searchValue, postsPerPage  } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;


    return (
      <section className="section-container">
        <div className="in">
          {!!searchValue && (<h1>Search: <br/> {searchValue}</h1>)} 
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        <div className="search-container">
          {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
          {filteredPosts.length === 0 && (<h6>Search not found.</h6>)}
        </div>
        
        <div className="more-container">
          {!searchValue && (<MoreBtn isD={noMorePosts} text="Load More" oC={this.loadMorePosts}/>)}
        </div>
      </section>
    );
  }
}

