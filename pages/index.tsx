import styled from "styled-components";
import Header from "components/Header";
import FeedPost from "components/FeedPost";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import RandomIcon from "public/home-random.svg";
import PlusIcon from "public/home-plus.svg";
import { useEffect, useState } from "react";
import { useLazyQuery, gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import _ from "lodash";
import Loading from "../components/Loading";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import {
  GET_GAME,
  GET_GAME_NOT_LOGIN,
  NEXT_GAME_BY_RANDOM_QUERY,
} from "lib/queries";

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
          order
          status
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
    balanceGames: balanceGamesLogined(
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
          order
          status
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

// 일단 랜덤으로
const Today = ({ isLoggedin }: { isLoggedin: boolean }) => {
  const { data: nextGameData } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);
  const id = nextGameData?.nextGameByRandom?.id;

  const { data } = useQuery(isLoggedin ? GET_GAME : GET_GAME_NOT_LOGIN, {
    variables: { id },
  });

  if (data) console.log("asdf", data);

  return (
    <TodayContainer>
      <div className="title">오늘의 밸런스게임</div>
      <FeedPost data={data?.balanceGame} />
    </TodayContainer>
  );
};

// const OrderButton = ({ isSelect, onClick, text }: OrderButtonProps) => (
//   <Order {...{ isSelect, onClick }}>{text}</Order>
// );

interface IndexProps {
  isLoggedin: boolean;
}

const Index: React.FC<IndexProps> = ({ isLoggedin }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [qBalanceGames, { data }] = useLazyQuery(
    isLoggedin ? BALANCE_GAMES_LOGINED_QUERY : BALANCE_GAMES_QUERY
  );

  const { data: nextGameData } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);

  const router = useRouter();

  useEffect(() => {
    qBalanceGames({
      variables: {
        offset,
      },
    });
  }, [offset]);

  useEffect(() => {
    if (data) {
      const newList = data?.balanceGames?.balanceGames;
      if (newList) {
        if (newList.length === 0) {
          setHasMore(false);
        } else {
          setList(list.concat(newList));
        }
      }
    }
  }, [data]);

  if (_.isEmpty(list)) return null;

  const fetchMoreData = () => {
    const nextOffset = offset + BALANCE_GAMES_TICK;
    setOffset(nextOffset);
  };

  const onClickRandomPlay = () => {
    // router.push("/random/")
    const { id } = nextGameData?.nextGameByRandom;
    router.push(`/random/${id}`);
  };

  const onClickCreateGame = () => {
    router.push("/article/write");
  };

  const _list = isFiltered
    ? list.filter(
        (item: { mySelection: string | null }) => item.mySelection !== null
      )
    : list;

  console.log(_list);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Today {...{ isLoggedin }} />
      <Container>
        <div className="buttons">
          <div className="buttons__btn" onClick={onClickRandomPlay}>
            <RandomIcon />
            <span>랜덤 플레이</span>
          </div>
          <div className="buttons__btn" onClick={onClickCreateGame}>
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
          {/* <div className="orders">
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
          </div> */}
        </div>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          style={{ fontSize: 0 }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={hasMore}
          loader={<Loading />}
        >
          {_list.map((data, i) => (
            <FeedPost key={i} data={data} />
          ))}
        </InfiniteScroll>
      </Container>
    </div>
  );
};

const TodayContainer = styled.div`
  padding: 1.6rem;
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
      cursor: pointer;
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

// const Order = styled.div<{ isSelect: boolean }>`
//   color: ${({ isSelect }) => (isSelect ? "#343A40" : "#ADB5BD")};
// `;
export const getServerSideProps: GetServerSideProps = async function (context) {
  const { token } = nookies.get(context);
  const isLoggedin = !!token;

  return {
    props: {
      isLoggedin,
    },
  };
};

export default Index;
