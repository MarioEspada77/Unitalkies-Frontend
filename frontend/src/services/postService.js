import axios from 'axios';

class postService  {
    constructor() {
        this.auth = axios.create({
          baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
          withCredentials: true
        })
      }

    listAllPost(){
        return this.auth.post('/post/all')
        .then(({ data }) => data);
    }
}