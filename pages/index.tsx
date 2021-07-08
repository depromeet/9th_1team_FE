import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import RandomIcon from "public/home-random.svg";
import PlusIcon from "public/home-plus.svg";
import _ from "lodash";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  BALANCE_GAMES_LOGINED_QUERY,
  BALANCE_GAMES_QUERY,
  BALANCE_GAMES_TICK,
  NEXT_GAME_BY_RANDOM_QUERY,
} from "lib/queries";
import Header from "components/Header";
import FeedPost from "components/FeedPost/FeedPost";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addList } from "redux/postsSlice";
import { Container, Participate } from "./index.style";
import Today from "components/Today";

interface IndexProps {
  isLoggedin: boolean;
}

const Index: React.FC<IndexProps> = ({ isLoggedin }) => {
  const dispatch = useAppDispatch();
  const listData = useAppSelector((state) => state.posts.posts);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [qBalanceGames, { loading, data, refetch: loadGameFeed }] = useLazyQuery(
    isLoggedin ? BALANCE_GAMES_LOGINED_QUERY : BALANCE_GAMES_QUERY,
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
    if (!data) return;
    const newList = data?.balanceGames?.balanceGames;
    // 새로 들어온 데이터인지 확인(투표한 데이터인 경우 중복렌더링 방지)
    let isOldData = listData?.some((item: any) => item.id === newList[0].id);

    // 투표한 데이터일 경우 종료
    if (isOldData) return;

    // 새로 들어온 데이터일 경우
    if (newList.length < 1) {
      setHasMore(false);
    } else {
      dispatch(addList(newList));
      if (newList.length < BALANCE_GAMES_TICK) setHasMore(false);
    }
  }, [data, data?.balanceGames?.balanceGames, hasMore]);

  if (_.isEmpty(listData)) return null;

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

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Today isLoggedin={isLoggedin} updateLoading={updateLoading} setUpdateLoading={setUpdateLoading} />
      <Container>
        <div className='buttons'>
          <div className='buttons__btn' onClick={onClickRandomPlay}>
            <RandomIcon />
            <span>랜덤 플레이</span>
          </div>
          <div className='buttons__btn' onClick={onClickCreateGame}>
            <PlusIcon />
            <span>게임 만들기</span>
          </div>
        </div>
        <div className='selects'>
          <Participate {...{ isFiltered }} onClick={() => setIsFiltered(!isFiltered)}>
            {isFiltered ? <Select /> : <Unselect />}
          </Participate>
        </div>
        {listData && (
          <InfiniteScroll
            dataLength={listData.length}
            next={fetchMoreData}
            style={{ fontSize: 0 }}
            // inverse={true} //
            hasMore={hasMore}
            loader={<Loading />}
          >
            {listData.map((data, i) => (
              <FeedPost
                key={i}
                updateLoading={updateLoading}
                setUpdateLoading={setUpdateLoading}
                data={data}
              />
            ))}
          </InfiniteScroll>
        )}
      </Container>
    </div>
  );
};

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
