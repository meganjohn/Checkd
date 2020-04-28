import React from "react";
import AboutCard from "./AboutCard";
import Person from "./Person";
import "./About.css";

const ourInfo = [
  new Person("Aly", "bio", "https://github.com/alystroud", "GitHub", "", ""),
  new Person("Arka", "bio", "", "", "", ""),
  new Person("Imane", "bio", "", "", "", ""),
  new Person("Lawrencia", "bio", "https://github.com/lawcia", "GitHub", "", ""),
  new Person("Megan", "bio", "https://github.com/meganjohn", "GitHub", "", "")
];

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-page">
        <div className="about-page-contents">
          <h1>About Us</h1>
          <div className="about-contents">
            {ourInfo.map((person) => {
              return <AboutCard {...person}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
