import React from "react";
import AboutCard from "./AboutCard";
import Person from "./Person";
import "./About.css";
import gitHubLogo from "./GitHub-Mark-120px-plus.png";
import meganjohnLogo from "./meganjohnLogo.png";
import linkedinLogo from "./linkedin.png";

const ourInfo = [
  new Person("Aly", 
      "bio", 
      gitHubLogo, "https://github.com/alystroud", "/alystroud", 
      "", "", ""),
  new Person("Arka", "bio", "", "", "", "", "", ""),
  new Person("Imane", "bio", "", "", "", "", "", ""),
  new Person("Lawrencia", 
      "Hi, my name is Lawrencia, and I am a London based developer. I started my " + 
      "web-development journey during my final year at the University of Bath, " + 
      "learning Python with Code First: Girls. After graduation, I joined futureproof " + 
      "to train to become a Full Stack Developer.", 
      gitHubLogo, "https://github.com/lawcia", "/lawcia", 
      linkedinLogo, "https://www.linkedin.com/in/lawrencianjume/", "LinkedIn"),
  new Person("Megan", 
      "I'm Megan, a London-based aspiring software developer, on the hunt for " +
      "my first tech role. I'm currently working at a digital marketing agency in " + 
      "central London and spend my free time exercising, reading, and learning to code.", 
      gitHubLogo, "https://github.com/meganjohn", "/meganjohn",
      meganjohnLogo, "meganjohn.co.uk", "meganjohn.co.uk")
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
