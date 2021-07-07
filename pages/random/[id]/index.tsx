import { gql, useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import Comments from "components/Comment/Comments";
import Header from "components/Header";
import NextGameIcon from "public/game-next.svg";
import ShareIcon from "public/top-share.svg";
import MoreIcon from "public/top-more.svg";
import VS from "public/versus.svg";
import React, { useEffect, useRef, useState } from "react";
import HeaderMore from "components/DetailContent/HederMore";
import { GetServerSideProps } from "next";
import Share from "components/Share/Share";
import { modifyDate } from "utils/date";
import { useRouter } from "next/router";
import nookies from "nookies";
import OptionBox from "components/OptionBox/OptionBox";
import FireBar from "components/FireBar/FireBar";
import { GET_GAME, GET_GAME_NOT_LOGIN, MY_GAMES, NEXT_GAME_BY_RANDOM_QUERY } from "lib/queries";
import { DetailWrapper, VoteWrapper, Versus } from "./index.style";

interface PostProps {
  id: string;
  isLoggedin: boolean;
}

//주소 article/a9e61383-165f-4caf-924e-1994de4a1ff2

const Post: React.FC<PostProps> = ({ id, isLoggedin }) => {
  const router = useRouter();
  const {
    loading,
    data,
    refetch: loadGame,
  } = useQuery(isLoggedin ? GET_GAME : GET_GAME_NOT_LOGIN, {
    variables: { id },
  });
  const { data: myGames } = useQuery(MY_GAMES);
  const { data: nextGameData, refetch } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);

  const [isOpen, setIsOpen] = useState(false);
  const [mySelection, setMySelection] = useState<string | null>("");
  const mobileShareRef = useRef<HTMLDivElement>(null);
  const [isMine, setIsMine] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [checkedId, setCheckedId] = useState(null);
  const [votedCountA, setVotedCountA] = useState(0);
  const [votedCountB, setVotedCountB] = useState(0);

  useEffect(() => {
    loadGame();
    console.log("여기는 첫로드");
  }, []);

  useEffect(() => {
    if (data?.balanceGame.mySelection) {
      setCheckedId(data?.balanceGame.mySelection);
    }
  }, [data?.balanceGame.mySelection]);

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setVotedCountA(data?.balanceGame?.balanceGameSelections[0]?.voteCount);
      setVotedCountB(data?.balanceGame?.balanceGameSelections[1]?.voteCount);
    }
  }, [data?.balanceGame]);

  useEffect(() => {
    if (data && myGames) {
      myGames?.myGames.balanceGames.forEach((game: any) => {
        if (game.id === data?.balanceGame.id) setIsMine(true);
      });
    }
  }, [myGames, data]);

  useEffect(() => {
    refetch();
  }, [id]);

  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/article/` + id;
  useEffect(() => {
    setMySelection(data?.balanceGame?.mySelection);
    setIsVoted(data?.balanceGame?.mySelection);
  }, [data?.balanceGame?.mySelection]);

  const toggleMore = () => {
    setIsOpen((prev) => !prev);
  };

  if (!data) return null;

  const [balanceA, balanceB] = data?.balanceGame?.balanceGameSelections;

  const onUseShareAPI = () => {
    // HTTPS 에서만 동작, 확인 필요
    if (typeof navigator.share === "undefined") {
      (mobileShareRef.current as HTMLElement).style.visibility = "hidden";
    }
    window.navigator.share({
      title: "토맛토",
      text: `${balanceA.description} vs ${balanceB.description}, 당신의 선택은?`,
      url: shareURL,
    });
  };

  const onClickPrevGame = () => {
    // router.back();
    console.log(document.referrer);
  };
  const onClickNextGame = () => {
    const { id } = nextGameData?.nextGameByRandom;
    console.log(id);
    if (id) router.push(`/random/${id}`);
  };

  const mySelectionColor = data?.balanceGame?.balanceGameSelections.find(
    (balanceGameSelection: any) => balanceGameSelection.id === mySelection,
  )?.backgroundColor;

  return (
    <DetailWrapper>
      <Header>
        <div className='icon' ref={mobileShareRef}>
          <ShareIcon onClick={onUseShareAPI} />
        </div>
        <div className='icon'>
          <MoreIcon onClick={toggleMore} />
        </div>
      </Header>
      <HeaderMore postId={data?.balanceGame?.id} isMine={isMine} isOpen={isOpen} />
      <nav>
        <div className='prev' onClick={onClickPrevGame}>
          {/* <PrevGameIcon />
          <span>이전 게임</span> */}
        </div>
        <div className='next' onClick={onClickNextGame}>
          <span>다음 게임</span>
          <NextGameIcon />
        </div>
      </nav>
      <div className='contents__wrapper'>
        <VoteWrapper>
          <OptionBox
            key={balanceA.id}
            isFeed={false}
            postId={id}
            selection={balanceA}
            loadGame={loadGame}
            {...{ checkedId, setCheckedId, setIsVoted }}
          />
          <OptionBox
            key={balanceB.id}
            isFeed={false}
            postId={id}
            selection={balanceB}
            loadGame={loadGame}
            {...{ checkedId, setCheckedId, setIsVoted }}
          />
          <Versus>
            {checkedId === null ? (
              <VS />
            ) : (
              <FireBar
                checkedId={checkedId}
                idA={balanceA.id}
                idB={balanceB.id}
                voteCountA={votedCountA}
                voteCountB={votedCountB}
                isVoted={isVoted}
                fistColor={balanceA.backgroundColor}
                secondColor={balanceB.backgroundColor}
              />
            )}
          </Versus>
        </VoteWrapper>
        <div className='status'>
          <div className='left'>
            <div className='fake__image' />
            <div className='play__wrapper'>
              <p className='play-ment'>따끈따끈한 밸런스 게임</p>
              <span className='play-count'>{data?.balanceGame.description}</span>
            </div>
          </div>
          <span className='comment-count'>의견 {data?.balanceGame.commentCount}</span>
        </div>
        <div className='contents'>
          <p>{data.description}</p>
          <span className='author'>made by {data?.balanceGame?.user?.profile?.nickname}</span>
          <span> • </span>
          <span className='pub-date'>{modifyDate(data?.balanceGame?.createdAt)}</span>
        </div>{" "}
        <Share url={shareURL} text={`${balanceA.description} vs ${balanceB.description}, 당신의 선택은?`} />
        <nav>
          <div className='prev' onClick={onClickPrevGame}>
            {/*<PrevGameIcon />*/}
            {/*<span>이전 게임</span>*/}
          </div>
          <div className='next' onClick={onClickNextGame}>
            <span>다음 게임</span>
            <NextGameIcon />
          </div>
        </nav>
      </div>
      <Comments
        isLoggedin={isLoggedin}
        mySelectionColor={mySelectionColor}
        id={id}
        commentCount={data?.balanceGame?.commentCount}
      />
    </DetailWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { id } = context.query;
  const { token } = nookies.get(context);
  const isLoggedin = !!token;

  return {
    props: {
      id,
      isLoggedin,
    },
  };
};

export default Post;
