import styled from "styled-components";
import FeedPost from "components/FeedPost";
import Header from "components/Header";

const Today = () => {
  return (
    <TodayContainer>
      <div className="title">오늘의 밸런스게임</div>
      <FeedPost />
    </TodayContainer>
  );
};

const Feed = () => {
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

export default Feed;
