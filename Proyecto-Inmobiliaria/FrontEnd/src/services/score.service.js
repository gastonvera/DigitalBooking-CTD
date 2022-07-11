import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;

export const postFav = async ( userId, productId, jwt ) => {
  return fetch(`${baseUrl}/score/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      product: {
        id: productId,
      },
      favorite: true,
      user: {
        id: userId,
      },
    }),
  })
    .then((res) => {
      console.log(res);
      if(res.status === 401) return console.log("no estas autorizado"); 
      return res.json();
    })
    .then((res) => {
      
      return res;
    });
};

export const updateFav = async ( favId, jwt ) => {
  return fetch(`${baseUrl}/score/update`, {
    method: "Put",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      id: favId,
      favorite: false
    }),
  })
    .then((res) => {
      console.log(res);
      if(res.status === 401) return console.log("no estas autorizado"); 
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export const giveScore = async (score, userId, productId, jwt ) => {
  return fetch(`${baseUrl}/score/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: {
        id: productId,
      },
      score: score,
      user: {
        id: userId,
      },
    }),
  })
    .then((res) => {
      console.log(res);
      if(res.status === 401) return console.log("no estas autorizado"); 
      return res.json();
    })
    .then((res) => {

      return res;
    });
};