import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { getTournaments, getATournament } from "./helper/coreapicalls";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(false);

  const loadAllTournaments = () => {
    getTournaments().then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setTournaments(data);
      }
    })
  };

  useEffect(() => {
    loadAllTournaments();
  }, []);

  return (
    <Base data={tournaments} />
  );
};

export default Home;
