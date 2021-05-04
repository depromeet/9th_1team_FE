import { useState } from "react";
import styled from "styled-components";
import FeedPost from "../../components/FeedPost";

const Feed = () => {
  enum FEED_STATE {
    LATEST = "LATEST",
    POPULAR = "POPULAR",
  }
  const [feedState, setFeedState] = useState(FEED_STATE.LATEST);
  return (
    <Container>
      <div className="state">
        <StateBtn
          onClick={() => setFeedState(FEED_STATE.LATEST)}
          isClicked={feedState === FEED_STATE.LATEST}
        >
          최신순
        </StateBtn>
        <StateBtn
          onClick={() => setFeedState(FEED_STATE.POPULAR)}
          isClicked={feedState === FEED_STATE.POPULAR}
        >
          인기순
        </StateBtn>
      </div>

      <div className="posts">
        <FeedPost />
        <FeedPost />
        <FeedPost />
        <FeedPost />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 1.6rem;
  .state {
    display: flex;
    margin-top: 2.5rem;
    font-size: 1.2rem;
    position: absolute;
    right: 0;
  }
  .posts {
    width: 100%;
    position: absolute;
    top: 5.5rem;
    display: flex;
    flex-direction: column;
  }
`;

const StateBtn = styled.div<{ isClicked: boolean }>`
  :first-child {
    margin-right: 1.2rem;
  }
  font-weight: bold;
  color: ${({ isClicked }) => (isClicked ? "#272727" : "#C4C4C4")};
`;

export default Feed;
