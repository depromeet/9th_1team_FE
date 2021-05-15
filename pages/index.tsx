import styled from "styled-components";
import FeedPost from "components/FeedPost";
import Header from "components/Header";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

const ALL_POSTS_QUERY = gql`
  query {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
    }
  }
`;

const Today = () => {
  return (
    <TodayContainer>
      <div className="title">오늘의 밸런스게임</div>
      <FeedPost />
    </TodayContainer>
  );
};

const Index = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      // variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  console.log(loading, error, data, fetchMore, networkStatus);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Today />
      <Container>
        <FeedPost />
        <FeedPost />
        <FeedPost />
        <FeedPost />
      </Container>
    </div>
  );
};

const TodayContainer = styled.div`
  padding: 1.6rem;
  margin-top: 5.2rem;
  margin-bottom: -2.5rem;
  background: #f8f9fa;
  .title {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
`;

const Container = styled.div`
  background: white;
  padding: 1.55rem 1.6rem;
  display: flex;
  flex-direction: column;
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    // variables: allPostsQueryVars,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Index;
