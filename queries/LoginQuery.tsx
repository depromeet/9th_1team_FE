import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { useEnvironment } from "../lib/relay";
import LoginInput from "./LoginInput";

const renderQuery = ({ error, props }) => {
  if (error) {
    return <div>{error.message}</div>;
  } else if (props) {
    return (
      <>
        <LoginInput {...props} />
      </>
    );
  }
  return <div>Loading</div>;
};

export default function Login() {
  return (
    <QueryRenderer
      environment={useEnvironment}
      query={graphql`
        query LoginQuery {
          login {
            ...LoginInput_login
          }
        }
      `}
      variables={{}}
      render={renderQuery}
    />
  );
}
