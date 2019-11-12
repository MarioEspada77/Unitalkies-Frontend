import axios from 'axios';

class profileService  {
    constructor() {
        this.profile = axios.create({
          baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
          withCredentials: true
        })
      }

    listUserProfile(username){
        return this.profile.get(`/profile/${username}`)
        .then(({ data }) => data);
    }
}

const profileServices = new profileService();

export default profileServices;