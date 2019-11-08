import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:5000/serve-my-customer/us-central1/',
  baseURL: 'https://us-central1-serve-my-customer.cloudfunctions.net/',
  /* other custom settings */
});
