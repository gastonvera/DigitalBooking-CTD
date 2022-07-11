import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";
import { api } from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;

export const postUser = async (data) => {
  const endpoint = `${baseUrl}/auth/register`;
  const post = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  };
  return await axios
    .post(endpoint, post)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserByEmail = async (data) => {
  const endpoint = `${baseUrl}/auth/register`;
  return await axios
    .get(endpoint)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const loginUser = async ({ email, password }) => {
  const endpoint = `${baseUrl}/auth/login`;
  const post = {
    email: email,
    password: password,
  };

  try {
    const res = await axios
      .post(endpoint, post);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getFavsById = async (userId, jwt) => {
  const endpoint = `${baseUrl}/score/favorites/${userId}`;

  const config = {
    method: "get",
    url: `${endpoint}`,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }
  };

   return axios(config)
    .then((response) => {
      return response.data})
};
