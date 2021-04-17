import React, { useState } from "react";
import {} from "react-router-dom";
import { finishTournament } from "./helper/userapicalls";

const FinishTournament = ({ userId, contestId, token, participants }) => {
  const [values, setValues] = useState({
    first_winner: participants[0]._id,
    second_winner: participants[1]._id,
    third_winner: participants[2]._id,
    error: "",
  });

  const { first_winner, second_winner, third_winner } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    finishTournament(contestId, userId, token, {
      first_winner,
      second_winner,
      third_winner,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div class="input-group mb-3">
        <span className="form-control bg-danger text-white">First Winner</span>
        <span className="form-control bg-success text-white">Second Winner</span>
        <span className="form-control bg-warning text-white">Third Winner</span>
      </div>
      <div class="input-group mb-3">
        <select className="custom-select" value={first_winner} onChange={handleChange("first_winner")}>
          {participants.map((user, index) => (
            <option className="mb-1" value={user._id}>
              {user.free_fire_id} {user.name}
            </option>
          ))}
        </select>

        <select className="custom-select" value={second_winner} onChange={handleChange("second_winner")}>
          {participants.map((user, index) => (
            <option className="mb-1" value={user._id}>
              {user.free_fire_id} {user.name}
            </option>
          ))}
        </select>
        <select className="custom-select" value={third_winner} onChange={handleChange("third_winner")}>
          {participants.map((user, index) => (
            <option className="mb-1" value={user._id}>
              {user.free_fire_id} {user.name}
            </option>
          ))}
        </select>
        <div class="input-group-append">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={onSubmit}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishTournament;
