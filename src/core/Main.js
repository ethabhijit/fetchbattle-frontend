import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import displayRazorpay from "./Payment";

const Main = ({ tournaments, isInfoPage, children }) => {
  const { user, token } = isAutheticated();

  const [error, setError] = useState("");
  // Date formate function
  const formateDate = (date) => {
    let newDate = date.slice(0, 10);
    newDate = newDate.split("-");
    newDate = newDate.reverse();
    newDate = newDate.join("-");

    return newDate;
  };

  // Check if user is participated in the tournament
  const isParticipated = (userId, participants) => {
    const found = participants
      ? participants.find((elem) => elem._id === userId)
      : false;
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  // Check if user is creator
  const isCreator = (contestId, userId) => {
    if (contestId === userId) {
      return true;
    } else {
      return false;
    }
  };

  // Check if tournament is full
  const isFullTournament = (entered, limit) => {
    if (entered === limit) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (tournamentId) => (event) => {
    event.preventDefault();

    // Capture Payment
    displayRazorpay(tournamentId, user, token);
  };

  return (
    <div className="col-lg-5 ml-auto mr-auto">
      {tournaments &&
        tournaments.map((tournament, index) => {
          return (
            <div key={index} className="card mb-2 main-card-container">
              <div className="card-body">
                <h5 className="card-title">
                  {tournament.name}
                  <span className="float-right">
                    {!isInfoPage && (
                      <Link to={`/tournaments/${tournament._id}`}>
                        <button type="button" className="btn btn-secondary">
                          Info
                        </button>
                      </Link>
                    )}
                  </span>
                </h5>
                <p className="card-text">
                  <span className="tags badge bg-light">Free Fire</span>
                  <span className="tags badge bg-light">
                    {tournament.place}
                  </span>
                  <span className="tags badge bg-light text-dark">
                    {tournament.status}
                  </span>
                  <span className="tags badge bg-light text-dark">
                    {tournament.match_type}
                  </span>
                </p>
                <p className="card-text fs-6">{tournament.description}</p>

                <p className="card-text">
                  <span class="tags badge badge-danger">
                    ₹{tournament.first_prize}
                  </span>
                  <span class="tags badge badge-success">
                    ₹{tournament.second_prize}
                  </span>
                  <span class="tags badge badge-warning">
                    ₹{tournament.third_prize}
                  </span>
                </p>
                <p className="card-text">
                  <span className="tournament-info-icons">
                    <i
                      className="fas fa-users text-danger"
                      title="Participant Limit"
                    ></i>
                    <span className="text-bold">
                      {" "}
                      {tournament.participant_limit}
                    </span>
                  </span>
                  <span className="tournament-info-icons">
                    <i
                      className="far fa-calendar-alt text-success"
                      title="Date"
                    ></i>
                    <span className="fs-6 text-bold">
                      {" "}
                      {formateDate(tournament.tournament_date)}
                    </span>
                  </span>
                  <span className="tournament-info-icons">
                    <i
                      className="far fa-clock text-info"
                      title="time"
                    ></i>
                    <span className="fs-6 text-bold">
                      {" "}
                      {tournament.tournament_time}
                    </span>
                  </span>
                  <span className="tournament-info-icons">
                    <i
                      className="fas fa-money-check-alt text-warning"
                      title="Entry Fees"
                    ></i>
                    <span className="fs-6 text-bold">
                      {" "}
                      ₹{tournament.entry_fees}
                    </span>
                  </span>
                </p>
                <div className="card-button-container">
                  {!isFullTournament(
                    tournament.entered,
                    tournament.participant_limit
                  ) &&
                    !isParticipated(user._id, tournament.participants) &&
                    user &&
                    !isCreator(tournament.owner._id, user._id) && (
                      <button
                        type="button"
                        className="btn btn-secondary mr-2"
                        onClick={onSubmit(tournament._id)}
                      >
                        Enter
                      </button>
                    )}
                  {isFullTournament(
                    tournament.entered,
                    tournament.participant_limit
                  ) && (
                    <span class="badge badge-success">All Participants are entered in the tournament</span>
                  )}

                  {isParticipated(user._id, tournament.participants) && (
                    <i class="fas fa-check-circle user-enter-icon text-primary"></i>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {/* {children tages}  */}
        {children}
    </div>
  );
};

export default Main;
