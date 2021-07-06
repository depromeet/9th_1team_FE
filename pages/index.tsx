import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import RandomIcon from "public/home-random.svg";
import PlusIcon from "public/home-plus.svg";
import _ from "lodash";
import { useLazyQuery } from "@apollo/client";
import {
  BALANCE_GAMES_LOGINED_QUERY,
  BALANCE_GAMES_QUERY,
  BALANCE_GAMES_TICK,
} from "lib/queries";
import FeedPost from "components/FeedPost";
import Header from "components/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "components/Loading";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addList } from "redux/postsSlice";

interface IndexProps {
  isLoggedin: boolean;
}

const Index: React.FC<IndexProps> = ({ isLoggedin }) => {
  const dispatch = useAppDispatch();
  const listData = useAppSelector((state) => state.posts.posts);
  const [updateLoding, setUpdateLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [list, setList] = useState([]);
  const [qBalanceGames, { loading, data, refetch: loadGameFeed }] =
    useLazyQuery(
      isLoggedin ? BALANCE_GAMES_LOGINED_QUERY : BALANCE_GAMES_QUERY
    );
  const router = useRouter();

  useEffect(() => {
    qBalanceGames({
      variables: {
        offset,
      },
    });
  }, [offset]);

  useEffect(() => {
    if (!data) return;
    const newList = data?.balanceGames?.balanceGames;
    // 새로 들어온 데이터인지 확인(투표한 데이터인 경우 중복렌더링 방지)
    let isOldData = listData?.some((item: any) => item.id === newList[0].id);
    // 투표한 데이터일 경우 다시 데이터를 세팅하고 종료
    if (isOldData) {
      console.log("투표데이터 들어옴!!--->>>>", newList);

      // 투표한 데이터와 기존 데이터 비교해서 list의 정보 업데이트 하면될듯
      console.log("load~!@##&$*(&@$(@&#*@(^#@(");
      return;
    }

    // 새로 들어온 데이터일 경우
    if (newList.length < 1) setHasMore(false);
    else {
      dispatch(addList(newList));
      if (newList.length < BALANCE_GAMES_TICK) setHasMore(false);
    }
  }, [data, data?.balanceGames?.balanceGames]);

  if (_.isEmpty(listData)) return null;

  const fetchMoreData = () => {
    const nextOffset = offset + BALANCE_GAMES_TICK;
    setOffset(nextOffset);
  };

  const onClickRandomPlay = () => {
    alert("아직 준비중인 서비스입니다. 조금만 기다려주세요!");
  };

  const onClickCreateGame = () => {
    router.push("/article/write");
  };

  return (
    <div style={{ width: "100%" }}>
      <Header />
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
        </div>
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          style={{ fontSize: 0 }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={hasMore}
          loader={<Loading />}
        >
          {listData &&
            listData.map((data, i) => (
              <FeedPost
                key={i}
                updateLoading={updateLoding}
                setUpdateLoading={setUpdateLoading}
                feedList={list}
                setFeedList={setList}
                data={data}
                loadGameFeed={loadGameFeed}
                isLoggedin={isLoggedin}
              />
            ))}
        </InfiniteScroll>
      </Container>
    </div>
  );
};

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
