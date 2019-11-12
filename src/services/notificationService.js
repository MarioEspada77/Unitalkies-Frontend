import axios from "axios";

class notificationService {
  constructor() {
    this.notifications = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllNotifications() {
    return this.notifications
      .get(`/notifications/all`)
      .then(({ data }) => data);
  }
}

const notificationServices = new notificationService();

export default notificationServices;
