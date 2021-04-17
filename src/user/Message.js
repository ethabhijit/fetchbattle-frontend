import React, { useState } from "react";
import {} from "react-router-dom";
import { pushMessageToUser } from "./helper/userapicalls";

const Message = ({ userId, contestId, token }) => {
  const [values, setValues] = useState({
    room_id: "",
    room_password: "",
    error: "",
  });

  const { room_id, room_password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    pushMessageToUser(userId, token, contestId, { room_id, room_password })
      .then((data) => {
        alert("Message send succesfully");
        window.location.href = window.location.href;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div class="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Room ID"
          onChange={handleChange("room_id")}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Room Password"
          onChange={handleChange("room_password")}
        />
        <div class="input-group-append">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
