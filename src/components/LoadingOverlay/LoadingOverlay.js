import React from "react";
import { Loading } from "carbon-components-react";
import "./LoadingOverlay.css";

function LoadingOverlay({ loading }) {
  if (!loading) {
    return null;
  }
  return (
    <div className="LoadingOverlay">
      <Loading description="Active loading indicator" withOverlay={false} />
    </div>
  );
}

export default LoadingOverlay;
