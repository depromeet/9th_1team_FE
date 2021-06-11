import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import VS from "public/versus.svg";
import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";
import FireBar from "./FireBar/FireBar";
import { shareAPI } from "utils/mobileShare";
import { gql, useMutation } from "@apollo/client";

interface OptionBoxProps {
  selection: any;
  postId: string;
  checkedId: string | null;
  setCheckedId: Dispatch<SetStateAction<string | null>>;
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
}: OptionBoxProps) => {
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED);
  // const [mCreateVoteNotLogined, ] =
  //   useMutation(CREATE_VOTE_NOT_LOGINED);
  const [mRemoveVoteLogined] = useMutation(REMOVE_VOTE_LOGINED);

  const handleVote = async (selectionId: string) => {
    const token = localStorage.getItem("token");
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
        if (checkedId === selectionId) {
          // 다시 create
          setCheckedId(selectionId);
          await mCreateVoteLogined({
            variables: {
              balanceGameId: postId,
              balanceGameSelectionId: selectionId,
            },
          });
        }
      }
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
  const balanceA = data.balanceGameSelections[0];
  const balanceB = data.balanceGameSelections[1];
  const baseURL = "http://localhost:3000";

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
        {...{ checkedId, setCheckedId }}
      />
      <OptionBox
        key={balanceB.id}
        postId={data.id}
        selection={balanceB}
        {...{ checkedId, setCheckedId }}
      />
      <Versus>
        {checkedId === null ? (
          <VS />
        ) : (
          <FireBar
            voteCountA={balanceA.voteCount}
            voteCountB={balanceB.voteCount}
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
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 36rem;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  margin-bottom: 2.5rem;
  background: white;
  position: relative;
  box-sizing: border-box;
  .content {
    padding-bottom: 1rem;
    color: #606060;
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

  .line {
    width: 50%;
    height: 0.8rem;
    position: absolute;
    z-index: 0;
    left: 0;
    background: #e56f53;
    :last-child {
      left: auto;
      right: 0;
      background: #f8d272;
    }
  }
`;

export default FeedPost;
