import axios from "axios";

class postService {
  constructor() {
    this.post = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  listAllPost() {
    return this.post.get("/post/all").then(({ data }) => data);
  }
  createPost(username, text, university) {
    return this.post
      .post(`/post/${username}/new`, { text, university })
      .then(({ data }) => data);
  }
  createLike(postId, username) {
    return this.post
      .get(`/post/${postId}/${username}/like`)
      .then(({ data }) => data);
  }
  createUnlike(postId, username) {
    return this.post
      .get(`/post/${postId}/${username}/unlike`)
      .then(({ data }) => data);
  }
  postDetail(postId) {
    return this.post.get(`/post/detail/${postId}`).then(({ data }) => data);
  }
}

const postServices = new postService();

export default postServices;
