import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://algoarena-b2np.onrender.com', // Backend URL
});

export default instance;
