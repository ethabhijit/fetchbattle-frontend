import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import CreatedTournaments from "./user/CreatedTournaments";
import CreateTournament from "./user/CreateTournament";
import ParticipatedTournaments from "./user/ParticipatedTournaments";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import TournamentInfo from "./user/TournamentInfo";
import UserDashBoard from "./user/UserDashBoard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/tournament/create" exact component={CreateTournament} />
        <PrivateRoute path="/tournaments/:contestId" exact component={TournamentInfo} />
        <PrivateRoute path="/created/tournaments" exact component={CreatedTournaments} />
        <PrivateRoute path="/participated/tournaments" exact component={ParticipatedTournaments} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
