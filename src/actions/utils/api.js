import axios from 'axios';

const apiInstance = token => {
  return axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default apiInstance;
