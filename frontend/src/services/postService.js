import axios from 'axios';

class postService  {
    constructor() {
        this.post = axios.create({
          baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
          withCredentials: true
        })
      }

    listAllPost(){
        return this.post.get('/post/all')
        .then(({ data }) => data);
    }
    createPost(username, text){

      return this.post.post(`/post/${username}/new`, { text }  )
      .then(({ data }) => data);
    }
    createLike(postId, username){
      return this.post.get(`/post/${postId}/${username}/like`)
      .then(({ data }) => data);
    }
}

const postServices = new postService();

export default postServices;