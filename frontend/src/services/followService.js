import axios from "axios";

class followService {
  constructor() {
    this.follow = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  followUser(followed, follower) {
    return this.follow
      .get(`/follow/${followed}/${follower}/follow`)
      .then(({ data }) => data);
  }
  getFollowersUser(followed) {
    return this.follow
      .get(`/follow/${followed}/getUsers`)
      .then(({ data }) => data);
  }
  getFollowing(follower) {
    return this.follow
      .get(`/follow/${follower}/getFollowing`)
      .then(({ data }) => data);
  }
}

const followServices = new followService();

export default followServices;
