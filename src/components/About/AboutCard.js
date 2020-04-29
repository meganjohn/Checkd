import React from "react";
import "./About.css";

class AboutCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      bio: props.bio,
      link1Logo: props.link1Logo,
      link1: props.link1,
      link1Text: props.link1Text,
      link2Logo: props.link2Logo,
      link2: props.link2,
      link2Text: props.link2Text
    };
  }

  render() {
    return (
      <div className="about-container">
        <div className="about-card">
          <h3>{this.state.name}</h3>
          <p>{this.state.bio}</p>
          <a className="link-group" href={this.state.link1} target="_blank" rel="noopener noreferrer">
            <img src={this.state.link1Logo} alt=""></img>
            {this.state.link1Text}
          </a>
          <a className="link-group" href={this.state.link2} target="_blank" rel="noopener noreferrer">
            <img src={this.state.link2Logo} alt=""></img>
            {this.state.link2Text}
          </a>
        </div>
      </div>
    );
  }
}

export default AboutCard;
