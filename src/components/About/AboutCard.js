import React from "react";
import "./About.css";

class AboutCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      role: props.role,
      headshot: props.headshot,
      bio: props.bio,
      link1Logo: props.link1Logo,
      link1: props.link1,
      link1Text: props.link1Text,
      link2Logo: props.link2Logo,
      link2: props.link2,
      link2Text: props.link2Text,
    };
  }

  render() {
    return (
      <div className="about-container">
        <div className="name-and-role">
          <h3>{this.state.name}</h3>
          <h4>{this.state.role}</h4>
        </div>
        <div className="card-content">
          <img
            className="headshot"
            src={this.state.headshot}
            alt={`${this.state.name} headshot`}
          />
          <div className="card-text">
            <p>{this.state.bio}</p>
            <a
              className="link-group"
              href={this.state.link1}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={this.state.link1Logo}
                alt={`${this.state.link1Text} logo`}
              />
              {this.state.link1Text}
            </a>
            <a
              className="link-group"
              href={this.state.link2}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={this.state.link2Logo}
                alt={`${this.state.link2Text}logo`}
              />
              {this.state.link2Text}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCard;
