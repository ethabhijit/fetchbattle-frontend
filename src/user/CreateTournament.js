import React, { useState } from "react";
import { isAutheticated } from "../auth/helper";
import Menu from "../core/Menu";
import { createTournament } from "./helper/userapicalls";

const CreateTournament = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    entry_fees: "",
    match_type: "Solo",
    participant_limit: "",
    place: "Online",
    tournament_date: "",
    tournament_time: "",
    formData: "",
    error: "",
    loading: false,
    createdTournament: "",
  });

  const {
    name,
    description,
    entry_fees,
    match_type,
    participant_limit,
    place,
    tournament_date,
    tournament_time,
    formData,
    createdTournament,
  } = values;

  const onSubmit = (event) => {
    if(entry_fees < 5 || parseInt(participant_limit) === 0) {
      alert("Entry Fees minimum 5 ruppes and Participant limit not be 0.")
      return;
    }
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    let tournamentData = {
      name,
      description,
      match_type,
      entry_fees,
      participant_limit,
      place,
      tournament_date,
      tournament_time,
    };
    createTournament(user._id, token, tournamentData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          match_type: "Solo",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdTournament: data.name,
        });
      }
    }).catch(err => console.log(err))
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdTournament ? "" : "none" }}
    >
      <h4>{createdTournament} created successfully</h4>
    </div>
  );

  const createdTournamentForm = () => (
    <section className="container mt-2">
      <div className="row card pt-2">
        <div className="col-lg-6 col-md-6 m-auto">
          <main className="">
            <h1 className="h3 mb-3 fw-normal text-center">Create Tournament</h1>
            <div className="mb-3">
              <label className="form-label fw-bold">Tournament Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("name")}
                name="name"
                value={name}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Tournament Description
              </label>
              <textarea
                className="form-control"
                rows="2"
                onChange={handleChange("description")}
                name="description"
                value={description}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Match Type</label>
              <select
                class="form-control"
                onChange={handleChange("match_type")}
                value={match_type}
              >
                <option value="Solo">Solo</option>
                <option value="Duo">Duo</option>
                <option value="Squad">Squad</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Entry Fees</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange("entry_fees")}
                name="entry_fees"
                value={entry_fees}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Participant Limit</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange("participant_limit")}
                name="participant_limit"
                value={participant_limit}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Tournament Place</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("place")}
                name="place"
                value="Online"
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Tournament Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Tournament Date"
                onChange={handleChange("tournament_date")}
                name="tournament_date"
                value={tournament_date}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Tournament Time</label>
              <input
                type="time"
                className="form-control"
                placeholder="Tournament Time"
                onChange={handleChange("tournament_time")}
                name="tournament_time"
                value={tournament_time}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={onSubmit}
              >
                Create
              </button>
            </div>

            <p className="mt-5 mb-3 text-muted text-center">
              &copy; 2021 Fetch Battle Inc.
            </p>
          </main>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <Menu />
      {successMessage()}
      {createdTournamentForm()}
      {/* {<p className="text-dark text-center">{JSON.stringify(values)}</p>} */}
    </div>
  );
};

export default CreateTournament;
