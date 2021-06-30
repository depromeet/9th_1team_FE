import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Comments from 'components/Comment/Comments';
import Header from 'components/Header';
import NextGameIcon from '../../../public/game-next.svg';
import ShareIcon from '../../../public/top-share.svg';
import MoreIcon from '../../../public/top-more.svg';
import VS from 'public/versus.svg';
import React, { useEffect, useRef, useState } from 'react';
import HeaderMore from '../../../components/DetailContent/HederMore';
import { GetServerSideProps } from 'next';
import Share from 'components/Share/Share';
import { modifyDate } from 'utils/date';
import { useRouter } from 'next/router';
import { getBalanceGameSelections } from '../../../utils/common';
import nookies from 'nookies';
import OptionBox from 'components/OptionBox/OptionBox';
import FireBar from 'components/FireBar/FireBar';

interface PostProps {
  id: string;
  isLoggedin: boolean;
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

const VoteWrapper = styled.div``;

const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 25.6rem;
`;

//주소 article/a9e61383-165f-4caf-924e-1994de4a1ff2

const GET_GAME = gql`
  query balanceGameLogined($id: String!) {
    balanceGame: balanceGameLogined(id: $id) {
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
        voteCount
        balanceGameId
        backgroundImage
        backgroundColor
        textColor
        description
      }
    }
  }
`;

const GET_GAME_NOT_LOGIN = gql`
  query balanceGameNotLogined($id: String!) {
    balanceGame: balanceGameNotLogined(id: $id) {
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

const NEXT_GAME_BY_RANDOM_QUERY = gql`
  query nextGameByRandom {
    nextGameByRandom {
      id
    }
  }
`;

const MY_GAMES = gql`
  query myGames {
    myGames {
      balanceGames: balanceGame {
        id
        totalVoteCount
        commentCount
        balanceGameSelections {
          order
          description
          backgroundColor
          backgroundImage
          textColor
        }
      }
    }
  }
`;

const Post: React.FC<PostProps> = ({ id, isLoggedin }) => {
  const router = useRouter();
  const { data } = useQuery(isLoggedin ? GET_GAME : GET_GAME_NOT_LOGIN, {
    variables: { id },
  });
  const { data: myGames } = useQuery(MY_GAMES);
  const { data: nextGameData, refetch } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);

  const [isOpen, setIsOpen] = useState(false);
  const [mySelection, setMySelection] = useState<string | null>('');
  const mobileShareRef = useRef<HTMLDivElement>(null);
  const [isMine, setIsMine] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [checkedId, setCheckedId] = useState(null);

  useEffect(() => {
    setIsVoted(false);
  }, []);

  useEffect(() => {
    if (data?.balanceGame.mySelection) {
      setCheckedId(data?.balanceGame.mySelection);
    }
  }, [data?.balanceGame.mySelection]);

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

  const [balanceA, balanceB] = getBalanceGameSelections(data?.balanceGame);

  const onUseShareAPI = () => {
    // HTTPS 에서만 동작, 확인 필요
    if (typeof navigator.share === 'undefined') {
      (mobileShareRef.current as HTMLElement).style.visibility = 'hidden';
    }
    window.navigator.share({
      title: '토맛토',
      text: `${balanceA.description} vs ${balanceB.description}, 당신의 선택은?`,
      url: shareURL,
    });
  };

  const onClickPrevGame = () => {
    router.back();
  };
  const onClickNextGame = () => {
    const { id } = nextGameData?.nextGameByRandom;
    router.push(`/article/${id}`);
  };

  const mySelectionColor = data?.balanceGame?.balanceGameSelections.find(
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
      <HeaderMore
        postId={data?.balanceGame?.id}
        isMine={isMine}
        isOpen={isOpen}
      />
      <div className="contents__wrapper">
        <VoteWrapper>
          <OptionBox
            key={balanceA.id}
            postId={id}
            selection={balanceA}
            {...{ checkedId, setCheckedId, setIsVoted }}
          />
          <OptionBox
            key={balanceB.id}
            postId={id}
            selection={balanceB}
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
                voteCountA={balanceA.voteCount}
                voteCountB={balanceB.voteCount}
                isVoted={isVoted}
                fistColor={balanceA.backgroundColor}
                secondColor={balanceB.backgroundColor}
              />
            )}
          </Versus>
        </VoteWrapper>
        <div className="status">
          <div className="left">
            <div className="fake__image" />
            <div className="play__wrapper">
              <p className="play-ment">따끈따끈한 밸런스 게임</p>
              <span className="play-count">
                {data?.balanceGame.description}
              </span>
            </div>
          </div>
          <span className="comment-count">
            의견 {data?.balanceGame.commentCount}
          </span>
        </div>
        <div className="contents">
          <p>{data.description}</p>
          <span className="author">
            made by {data?.balanceGame?.user?.profile?.nickname}
          </span>
          <span> • </span>
          <span className="pub-date">
            {modifyDate(data?.balanceGame?.createdAt)}
          </span>
        </div>{' '}
        <Share
          url={shareURL}
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
