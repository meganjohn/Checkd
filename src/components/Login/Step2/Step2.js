import React from "react";
import { FormGroup, TextInput, Button } from "carbon-components-react";

function Step2(props) {
  if (props.step !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <FormGroup>
        <TextInput.PasswordInput
          helperText="try password123"
          hidePasswordLabel="Hide password"
          id="passwordInput"
          invalidText="A valid value is required"
          placeholder="Password"
          showPasswordLabel="Show password"
          name="password"
          onChange={props.handleChange}
        />
      </FormGroup>
      <Button kind="primary" tabIndex={0} type="submit">
        LOGIN
      </Button>
    </React.Fragment>
  );
}

export default Step2;
