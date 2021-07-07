import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import VS from "public/versus.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";
import FireBar from "components/FireBar/FireBar";
import { clipboardCopy } from "utils/common";
import { shareAPI } from "utils/mobileShare";
import {
  ApolloQueryResult,
  gql,
  QueryLazyOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import OptionBox from "components/OptionBox/OptionBox";
import { GET_GAME, GET_GAME_NOT_LOGIN, MY_GAMES } from "lib/queries";
import { truncate } from "fs";
import { MoreMenu, Container, VoteWrapper, Versus } from "./FeedPost.style";

interface FeedPostProps {
  updateLoading: boolean;
  setUpdateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedList: never[];
  setFeedList: React.Dispatch<React.SetStateAction<never[]>>;
  data?: any;
  loadGameFeed:
    | ((variables?: Partial<Record<string, any>> | undefined) => Promise<ApolloQueryResult<any>>)
    | undefined;
  isLoggedin: boolean;
}

// data: 모든 각 게임정보 myGames: 내가 만든 게임
const FeedPost: React.FC<FeedPostProps> = ({
  feedList,
  updateLoading,
  setUpdateLoading,
  setFeedList,
  data,
  loadGameFeed,
  isLoggedin,
}) => {
  //const id = data.id;
  const [checkedId, setCheckedId] = useState(null);
  const [balanceA, balanceB] = data.balanceGameSelections;
  const [isMine, setIsMine] = useState(false);
  const [votedCountA, setVotedCountA] = useState(0);
  const [votedCountB, setVotedCountB] = useState(0);
  const baseURL = process.env.NEXT_PUBLIC_DOMAIN;
  //console.log("########", data, checkedId);
  const { data: myGames } = useQuery(MY_GAMES);

  useEffect(() => {
    if (data.mySelection) {
      setCheckedId(data.mySelection);
    }
  }, [data.mySelection]);

  const [isMoreOpened, setIsMoreOpened] = useState(false);

  useEffect(() => {
    if (!updateLoading) {
      setVotedCountA(data?.balanceGameSelections[0].voteCount);
      setVotedCountB(data?.balanceGameSelections[1].voteCount);
      console.log(data.balanceGameSelections[0].description, votedCountA);
      console.log(data.balanceGameSelections[1].description, votedCountB);
    }
  }, [updateLoading, data?.balanceGameSelections[0].voteCount, data?.balanceGameSelections[1].voteCount]);

  const [isVoted, setIsVoted] = useState(false);
  useEffect(() => {
    setIsVoted(false);
    if (myGames) {
      myGames?.myGames.balanceGames.forEach((game: any) => {
        if (game.id === data.id) setIsMine(true);
      });
    }
  }, []);

  const renderShare = () => {
    if (typeof window.navigator.share === "undefined") {
      return null;
    } else {
      return (
        <div
          className='content__buttons__button'
          onClick={() => shareAPI(balanceA.description, balanceB.description, baseURL as string)}
        >
          <Share />
          <span style={{ marginLeft: "0.4rem" }}>공유하기</span>
        </div>
      );
    }
  };

  return (
    <Container onClick={() => setIsMoreOpened(false)}>
      <VoteWrapper>
        <OptionBox
          key={balanceA.id}
          setUpdateLoading={setUpdateLoading}
          isFeed={true}
          loadGameFeed={loadGameFeed}
          postId={data.id}
          selection={balanceA}
          {...{ checkedId, setCheckedId, setIsVoted }}
        />
        <OptionBox
          key={balanceB.id}
          setUpdateLoading={setUpdateLoading}
          isFeed={true}
          loadGameFeed={loadGameFeed}
          postId={data.id}
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
              voteCountA={votedCountA}
              voteCountB={votedCountB}
              isVoted={isVoted}
              fistColor={balanceA.backgroundColor}
              secondColor={balanceB.backgroundColor}
            />
          )}
        </Versus>
      </VoteWrapper>

      <div className='content'>
        <Link href={`/article/${data.id}`}>
          <div className='content__info'>
            <div className='content__title'>{data.description}</div>
            <div className='content__state'>
              <div>
                참여 {data.totalVoteCount} • 의견 {data.commentCount} • {modifyDate(data.createdAt)}
              </div>
            </div>
          </div>
        </Link>
        <div className='content__buttons'>
          <Link href={`/article/${data.id}`}>
            <div className='content__buttons__button'>
              <Opinion />
            </div>
          </Link>
          {renderShare()}
          <div
            className='content__buttons__button'
            onClick={(e) => {
              e.stopPropagation();
              setIsMoreOpened(true);
            }}
          >
            <More />
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className='content__headermore'
          style={{
            bottom: isMine ? "2.5rem" : "-2rem",
            visibility: isMoreOpened ? "visible" : "hidden",
          }}
        >
          {JSON.stringify(isMine)}
          <HeaderMore isMine={isMine} isOpen postId={data.id} />
        </div>
      </div>
    </Container>
  );
};

const REMOVE_BALANCE_GAME = gql`
  mutation removeBalanceGame($id: String!) {
    removeBalanceGame(id: $id)
  }
`;
interface IsMineProps {
  isMine: boolean;
  isOpen: boolean;
  postId?: string;
}
const HeaderMore: React.FC<IsMineProps> = ({ isMine, postId }) => {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/article/` + postId;

  const [mRemoveBalanceGame] = useMutation(REMOVE_BALANCE_GAME);
  const handleRemove = async () => {
    await mRemoveBalanceGame({
      variables: {
        id: postId,
      },
    });
    window.location.reload();
  };

  if (!isMine) {
    return (
      <MoreMenu>
        <li>
          <a onClick={() => clipboardCopy(url)}>URL복사하기</a>
        </li>
        {/* <li>
          <a>신고</a>
        </li> */}
      </MoreMenu>
    );
  } else {
    return (
      <MoreMenu>
        <li>
          <a onClick={() => clipboardCopy(url)}>URL복사하기</a>
        </li>
        {/* <li>
          <a>수정하기</a>
        </li> */}
        <li>
          <a onClick={handleRemove}>삭제</a>
        </li>
      </MoreMenu>
    );
  }
};

export default FeedPost;
