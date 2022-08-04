import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;

export const getFavoriteByUserId = async (id, jwt) => {

  let config = {
    method: 'get',
    url: `${baseUrl}/score/favorites/${id}`,
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
  };

  return await axios(config)
    .then((response) => response)
    .catch(function (error) {
      console.log(error);
      return error
    });
}