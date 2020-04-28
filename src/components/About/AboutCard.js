import React from "react";
import "./About.css";

class AboutCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      bio: props.bio,
      link1: props.link1,
      link1Text: props.link1Text,
      link2: props.link2,
      link2Text: props.link2Text
    };
  }

  render() {
    return (
      <div>
        <h3>{this.state.name}</h3>
        <p>{this.state.bio}</p>
        <a href={this.state.link1}>{this.state.link1Text}</a>
      </div>
    );
  }
}

export default AboutCard;
