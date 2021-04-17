import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Menu from "../core/Menu";
import { getAUser, updatePaymentDetails } from "./helper/userapicalls";

const UserDashBoard = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    email: "",
    upi_id: "",
    bank_account_name: "",
    bank_account_number: "",
    bank_account_ifsc: "",
    bank_account_branch: "",
    free_fire_id: "",
    error: "",
    points: ""
  });

  const [details, setDetails] = useState({
    name: "",
    email: "",
    upi_id: "",
    bank_account_name: "",
    bank_account_number: "",
    bank_account_ifsc: "",
    bank_account_branch: "",
    free_fire_id: "",
    points: "",
    money: ""
  });

  const {
    name,
    email,
    upi_id,
    bank_account_name,
    bank_account_number,
    bank_account_ifsc,
    bank_account_branch,
    error,
    free_fire_id,
    points
  } = values;

  const preload = () => {
    getAUser(user._id, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setDetails({
            ...details,
            upi_id: data.upi_id,
            bank_account_name: data.bank_account_name,
            bank_account_number: data.bank_account_number,
            bank_account_ifsc: data.bank_account_ifsc,
            bank_account_branch: data.bank_account_branch,
            free_fire_id: data.free_fire_id,
            points: data.points,
            money: data.money
          });
          setValues({
            ...values,
            upi_id: data.upi_id,
            bank_account_name: data.bank_account_name,
            bank_account_number: data.bank_account_number,
            bank_account_ifsc: data.bank_account_ifsc,
            bank_account_branch: data.bank_account_branch,
            free_fire_id: data.free_fire_id,
          });
        }
      })
      .catch(console.log("Error in getAUser()"));
  };

  useEffect(() => {
    preload();
  }, []);

  // table tr
  const Row = ({ title, value, children }) => (
    <tr>
      <td>
        <span className="badge bg-primary mr-2 text-white">{title}</span>
      </td>
      <td>
        <div className="row">
          <div className="col-sm font-weight-bold">{value}</div>
          <div className="col-sm">{children}</div>
        </div>
      </td>
    </tr>
  );

  // Change when input change
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // Submit button action
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    updatePaymentDetails(user._id, token, {
      upi_id,
      bank_account_name,
      bank_account_number,
      bank_account_ifsc,
      bank_account_branch,
      free_fire_id,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setDetails({
            ...values,
            upi_id: data.upi_id,
            bank_account_name: data.bank_account_name,
            bank_account_number: data.bank_account_number,
            bank_account_ifsc: data.bank_account_ifsc,
            bank_account_branch: data.bank_account_branch,
            free_fire_id: data.free_fire_id,
          });
        }
      })
      .catch(console.log("Payment Details Update failed\n"));
  };

  return (
    <div>
      <Menu />

      <section className="container mt-2">
        <div className="row">
          <div className="col-lg-4 mb-2">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h5>User Dashboard</h5>
                </li>
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/tournament/create">Create Tournament</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/created/tournaments">Created Tournaments</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/participated/tournaments">
                    Participated Tournaments
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <table class="table table-bordered">
              <tbody>
                <Row title="Name" value={user.name} />
                <Row title="Email" value={user.email} />
                <Row title="Points" value={details.points} />
                <Row title="Money" value={details.money} />
                <Row title="Free Fire ID" value={details.free_fire_id}>
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
                <Row title="UPI ID" value={details.upi_id}>
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
                <Row
                  title="Bank Account Holder Name"
                  value={details.bank_account_name}
                >
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
                <Row
                  title="Bank Account Number"
                  value={details.bank_account_number}
                >
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
                <Row
                  title="Bank Account IFSC"
                  value={details.bank_account_ifsc}
                >
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
                <Row
                  title="Bank Branch Name"
                  value={details.bank_account_branch}
                >
                  <button
                    className="btn btn-sm btn-success"
                    data-toggle="modal"
                    data-target="#details-form-modal"
                  >
                    Update
                  </button>
                </Row>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Modal box */}
      <div class="modal fade" id="details-form-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update User Details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* Form  */}
              <section>
                <div class="form-group">
                  <label for="free_fire_id">Free Fire ID</label>
                  <input
                    id="free_fire_id"
                    type="text"
                    class="form-control"
                    placeholder="Free Fire ID"
                    onChange={handleChange("free_fire_id")}
                    value={free_fire_id}
                  />
                </div>
                <div class="form-group">
                  <label for="upi_id">UPI ID</label>
                  <input
                    id="upi_id"
                    type="text"
                    class="form-control"
                    placeholder="UPI ID"
                    onChange={handleChange("upi_id")}
                    value={upi_id}
                  />
                </div>
                <div class="form-group">
                  <label for="bank_account_branch">Bank Branch Name</label>
                  <input
                    id="bank_account_branch"
                    type="text"
                    class="form-control"
                    placeholder="Bank Branch Name"
                    onChange={handleChange("bank_account_branch")}
                    value={bank_account_branch}
                  />
                </div>
                <div class="form-group">
                  <label for="bank_account_name">Bank Account Name</label>
                  <input
                    id="bank_account_name"
                    type="text"
                    class="form-control"
                    placeholder="Bank Account Holder Name"
                    onChange={handleChange("bank_account_name")}
                    value={bank_account_name}
                  />
                </div>
                <div class="form-group">
                  <label for="bank_account_number">Bank Account Number</label>
                  <input
                    id="bank_account_number"
                    type="text"
                    class="form-control"
                    placeholder="Bank Account Number"
                    onChange={handleChange("bank_account_number")}
                    value={bank_account_number}
                  />
                </div>
                <div class="form-group">
                  <label for="bank_account_ifsc">Bank Account IFSC</label>
                  <input
                    id="bank_account_ifsc"
                    type="text"
                    class="form-control"
                    placeholder="Bank Account IFSC"
                    onChange={handleChange("bank_account_ifsc")}
                    value={bank_account_ifsc}
                  />
                </div>
              </section>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={onSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
