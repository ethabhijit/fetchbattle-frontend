import React from "react";

const Search = () => (
  <div className="col-lg-3 d-none d-lg-block d-xl-block search-section">
    <div className="position-fixed">
      <div className="card search-card-section">
        <div className="card-body">
          <h5 className="card-title">Search Here</h5>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="search-text"
                placeholder="Enter name"
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-block" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Search;
