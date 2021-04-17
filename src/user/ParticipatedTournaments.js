import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Menu from "../core/Menu";
import { getParticipatedTournaments } from "../core/helper/coreapicalls";

const ParticipatedTournaments = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState([]);
  const [error, setError] = useState(false);

  // LOAD ALL USER CREATED TOURNAMENTS
  const preload = () => {
    getParticipatedTournaments(user._id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues(data);
      }
    });
  };

  // Date formate function
  const formateDate = (date) => {
    let newDate = date.slice(0, 10);
    newDate = newDate.split("-");
    newDate = newDate.reverse();
    newDate = newDate.join("-");

    return newDate;
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      <Menu />

      <section className="container">
        <h3 className="text-center mt-2">Participated Tournaments</h3>
        {console.log(values)}

        <div className="table-responsive">
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Match Type</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Participant Limit</th>
                <th scope="col">Entry Fees</th>
                <th scope="col">Entered</th>
                <th scope="col">More</th>
              </tr>
            </thead>
            <tbody>
              {console.log(values)}
              {values.length &&
                values.map((tournament, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{tournament.name}</td>
                    <td>{tournament.match_type}</td>
                    <td>{formateDate(tournament.tournament_date)}</td>
                    <td>{tournament.tournament_time}</td>
                    <td>{tournament.participant_limit}</td>
                    <td>₹{tournament.entry_fees}</td>
                    <td>
                      <span class="badge badge-info">{tournament.entered}</span>
                    </td>
                    <td>
                      <Link to={`/tournaments/${tournament._id}`}>
                        <button type="button" className="btn btn-secondary">
                          Info
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ParticipatedTournaments;
