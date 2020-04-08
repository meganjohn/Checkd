import React from "react";

class ReviewForm extends React.Component {
  render() {
    return (
      <form>
        <label>
          Url:
          <input type="text" name="url" />
        </label>
        <label>
          Article:
          <textarea type="text" name="article" />
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default ReviewForm;
