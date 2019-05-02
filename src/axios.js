import axios from "axios";

var instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "Auth Token";
instance.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
instance.interceptors.request.use(
  request => {
    console.log("Request: ", request);
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    console.log("Response: ", response);
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
