import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import RadioBox from "components/DetailContent/RadioBox";
import Comments from "components/Comment/Comments";
import Header from "components/Header";
// import PrevGameIcon from "../../../public/game-prev.svg";
import NextGameIcon from "../../../public/game-next.svg";
import ShareIcon from "../../../public/top-share.svg";
import MoreIcon from "../../../public/top-more.svg";
import React, { useEffect, useRef, useState } from "react";
import HeaderMore from "../../../components/DetailContent/HederMore";
import { GetServerSideProps } from "next";
import Share from "components/Share/Share";
import { modifyDate } from "utils/date";
import { useRouter } from "next/router";
import { getBalanceGameSelections } from "../../../utils/common";

interface PostProps {
  id: string;
}

const DetailWrapper = styled.div`
  .contents__wrapper {
    padding: 0 1.6rem;
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.4rem 0 1rem;
    p,
    span {
      font-size: 1.2rem;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  .contents p {
    font-size: 1.4rem;
    line-height: 2.45rem;
    margin-bottom: 0.5rem;
  }
  .contents span {
    font-size: 1.2rem;
    color: #868e96;
  }
  .fake__image {
    width: 2rem;
    height: 2rem;
    background-color: tomato;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .play__wrapper {
    display: flex;
    flex-direction: column;
  }
  .play-ment {
    margin: 0;
    color: #e56f53;
    line-height: 1.7rem !important;
    font-weight: 500;
  }
  .play-count {
    line-height: 1.7rem !important;
  }
  .comment-count {
    display: inline-block;
    width: 7rem;
    line-height: 3rem;
    border: 1px solid #868e96;
    border-radius: 15px;
    text-align: center;
    color: #868e96;
    font-weight: 500;
    box-sizing: border-box;
  }

  .icon {
    &:first-child {
      margin-right: 1.4rem;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.3rem;
  }
  .prev,
  .next {
    display: flex;
    font-size: 1.3rem;
    line-height: 2rem;
    align-items: center;
    span {
      font-weight: 500;
    }
  }
`;

//주소 article/a9e61383-165f-4caf-924e-1994de4a1ff2

const GET_GAME = gql`
  query balanceGameLogined($id: String!) {
    balanceGameLogined(id: $id) {
      id
      userId
      description
      mySelection
      commentCount
      createdAt
      user {
        profile {
          nickname
        }
      }
      balanceGameSelections {
        id
        order
        balanceGameId
        backgroundImage
        backgroundColor
        textColor
        description
      }
    }
  }
`;

const CREATE_VOTE_LOGINED_MUTATION = gql`
  mutation createVoteLogined(
    $balanceGameId: String!
    $balanceGameSelectionId: String!
  ) {
    createVoteLogined(
      createBalanceGameSelectionVoteInput: {
        balanceGameId: $balanceGameId
        balanceGameSelectionId: $balanceGameSelectionId
      }
    ) {
      id
    }
  }
`;

const NEXT_GAME_BY_RANDOM_QUERY = gql`
  query nextGameByRandom {
    nextGameByRandom {
      id
    }
  }
`;

// 추후 사용
const UPDATE_VOTE_LOGINED_MUTATION = gql`
  mutation updateVoteLogined(
    $balanceGameId: String!
    $newBalanceGameSelectionId: String!
  ) {
    updateVoteLogined(
      updateBalanceGameSelectionVoteInput: {
        balanceGameId: $balanceGameId
        newBalanceGameSelectionId: $newBalanceGameSelectionId
      }
    ) {
      id
    }
  }
`;

const REMOVE_VOTE_LOGINED = gql`
  mutation removeVoteLogined($balanceGameId: String!) {
    removeVoteLogined(balanceGameId: $balanceGameId) {
      id
    }
  }
`;

const Post: React.FC<PostProps> = ({ id }) => {
  const router = useRouter();
  const { data } = useQuery(GET_GAME, { variables: { id } });
  const { data: nextGameData, refetch } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED_MUTATION);
  const [mUpdateVoteLogined] = useMutation(UPDATE_VOTE_LOGINED_MUTATION);
  const [mRemoveVoteLogined] = useMutation(REMOVE_VOTE_LOGINED);
  const [isOpen, setIsOpen] = useState(false);
  const [mySelection, setMySelection] = useState("");
  const mobileShareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refetch();
  }, [id]);

  const baseURL = "http://localhost:3000";
  // `${baseURL}/article/${id}` 로 적용해서 Share url={} <- 여기 넣어주기
  // facebook 공유는 localhost에서 확인불가.
  useEffect(() => {
    setMySelection(data?.balanceGameLogined?.mySelection);
    console.log("선택", data?.balanceGameLogined?.mySelection);
  }, [data?.balanceGameLogined?.mySelection]);

  const toggleMore = () => {
    setIsOpen((prev) => !prev);
  };

  if (!data) return null;

  const [balanceA, balanceB] = getBalanceGameSelections(
    data?.balanceGameLogined
  );

  const onChangeVote =
    (balanceGameId = "", balanceGameSelectionId = "") =>
    async () => {
      // 첫 투표시에만
      setMySelection(balanceGameSelectionId);
      if (!data?.balanceGameLogined?.mySelection) {
        await mCreateVoteLogined({
          variables: {
            balanceGameId,
            balanceGameSelectionId,
          },
        });
      } else {
        // 첫투표가 아닐경우
        if (data?.balanceGameLogined?.mySelection === balanceGameSelectionId)
          return;
        await mRemoveVoteLogined({
          variables: {
            balanceGameId,
          },
        });
        await mCreateVoteLogined({
          variables: {
            balanceGameId,
            balanceGameSelectionId,
          },
        });
      }
    };

  const onUseShareAPI = () => {
    // HTTPS 에서만 동작, 확인 필요
    if (typeof navigator.share === "undefined") {
      (mobileShareRef.current as HTMLElement).style.visibility = "hidden";
    }
    window.navigator.share({
      title: "토맛토",
      text: `${balanceA.description} vs ${balanceB.description}, 당신의 선택은?`,
      url: baseURL,
    });
  };

  const onClickPrevGame = () => {
    router.back();
  };
  const onClickNextGame = () => {
    const { id } = nextGameData?.nextGameByRandom;
    router.push(`/article/${id}`);
  };

  const mySelectionColor = data?.balanceGameLogined?.balanceGameSelections.find(
    (balanceGameSelection: any) => balanceGameSelection.id === mySelection
  )?.backgroundColor;

  return (
    <DetailWrapper>
      <Header>
        <div className="icon" ref={mobileShareRef}>
          <ShareIcon onClick={onUseShareAPI} />
        </div>
        <div className="icon">
          <MoreIcon onClick={toggleMore} />
        </div>
      </Header>
      <HeaderMore isMine={false} isOpen={isOpen} />
      <div className="contents__wrapper">
        <RadioBox
          balanceGameId={data?.balanceGameLogined?.id}
          balanceA={balanceA}
          balanceB={balanceB}
          onChange={onChangeVote}
          value={mySelection}
        />
        <div className="status">
          <div className="left">
            <div className="fake__image" />
            <div className="play__wrapper">
              <p className="play-ment">따끈따끈한 밸런스 게임</p>
              <span className="play-count">
                {data?.balanceGameLogined.description}
              </span>
            </div>
          </div>
          <span className="comment-count">
            의견 {data?.balanceGameLogined.commentCount}
          </span>
        </div>
        <div className="contents">
          <p>{data.description}</p>
          <span className="author">
            made by {data?.balanceGameLogined?.user?.profile?.nickname}
          </span>
          <span> • </span>
          <span className="pub-date">
            {modifyDate(data?.balanceGameLogined?.createdAt)}
          </span>
        </div>{" "}
        <Share
          url={baseURL}
          text={`${balanceA.description} vs ${balanceB.description}, 당신의 선택은?`}
        />
        <nav>
          <div className="prev" onClick={onClickPrevGame}>
            {/*<PrevGameIcon />*/}
            {/*<span>이전 게임</span>*/}
          </div>
          <div className="next" onClick={onClickNextGame}>
            <span>다음 게임</span>
            <NextGameIcon />
          </div>
        </nav>
      </div>
      <Comments mySelectionColor={mySelectionColor} id={id} />
    </DetailWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

export default Post;
