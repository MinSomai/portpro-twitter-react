import axios from "axios";

export default ({ requiresAuth = false } = {}) => {
  const options = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };

  const instance = axios.create(options);

  return instance;
};
