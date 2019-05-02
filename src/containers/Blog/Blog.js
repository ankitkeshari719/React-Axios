import React, { Component } from "react";
import axios from "../../axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    error: false,
    selectedPostId: null
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        if (response.status === 200) {
          const posts = response.data.slice(0, 6);
          const updatedPost = posts.map(post => {
            return { ...post, author: "Ankit" };
          });
          this.setState({ posts: updatedPost });
        }
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  // Function to handle the post click
  selectedPostHandler(postId) {
    this.setState({ selectedPostId: postId });
  }

  render() {
    let posts = this.state.error ? (
      <p style={{ textAlign: "center" }}> Somethings went wrong! </p>
    ) : (
      this.state.posts.map(post => (
        <Post
          key={post.id}
          post={post}
          clickPost={() => this.selectedPostHandler(post.id)}
        />
      ))
    );
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
