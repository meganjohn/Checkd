import React from "react";
import "./Home.css";
import photo from "./waves.png";
import { Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";

function Home(props) {
  let history = useHistory();

  return (
    <div className="Home">
      <header
        className="home-header"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <h1>COVID-19 poses an unprecedented challenge.</h1>
        <h3>
          To help facilitate the public’s access to factually correct news
          surrounding Coronavirus, and to reduce anxiety and negative
          consequences from acting on fake sources of information, a group of
          volunteers have created this platform.
        </h3>
        <Button
          className="home-button"
          onClick={() => history.push("/submit-news")}
        >
          Submit news
        </Button>
      </header>
      <main className="home-main">
        <h2 className="home-heading-2">Why use Checkd?</h2>
        <p>
          We are currently going through a global health crisis that will
          fundamentally change our personal and professional lives. Right now
          we’re all feeling confused about the best advice to follow, uncertain
          about recovery timelines and eager to get back to our old lives. It
          doesn’t help that there are lot of rumours about immunity-boosting
          methods and potential cures to Coronavirus going around. We all want
          our loved ones to be safe and healthy, so how do we separate fact from
          fiction to reduce any potentially risk-inducing activities that they
          might take?{" "}
        </p>
        <p>
          At Checkd, we’re here to make this easier for you. We fact check news
          items on your behalf, to reduce the time and effort you spend in
          checking the links and news articles that you receive to keep your
          friends and family safe. Just send us a piece of news and let us do
          all the work for your peace of mind. We’ll let you know if anything
          you’ve sent is fake and you can tell your friends and families.
        </p>
        <p>
          Our platform is trusted and secure - we do not store any personal data
          when you submit news and we have a team of moderators to check your
          submission, using our analysis against dimensions such as political
          bias, and references to credible sources. We aim to reach a final
          decision on your news submission within 3 days.
        </p>
      </main>
      <div className="home-info">
        <h2 className="home-heading-2">How does Checkd work?</h2>
        <div className="info-steps">
          <div className="info-step">
            <p className="info-heading">
              <div className="circle" />
              News submission
            </p>
            <p>Submit a link or article extract that you are unsure is true</p>
          </div>
          <div className="info-step">
            <p className="info-heading">
              <div className="circle" />
              Analysis
            </p>
            <p>
              Our platform checks your news submission against natural language
              processing, APIs and libraries to give an initial indicator of its
              sentiment (feelings), objectivity and political bias.
            </p>
          </div>
          <div className="info-step">
            <p className="info-heading">
              <div className="circle" />
              Verdict
            </p>
            <p>
              Our moderators run further checks on your submission to provide a
              final verdict on its authenticity.
            </p>
          </div>
          <div className="info-step">
            <p className="info-heading">
              <div className="circle" />
              Result
            </p>
            <p>
              Check the newsfeed to see the results of your submission, and
              share it with others to spread awareness!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
