import React from "react";
import "./Home.css";
import photo from "./waves.png";

function Home() {
  return (
    <div className="Home">
      <header style={{"backgroundImage": `url(${photo})`}}>
        <h1>COVID-19 poses an unprecedented challenge.</h1>
        <h2>To help facilitate the public’s access to factually correct news surrounding Coronavirus, and to reduce anxiety and negative consequences from acting on fake sources of information, a group of volunteers have created this platform.</h2>
      </header>
    </div>
  );
}

export default Home;
