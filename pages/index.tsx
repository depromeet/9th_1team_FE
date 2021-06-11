import styled from "styled-components";
import Header from "components/Header";
import FeedPost from "components/FeedPost";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import RandomIcon from "public/home-random.svg";
import PlusIcon from "public/home-plus.svg";
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
          backgroundImage
          textColor
          voteCount
        }
      }
    }
  }
`;
const BALANCE_GAMES_LOGINED_QUERY = gql`
  query balanceGamesLogined($offset: Float!) {
    balanceGamesLogined(
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
          voteCount
          backgroundColor
          backgroundImage
          textColor
        }
      }
    }
  }
`;

const Today = () => {
  return (
    <TodayContainer>
      <div className="title">오늘의 밸런스게임</div>
      {/*<FeedPost />*/}
    </TodayContainer>
  );
};

const OrderButton = ({ isSelect, onClick, text }: OrderButtonProps) => (
  <Order {...{ isSelect, onClick }}>{text}</Order>
);

const Index = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isNewest, setIsNewest] = useState(true);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [qBalanceGames, { data }] = useLazyQuery(BALANCE_GAMES_QUERY);
  const [qBalanceGamesLogined, { data: loginData }] = useLazyQuery(
    BALANCE_GAMES_LOGINED_QUERY
  );

  useEffect(() => {
    console.log("rendered");
    qBalanceGames({
      variables: {
        offset,
      },
    });
    qBalanceGamesLogined({
      variables: {
        offset,
      },
    });
  }, [offset]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let newList;
    if (token) {
      newList = loginData?.balanceGamesLogined?.balanceGames;
    } else {
      newList = data?.balanceGames?.balanceGames;
    }
    if (newList) {
      setList(list.concat(newList));
    }
  }, [data, loginData]);

  useEffect(() => {
    setFilteredList(list.filter((item) => item.mySelection !== null));
    console.log(list);
  }, [list]);

  if (_.isEmpty(list)) return null;

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
          <div className="buttons__btn">
            <RandomIcon />
            <span>랜덤 플레이</span>
          </div>
          <div className="buttons__btn">
            <PlusIcon />
            <span>게임 만들기</span>
          </div>
        </div>
        <div className="selects">
          <Participate
            {...{ isFiltered }}
            onClick={() => setIsFiltered(!isFiltered)}
          >
            {isFiltered ? <Select /> : <Unselect />}
          </Participate>
          <div className="orders">
            <OrderButton
              isSelect={isNewest}
              onClick={() => setIsNewest(true)}
              text="최신순"
            />
            <span className="dot">•</span>
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
          {isFiltered
            ? filteredList.map((data, i) => <FeedPost key={i} data={data} />)
            : list.map((data, i) => <FeedPost key={i} data={data} />)}
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
    font-family: "NanumSquareRound";
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
`;

const Container = styled.div`
  background: white;
  padding: 1.55rem 1.6rem;
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    justify-content: space-between;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4.8rem;
      font-weight: bold;
      font-size: 1.4rem;
      flex: 0.49;
      border: 1px solid #e9ecef;
      box-sizing: border-box;
      border-radius: 8px;
      letter-spacing: -0.05em;
      span {
        margin-left: 0.4rem;
      }
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
  .dot {
    margin: 0 0.78rem;
  }
`;

const Participate = styled.div<{ isFiltered: boolean }>`
  ::after {
    content: "참여한 밸런스 게임만 보기";
    color: ${({ isFiltered }) => (isFiltered ? "#343A40" : "#ADB5BD")};
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
