import { API } from "../../backend";

// FETCH ALL TOURNAMENTS
export const getTournaments = () => {
  return fetch(`${API}/tournaments`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// ENTER IN TOURNAMENT
export const enterInTournament = (contestId, token, user) => {
  return fetch(`${API}/tournament/enter/${contestId}/${user._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// FETCH A SPECIFIC TOURNAMENT
export const getATournament = (contestId) => {
  return fetch(`${API}/tournaments/${contestId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// FETCH ONLY USER CREATED TOURNAMENTS
export const getCreatedTournaments = (userId) => {
  return fetch(`${API}/tournaments/created/${userId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// FETCH ONLY USER PARTICIPATED TOURNAMENTS
export const getParticipatedTournaments = (userId) => {
  return fetch(`${API}/tournaments/participated/${userId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// GET ALL USERS
export const getAllUser = (token) => {
  return fetch(`${API}/users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
