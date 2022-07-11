import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;
let axios = require('axios');

export const findReservationsByUserId = async (id, jwt) => {

  let config = {
    method: 'get',
    url: `${baseUrl}/reservation/user/${id}`,
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
  };

  return await axios(config)
    .then((response) => response)
}

export const findReservationsById = async (id, jwt) => {

  let config = {
    method: 'get',
    url: `${baseUrl}/reservation/id/${id}`,
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

export const findAllReservations = async (jwt) => {

  let config = {
    method: 'get',
    url: `${baseUrl}/reservation/viewAll`,
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

export const deleteReservationById = async (id, jwt) => {

  let config = {
    method: 'delete',
    url: `${baseUrl}/reservation/delete/${id}`,
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
  };

  return await axios(config)
    .then((response) => console.log(response))
    .catch(function (error) {
      console.log(error);
      return error
    });
}

export const postReservation = async (data, jwt) => {
  let dataPost = JSON.stringify(data);

  let config = {
    method: 'post',
    url: `${baseUrl}/reservation/save`,
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