import React from "react";
import "./Moderator.css";

class Moderator extends React.Component {
  render() {
    return (
      <div className="Moderator">
        <div className="moderator-card">
        <h1>Become a moderator</h1>
        <iframe
          title="Moderator-form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdkZtnEzHdYVQVEPDVYdXV94eLWQNE82N3sRNDxozIi-bYfvg/viewform?embedded=true"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
        </div>
      </div>
    );
  }
}

export default Moderator;
