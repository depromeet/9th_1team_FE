import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "react-relay";

const LoginInput = ({ login }) => {
  return <div>{login}</div>;
};

export default createFragmentContainer(LoginInput, {
  // For each of the props that depend on server data, we define a corresponding
  // key in this object. Here, the component expects server data to populate the
  // `item` prop, so we'll specify the fragment from above at the `item` key.
  login: graphql`
    fragment LoginInput_login on login {
      
    }
  `,
});
