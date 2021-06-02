import styled from "styled-components";
import FeedPost from "components/FeedPost";
import Header from "components/Header/HomeHeader";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import { MouseEventHandler, useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

interface OrderButtonProps {
  isSelect: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  text: string;
}

const BALANCE_GAMES_TICK = 5;

const BALANCE_GAMES_QUERY = gql`
  query balanceGames($offset: Float!) {
    balanceGames(
      balanceGamesState: { limit: ${BALANCE_GAMES_TICK}, offset: $offset }
    ) {
      num
      balanceGames: balanceGame {
        id
        userId
        balanceGameSelectionVotesCount
        description
        totalVoteCount
        commentCount
        thumbs
        status
        mySelection
        createdAt
        updatedAt
        balanceGameSelections {
          id
          description
          backgroundColor
          textColor
        }
      }
    }
  }
`;

const Today = () => {
  return (
    <TodayContainer>
      <div className="title" style={{ fontSize: "1.6rem" }}>
        오늘의 밸런스게임
      </div>
      {/*<FeedPost />*/}
    </TodayContainer>
  );
};

const OrderButton = ({ isSelect, onClick, text }: OrderButtonProps) => (
  <Order {...{ isSelect, onClick }}>{text}</Order>
);

const Index = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isNewest, setIsNewest] = useState(true);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [qBalanceGames, { data }] = useLazyQuery(BALANCE_GAMES_QUERY);

  useEffect(() => {
    qBalanceGames({
      variables: {
        offset,
      },
    });
  }, [offset]);

  useEffect(() => {
    console.log(
      "data?.balanceGames?.balanceGames ::",
      data?.balanceGames?.balanceGames
    );

    const newList = data?.balanceGames?.balanceGames;
    if (newList) {
      setList(list.concat(newList));
    }
  }, [data]);

  if (_.isEmpty(list)) return null;

  // const balanceGames = data?.balanceGames?.balanceGames;

  const fetchMoreData = () => {
    const nextOffset = offset + BALANCE_GAMES_TICK;
    setOffset(nextOffset);
  };

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Today />
      <Container>
        <div className="buttons">
          <div className="buttons__btn">랜덤 플레이</div>
          <div className="buttons__btn">게임 만들기</div>
        </div>
        <div className="selects">
          <Participate
            {...{ isChecked }}
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked ? <Select /> : <Unselect />}
          </Participate>
          <div className="orders">
            <OrderButton
              isSelect={isNewest}
              onClick={() => setIsNewest(true)}
              text="최신순"
            />{" "}
            •{" "}
            <OrderButton
              isSelect={!isNewest}
              onClick={() => setIsNewest(false)}
              text="인기순"
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          style={{ fontSize: 0 }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {list.map((data, i) => {
            return <FeedPost key={i} data={data} />;
          })}
        </InfiniteScroll>
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
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

const Container = styled.div`
  background: white;
  padding: 1.55rem 1.6rem;
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    flex: 1;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4.8rem;
      font-weight: bold;
      font-size: 1.4rem;
      flex: 0.5;
      border: 1px solid #e9ecef;
      box-sizing: border-box;
      border-radius: 8px;
      letter-spacing: -0.05em;
    }
  }
  .selects {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4rem;
    margin-bottom: 1.6rem;
  }
  .orders {
    display: flex;
    align-items: center;
    color: #adb5bd;
    font-size: 1.3rem;
  }
`;

const Participate = styled.div<{ isChecked: boolean }>`
  ::after {
    content: "참여한 밸런스 게임만 보기";
    color: ${({ isChecked }) => (isChecked ? "#343A40" : "#ADB5BD")};
    margin-left: 0.5rem;
    font-size: 1.3rem;
  }
  display: flex;
  align-items: center;
`;

const Order = styled.div<{ isSelect: boolean }>`
  color: ${({ isSelect }) => (isSelect ? "#343A40" : "#ADB5BD")};
`;

export default Index;
