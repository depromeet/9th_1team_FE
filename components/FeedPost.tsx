import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import VS from "public/versus.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";
import FireBar from "./FireBar/FireBar";
import { getBalanceGameSelections } from "../utils/common";
import { shareAPI } from "utils/mobileShare";
import { gql, useMutation } from "@apollo/client";
import HeaderMore from "./DetailContent/HederMore";

interface OptionBoxProps {
  selection: any;
  postId: string;
  checkedId: string | null;
  setCheckedId: Dispatch<SetStateAction<string | null>>;
  setIsVoted: Dispatch<SetStateAction<boolean>>;
}

const CREATE_VOTE_LOGINED = gql`
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
const CREATE_VOTE_NOT_LOGINED = gql`
  mutation createVoteNotLogined(
    $balanceGameId: String!
    $balanceGameSelectionId: String!
  ) {
    createVoteNotLogined(
      createBalanceGameSelectionVoteInput: {
        balanceGameId: $balanceGameId
        balanceGameSelectionId: $balanceGameSelectionId
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

const OptionBox = ({
  selection,
  checkedId,
  postId,
  setCheckedId,
  setIsVoted,
}: OptionBoxProps) => {
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED);
  const [mCreateVoteNotLogined] = useMutation(CREATE_VOTE_NOT_LOGINED);
  const [mRemoveVoteLogined] = useMutation(REMOVE_VOTE_LOGINED);

  const token = localStorage.getItem("token");

  console.log(checkedId);
  useEffect(() => {
    const checkedList = localStorage.getItem("checkedList")?.split(",");
    checkedList?.forEach((item) => {
      if (item === selection.id) setCheckedId(item);
    });
  }, []);

  const handleVote = async (selectionId: string) => {
    setIsVoted(true);
    // 로그인이면
    if (token) {
      if (checkedId === null) {
        // 새로 create
        setCheckedId(selectionId);
        await mCreateVoteLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      } else {
        // remove
        setCheckedId(null);
        await mRemoveVoteLogined({
          variables: {
            balanceGameId: postId,
          },
        });
        if (checkedId !== selectionId) {
          // 다른걸로 변경
          setCheckedId(selectionId);
          await mCreateVoteLogined({
            variables: {
              balanceGameId: postId,
              balanceGameSelectionId: selectionId,
            },
          });
        }
      }
    } else {
      const checkedList =
        (localStorage.getItem("checkedList")?.split(",") as string[]) || [];
      if (checkedId === null) {
        // 새로 create
        setCheckedId(selectionId);
        checkedList?.push(selectionId);
        await mCreateVoteNotLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      } else {
        // remove
        setCheckedId(null);
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i] === checkedId) {
            checkedList.splice(i, 1);
            i--;
          }
        }
        checkedList?.reduce;
        if (checkedId !== selectionId) {
          // 다른걸로 변경
          setCheckedId(selectionId);
          checkedList?.push(selectionId);
          await mCreateVoteNotLogined({
            variables: {
              balanceGameId: postId,
              balanceGameSelectionId: selectionId,
            },
          });
        }
      }
      localStorage.setItem("checkedList", checkedList.toString());
    }
  };

  const isChecked =
    checkedId === null ? null : checkedId === selection.id ? true : false;

  return (
    <OptionBoxContainer
      {...{ isChecked }}
      style={{
        background: selection.backgroundColor,
        color: selection.color,
        backgroundImage: `url("${selection.backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="checkbox" onClick={() => handleVote(selection.id)}>
        {isChecked ? <Select /> : <Unselect />}
      </div>
      <div className="title">{selection.description}</div>
    </OptionBoxContainer>
  );
};

interface FeedPostProps {
  data?: any;
}

const FeedPost: React.FC<FeedPostProps> = ({ data }) => {
  const [checkedId, setCheckedId] = useState(data.mySelection);
  const [balanceA, balanceB] = getBalanceGameSelections(data);
  const baseURL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const [isVoted, setIsVoted] = useState(false);
  useEffect(() => {
    setIsVoted(false);
  }, []);

  const renderShare = () => {
    if (typeof window.navigator.share === "undefined") {
      return null;
    } else {
      return (
        <div
          className="content__buttons__button"
          onClick={() =>
            shareAPI(balanceA.description, balanceB.description, baseURL)
          }
        >
          <Share />
          <span style={{ marginLeft: "0.4rem" }}>공유하기</span>
        </div>
      );
    }
  };
  return (
    <Container>
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
          <div className="content__buttons__button">
            <More />
          </div>
        </div>
        <div
          className="content__headermore"
          style={{ bottom: token ? "6.5rem" : "2rem" }}
        >
          <HeaderMore isMine={token ? true : false} isOpen={true} />
        </div>
      </div>
    </Container>
  );
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
    &__headermore {
      position: absolute;
      width: 100%;
      height: 100%;
      right: -2rem;
    }
  }
`;

const OptionBoxContainer = styled.div<{
  isChecked: boolean | null;
}>`
  position: relative;
  height: 12.8rem;
  font-weight: 800;
  line-height: 2.6rem;
  :first-child {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }
  .checkbox {
    position: absolute;
    z-index: 3;
    top: 0.9rem;
    right: 1.2rem;
  }
  .title {
    font-family: "NanumSquareRound";
    font-size: 2rem;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: ${({ isChecked }) =>
      isChecked === null ? 1 : isChecked ? 1 : 0.4};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
  }
`;

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

export default FeedPost;
