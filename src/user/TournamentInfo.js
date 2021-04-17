import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getATournament } from "../core/helper/coreapicalls";
import Main from "../core/Main";
import Menu from "../core/Menu";
import FinishTournament from "./FinishTournament";
import Message from "./Message";

const TournamentInfo = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    participants: "",
    participant_limit: "",
    entered: "",
    place: "",
    status: "",
    id: "",
    entry_fees: "",
    tournament_date: "",
    tournament_time: "",
    creator_id: "",
    first_prize: "",
    second_prize: "",
    third_prize: "",
    room_id: "",
    room_password: "",
    error: false,
    owner: {},
  });

  const {
    name,
    description,
    participants,
    entered,
    room_id,
    room_password,
    participant_limit,
    place,
    status,
    id,
    entry_fees,
    tournament_date,
    tournament_time,
    creator_id,
    error,
    owner,
    first_prize,
    second_prize,
    third_prize,
  } = values;

  // Check if he is creator of the tournament
  const isCreator = (contestId, userId) => {
    if (contestId === userId) {
      return true;
    } else {
      return false;
    }
  };

  // Check if the tournament is end or not
  const isEnd = (status) => {
    if(status === "End") {
      return true;
    } else {
      return false;
    }
  }

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

  const preload = (contestId) => {
    getATournament(contestId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          participants: data.participants,
          participant_limit: data.participant_limit,
          place: data.place,
          status: data.status,
          id: data._id,
          entered: data.entered,
          entry_fees: data.entry_fees,
          tournament_date: data.tournament_date,
          tournament_time: data.tournament_time,
          first_prize: data.first_prize,
          second_prize: data.second_prize,
          third_prize: data.third_prize,
          room_id: data.room_id,
          room_password: data.room_password,
          owner: {
            _id: data.owner._id,
            name: data.owner.name,
            email: data.owner.email,
          },
          error: false,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.contestId);
  }, []);

  return (
    <div>
      <Menu />
      <section className="container">
        <div className="row pt-2">
          <Main tournaments={[values]} isInfoPage={true}>
            <li class="list-group-item">
              { !isEnd(status) && isCreator(owner._id, user._id) && (
                <Message
                  userId={user._id}
                  contestId={match.params.contestId}
                  token={token}
                />
              )}
            </li>
            <li class="list-group-item">
              {participants.length === 3 && !isEnd(status) && isCreator(owner._id, user._id) && (
                <FinishTournament
                  userId={user._id}
                  contestId={match.params.contestId}
                  token={token}
                  participants={participants}
                />
              )}
            </li>
          </Main>

          <div className="col-lg-7   my-2">
            <ul class="list-group">
              <li className="list-group-item">
                <h5>Creator Info</h5>
              </li>
              <li class="list-group-item">
                <span class="badge badge-primary">Creator Name</span>
                <span> {owner.name}</span>
              </li>
              <li class="list-group-item">
                <span class="badge badge-primary">Creator Email</span>
                <span> {owner.email}</span>
              </li>
              {(isParticipated(user._id, participants) ||
                isCreator(owner._id, user._id)) && (
                <span>
                  <li class="list-group-item">
                    <span class="badge badge-primary">Room ID</span>
                    <span> {room_id}</span>
                  </li>
                  <li class="list-group-item">
                    <span class="badge badge-primary">Room Password</span>
                    <span> {room_password}</span>
                  </li>
                </span>
              )}
              <li class="list-group-item">
                <h5>
                  Participants
                  <span class="badge badge-primary ml-2">{entered}</span>
                </h5>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Free Fire ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants &&
                      participants.map((participant, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{participant.name}</td>
                          <td>{participant.email}</td>
                          <td>{participant.free_fire_id}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TournamentInfo;
