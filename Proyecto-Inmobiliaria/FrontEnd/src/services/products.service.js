import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;

export const getProductsFilteredByCategory = async (id) => {
   const endpoint = `${baseUrl}/product/category/${id}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const getProductsFilteredByCity = async (name) => {
   const endpoint = `${baseUrl}/product/city/${name}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const getProducts = async () => {
   const endpoint = `${baseUrl}/product/viewAll`;
   return await axios.get(endpoint)
      .then(response => response.data)
}
export const getProductById = async (id) => {
   const endpoint = `${baseUrl}/product/id/${id}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const findProductsByCategoryAndCity = async (id, name) => {
   const endpoint = `${baseUrl}/product/categoty/${id}/city/${name}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const findProductByDateAndCityAndCategory = async (id, name, startDate, endDate) => {
   const endpoint = `${baseUrl}/product/categoty/${id}/city/${name}/startDate/${startDate}/endDate/${endDate}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const findProductByDate = async (startDate, endDate) => {
   const endpoint = `${baseUrl}/product/startDate/${startDate}/endDate/${endDate}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const findProductByDateAndCity = async (name, startDate, endDate) => {
   const endpoint = `${baseUrl}/product/city/${name}/startDate/${startDate}/endDate/${endDate}`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

export const findfavourites = async () => {
   const endpoint = `${baseUrl}/myfavourites`;
   return await axios.get(endpoint)
      .then(response => response.data)
}

/* export const postProduct = async (data) => {
   let dataPost = JSON.stringify(data);

   let config = {
      method: 'post',
      url: `${baseUrl}/product/save`,
      data: dataPost
   };

   return await axios(config)
      .then((response) => response)
      .catch(function (error) {
         console.log(error);
         return error
      });
} */

/* export const postProduct = async (data) => {
  const endpoint = `${baseUrl}/product/save`;
  const post = JSON.stringify(data)
  console.log(post)
  return await axios.post(endpoint, post)
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((err) => {
      console.log(err)
      return err;
    });
    
}; */


export const postProduct = async (data) => {
  const endpoint = `${baseUrl}/product/save`
  const post = JSON.stringify(data)
  console.log(post)
  var config = {
    method: 'post',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data: post
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

