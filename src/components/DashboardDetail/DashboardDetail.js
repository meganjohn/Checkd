import React from "react";

class DashboardDetail extends React.Component {
  render(){
    return(
      <div>
        <h1>Moderate submission - article id={this.props.match.params.id}</h1>
      </div>
    )
  }
}

export default DashboardDetail;