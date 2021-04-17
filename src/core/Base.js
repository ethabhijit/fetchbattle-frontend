import React from "react";
import Main from "./Main";
import Menu from "./Menu";
import Search from "./Search";
import Sidebar from "./Sidebar";

const Base = ({ data }) => (
  <div>
    <Menu />
    <section class="container mt-2">
      <div class="row">
        <Search />
        <Main tournaments={data} />
        <Sidebar />
      </div>
    </section>
  </div>
);

export default Base;
