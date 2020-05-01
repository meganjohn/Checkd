import React from "react";
import AboutCard from "./AboutCard";
import Person from "./Person";
import "./About.css";
import gitHubLogo from "./GitHub-Mark-120px-plus.png";
import meganjohnLogo from "./meganjohnLogo.png";
import linkedinLogo from "./linkedin.png";
import meganPicture from "./megan-headshot.jpg";
import lawrenciaPicture from "./lawrencia-headshot.jpg";
import arkaPicture from "./arka-headshot.jpg";
import alyPicture from "./aly-headshot.jpg";
import imanePicture from "./imane-headshot.jpg";

const ourInfo = [
  new Person("Aly Stroud", alyPicture,
      "Hi I’m Aly, and I’m a Java developer based in Bristol. I wanted to participate in " +
      "Hack from Home as I was excited to work in an all-female team, creating something " +
      "to help others in this scary time. Outside of work, I like weightlifting, true " +
      "crime and cuddling my cat.", 
      gitHubLogo, "https://github.com/alystroud", "/alystroud", 
      linkedinLogo, "https://www.linkedin.com/in/aly-stroud-518884102/", "/aly-stroud"),
  new Person("Arka Raina", arkaPicture,
      "I’m Arka, a London-based UX and Visual Design Consultant. I work in tech and " +
      "have really enjoyed designing Checkd with my team. Outside of work, I like to " +
      "draw and read. In my pre-Coronavirus life, I was an avid badminton player, too. " +
      "Feel free to say hi to me on LinkedIn; I’m always up for a chat.", 
      linkedinLogo, "https://www.linkedin.com/in/arkaraina/", "/arkaraina",
      "", "", ""),
  new Person("Imane Kaddo", imanePicture, 
      "I’m Imane, I work in Tech support and have an interest in UX. I love working with " +
      "technology to help others and problem solve. In my free time, I enjoy travelling " +
      "and taking part in outdoor adventures such as hiking, biking and horse riding.", 
      linkedinLogo, "https://www.linkedin.com/in/imanekaddo/", "/imanekaddo", 
      "", "", ""),
  new Person("Lawrencia Njume", lawrenciaPicture, 
      "Hi, my name is Lawrencia, and I am a London based developer. I started my " + 
      "web-development journey during my final year at the University of Bath, " + 
      "learning Python with Code First: Girls. After graduation, I joined futureproof " + 
      "to train to become a Full Stack Developer.", 
      gitHubLogo, "https://github.com/lawcia", "/lawcia", 
      linkedinLogo, "https://www.linkedin.com/in/lawrencianjume/", "/lawrencianjume"),
  new Person("Megan John", meganPicture,
      "I'm Megan, a London-based aspiring software developer, on the hunt for " +
      "my first tech role. I'm currently working at a digital marketing agency in " + 
      "central London and spend my free time exercising, reading, and learning to code.", 
      gitHubLogo, "https://github.com/meganjohn", "/meganjohn",
      meganjohnLogo, "https://meganjohn.co.uk/", "meganjohn.co.uk")
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
