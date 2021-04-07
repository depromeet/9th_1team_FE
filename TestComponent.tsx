import {graphql} from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";

const query = graphql`
  query SettingsQuery {
    currentUser {
      id
      _id
      email
    }
  }
`;


const TestComponent = () => {
  const data = useLazyLoadQuery(
    query,
    {},
    {
      fetchPolicy: "store-and-network",
    }
  );

  return (
    <div>
      <h1>{data.currentUser.email}</h1>
    </div>
  );
};

export default TestComponent;