import styled from "styled-components";
import Header from "components/Header";
import FeedPost from "components/FeedPost/FeedPost";
import Select from "public/check-circle-participate.svg";
import Unselect from "public/circle-participate.svg";
import RandomIcon from "public/home-random.svg";
import PlusIcon from "public/home-plus.svg";
import { useEffect, useState } from "react";
import { useLazyQuery, gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import _ from "lodash";
import Loading from "components/Loading/Loading";
import {
  BALANCE_GAMES_LOGINED_QUERY,
  BALANCE_GAMES_QUERY,
  BALANCE_GAMES_TICK,
} from "lib/queries";

// interface OrderButtonProps {
//   isSelect: boolean;
//   onClick: MouseEventHandler<HTMLDivElement>;
//   text: string;
// }

// const Today = () => {
//   return (
//     <TodayContainer>
//       <div className="title">오늘의 밸런스게임</div>
//       {/*<FeedPost />*/}
//     </TodayContainer>
//   );
// };

// const OrderButton = ({ isSelect, onClick, text }: OrderButtonProps) => (
//   <Order {...{ isSelect, onClick }}>{text}</Order>
// );

interface IndexProps {
  isLoggedin: boolean;
}

// 이 컴포넌트는 참고용 컴포넌트임
// 에러로 인해 index에 코드 새로 작성
const FeedPosts: React.FC<IndexProps> = ({ isLoggedin }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [qBalanceGames, { loading, data, refetch: loadGameFeed }] =
    useLazyQuery(
      isLoggedin ? BALANCE_GAMES_LOGINED_QUERY : BALANCE_GAMES_QUERY,
      {
        notifyOnNetworkStatusChange: true,
        onCompleted(data) {
          console.log("-- -- --feedPosts --", data);
        },
      }
    );
  const router = useRouter();

  useEffect(() => {
    qBalanceGames({
      variables: {
        offset,
      },
    });
  }, [offset]);

  // useEffect(() => {
  //   if(!loading && data) {

  //   }
  // },[data])

  useEffect(() => {
    if (data) {
      const newList = data?.balanceGames?.balanceGames;
      if (newList.length === 0) {
        console.log("length가 0 임", newList);
        setHasMore(false);
      } else {
        console.log("length가 0 이 아님", newList);
        setList(list.concat(newList));
        console.log("의심>>>>>>>>>>>", list);
      }
    }
  }, [data]);

  if (_.isEmpty(list)) return null;

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

  const _list = isFiltered
    ? list.filter(
        (item: { mySelection: string | null }) => item.mySelection !== null
      )
    : list;

  console.log("리스트", _list);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <button
        onClick={() => {
          if (loadGameFeed) loadGameFeed();
        }}
      >
        눌러봐
      </button>
      {/* <Today /> */}
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
            <FeedPost
              key={i}
              data={data}
              loading={loading}
              loadGameFeed={loadGameFeed}
              isLoggedin={isLoggedin}
            />
          ))}
        </InfiniteScroll>
      </Container>
    </div>
  );
};

// const TodayContainer = styled.div`
//   padding: 1.6rem;
//   margin-top: 5.2rem;
//   margin-bottom: -2.5rem;
//   background: #f8f9fa;
//   .title {
//     font-family: "NanumSquareRound";
//     font-size: 1.6rem;
//     font-weight: 800;
//     margin-bottom: 1rem;
//   }
// `;

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

export default FeedPosts;
