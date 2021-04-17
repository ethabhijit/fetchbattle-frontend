import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getAllUser } from "./helper/coreapicalls";

const Sidebar = () => {
  const { token } = isAutheticated();

  const [details, setDetails] = useState([
    {
      id: "",
      name: "",
      email: "",
      free_fire_id: "",
      points: "",
      error: "",
      loading: "",
    },
  ]);

  const sortTheArray = (arr) => {
    return arr.sort(function (a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    });
  };

  const preload = (userToken) => {
    getAllUser(userToken)
      .then((data) => {
        if (data.error) {
          setDetails({ ...details, error: data.error, loading: false });
        } else {
          setDetails(data);
        }
      })
      .catch(console.log("Not able to get all users"));
  };

  useEffect(() => {
    preload(token);
  }, []);

  return (
    <div className="col-lg-3 d-none d-lg-block d-xl-block">
      <div className="position-fixed sidebar-card-container">
        <div className="card sidebar-card">
          <div className="card-body">
            <h5 className="card-title text-center">Top Performers</h5>
            <p className="card-text">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTheArray(details).slice(0, 5).map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{user.name}</td>
                      <td>
                        <span class="badge badge-warning">
                          {user.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </p>
          </div>
        </div>
        <Link to="tournament/create" className="btn btn-primary btn-block mt-2">
          Create a tournament
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
