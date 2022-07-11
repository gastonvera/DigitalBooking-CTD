import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;
let axios = require('axios');

export const postMessage = async (data, jwt) => {
  let dataPost = JSON.stringify(data);

  let config = {
    method: 'post',
    url: `${baseUrl}/message/save`,
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    data: dataPost
  };

  return await axios(config)
    .then((response) => response)
    .catch(function (error) {
      console.log(error);
      return error
    });
}