import React from "react";
import "./Home.css";
import photo from "./waves.png";
import { Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";

function Home(props) {
  let history = useHistory();

  return (
    <div className="Home">
      <header style={{ backgroundImage: `url(${photo})` }}>
        <h1>COVID-19 poses an unprecedented challenge.</h1>
        <h2>
          To help facilitate the public’s access to factually correct news
          surrounding Coronavirus, and to reduce anxiety and negative
          consequences from acting on fake sources of information, a group of
          volunteers have created this platform.
        </h2>
        <Button
          className="home-button"
          onClick={() => history.push("/submit-news")}
        >
          Submit news
        </Button>
      </header>
    </div>
  );
}

export default Home;
