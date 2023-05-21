import { BASE_URL } from "./baseUrl";
import axios from "axios";

//get all authors
export const getAllAuthors = async (name) => {
  let globalData;
  let URL;
  if (!name) {
    URL = BASE_URL + "/authors";
  } else {
    URL = BASE_URL + `/authors?name=${name}`;
  }
  await axios.get(URL).then((res) => (globalData = res.data));
  return globalData;
};

//get by ID
export const getAuthorbyID = async (id) => {
  let globalData;
  await axios
    .get(`${BASE_URL}/authors/${id}`)
    .then((res) => (globalData = res.data));
  return globalData;
};

//delete by ID
export const deleteAuthorbyID = (id) => {
  axios.delete(`${BASE_URL}/authors/${id}`);
};

//edit by ID
export const editAuthorbyID = (id, payload) => {
  axios.put(`${BASE_URL}/authors/${id}`, payload);
};

//add by ID
export const addAuthor = (payload) => {
  axios.post(`${BASE_URL}/authors`, payload);
};
