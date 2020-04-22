import fetch from "isomorphic-fetch";
import { API } from "../config";
import { isAuth,handleResponse } from "./auth";


export const userPublicProfile = username => {
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      handleResponse(response)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getProfile = token => {
  return fetch(`${API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      handleResponse(response)
      return response.json();
    })
    .catch(err => console.log(err));
};

export const update = (token, user) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    //the form data
    body: user
  })
  
    .then(response => {
      handleResponse(response)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const follow = (userId, token, followId) => {
  return fetch(`${API}/user/follow`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, followId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
  return fetch(`${API}/user/unfollow`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, unfollowId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};