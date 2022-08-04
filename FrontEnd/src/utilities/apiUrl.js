import axios from "axios";

const apiUrl = {
  urlBaseLocal:"http://localhost:8080",
  urlBaseAws:"http://localhost:8080"
}

/* http://localhost:8080 */
/* http://g8c10621proyecto-env.eba-ysawz8yd.us-west-1.elasticbeanstalk.com */

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    
  }
})

export default apiUrl;