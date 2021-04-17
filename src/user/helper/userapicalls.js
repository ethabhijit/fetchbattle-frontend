import { API } from "../../backend";

// Get a user
export const getAUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//category calls
export const createTournament = (userId, token, tournament) => {
  return fetch(`${API}/tournament/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tournament)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Update user payment details 
export const updatePaymentDetails = (userId, token, paymentDetails) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentDetails)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// Put message to tournament
export const pushMessageToUser = (userId, token, contestId, message) => {
  return fetch(`${API}/tournament/room/${contestId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(message)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// Finish the tournament
export const finishTournament = (contestId, userId, token, data) => {
  return fetch(`${API}/tournament/finish/${contestId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};