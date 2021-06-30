import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import VS from "public/versus.svg";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";
import FireBar from "./FireBar/FireBar";
import { clipboardCopy, getBalanceGameSelections } from "../utils/common";
import { shareAPI } from "utils/mobileShare";
import { gql, useMutation, useQuery } from "@apollo/client";
import OptionBox from "./OptionBox/OptionBox";
import { MY_GAMES } from "lib/queries";

interface FeedPostProps {
  data?: any;
}

const FeedPost: React.FC<FeedPostProps> = ({ data }) => {
  const [checkedId, setCheckedId] = useState(null);
  const [balanceA, balanceB] = getBalanceGameSelections(data);
  const [isMine, setIsMine] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_DOMAIN;
  console.log("########", data, checkedId);

  useEffect(() => {
    if (data.mySelection) {
      setCheckedId(data.mySelection);
    }
  }, [data.mySelection]);

  const [isMoreOpened, setIsMoreOpened] = useState(false);

  const { data: myGames } = useQuery(MY_GAMES);

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
          className="content__buttons__button"
          onClick={() =>
            shareAPI(
              balanceA.description,
              balanceB.description,
              baseURL as string
            )
          }
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
          postId={data.id}
          selection={balanceA}
          {...{ checkedId, setCheckedId, setIsVoted }}
        />
        <OptionBox
          key={balanceB.id}
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
              voteCountA={balanceA.voteCount}
              voteCountB={balanceB.voteCount}
              isVoted={isVoted}
              fistColor={balanceA.backgroundColor}
              secondColor={balanceB.backgroundColor}
            />
          )}
        </Versus>
      </VoteWrapper>

      <div className="content">
        <Link href={`/article/${data.id}`}>
          <div className="content__info">
            <div className="content__title">{data.description}</div>
            <div className="content__state">
              <div>
                참여 {data.totalVoteCount} • 의견 {data.commentCount} •{" "}
                {modifyDate(data.createdAt)}
              </div>
            </div>
          </div>
        </Link>
        <div className="content__buttons">
          <Link href={`/article/${data.id}`}>
            <div className="content__buttons__button">
              <Opinion />
            </div>
          </Link>
          {renderShare()}
          <div
            className="content__buttons__button"
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
          className="content__headermore"
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

const Container = styled.div`
  width: 100%;
  height: 36rem;
  overflow: hidden;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  margin-bottom: 2.5rem;
  background: white;
  position: relative;
  box-sizing: border-box;
  .content {
    padding-bottom: 1rem;
    color: #606060;
    position: relative;
    &__info {
      padding: 1rem 0;
      cursor: pointer;
    }
    &__title {
      display: block;
      padding: 0 0.8rem 0.3rem 0.8rem;
      color: #222222;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > a {
        text-decoration: none;
        color: inherit;
      }
    }
    &__state {
      padding: 0 0.8rem;
      display: flex;
      margin-top: 0.4rem;
      font-size: 1.1rem;
      line-height: 1.6rem;
      color: #868e96;
    }
    &__buttons {
      padding: 1.3rem 0.8rem;
      border: 0 solid #e9ecef;
      border-top-width: 0.1rem;
      display: flex;
      font-size: 1.3rem;
      color: #343a40;
      font-weight: 500;
      &__button {
        display: flex;
        align-items: center;
        :first-child {
          ::after {
            content: "의견 쓰기";
            margin-left: 0.4rem;
          }
        }
        :nth-child(2) {
          margin-left: 1.4rem;
        }
        :last-child {
          margin-left: auto;
        }
      }
    }
  }
`;

const VoteWrapper = styled.div`
  position: relative;
`;

const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MoreMenu = styled.ul`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 140px;
  position: absolute;
  right: -3rem;
  bottom: 4.5rem;
  z-index: 2;
  background-color: #fff;
  margin-right: 1.6rem;

  li a {
    display: inline-block;
    width: 100%;
    padding: 15px 0 15px 16px;
    font-size: 1.3rem;
    border-bottom: 1px solid #e9ecef;
    box-sizing: border-box;
  }
  li:last-child a {
    border-bottom: none;
  }
`;

export default FeedPost;
