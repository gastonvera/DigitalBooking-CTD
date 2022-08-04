import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";

var config = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
const baseUrl = apiUrl.urlBaseAws;

const getCategories = async () => {
  const endpoint = `${baseUrl}/category/viewAll`;
  return await axios.get(endpoint, config)
    .then(response => response.data)
};

export default getCategories;