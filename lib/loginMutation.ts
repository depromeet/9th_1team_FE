import { graphql } from "graphql";
import { commitMutation } from "react-relay";

const mutation = graphql`
  mutation loginMutation($key: String!, $type: String!) {
    login(socialKey: $key, socialType: $type)
  }
`;

export default function loginMutation(environment, name, type) {
  return new Promise((resolve) => {
    const variables = {
      name,
      type,
    };

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        resolve(response);
      },
      onError: (err) => console.error(err),
    });
  });
}
