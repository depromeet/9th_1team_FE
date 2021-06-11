import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import VS from "public/versus.svg";
import React, { useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";
import FireBar from "./FireBar/FireBar";
import { gql, useMutation } from "@apollo/client";
import { getBalanceGameSelections } from "../utils/common";
import { shareAPI } from "utils/mobileShare";

enum CHECK_TYPE {
  FIRST = "FIRST",
  SECOND = "SECOND",
  NONE = "NONE",
}
interface OptionBoxProps {
  type: CHECK_TYPE;
  isSelected: boolean;
  title: string;
  checkType: CHECK_TYPE;
  setCheckType: (
    type: CHECK_TYPE,
    balanceGameId: string,
    balanceGameSelectionId: string
  ) => void;
  balanceGameId: string;
  balanceGameSelectionId: string;
  background: string;
  color: string;
  backgroundImage: string;
}

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

const OptionBox = ({
  type,
  isSelected,
  title,
  checkType,
  setCheckType,
  background,
  backgroundImage,
  balanceGameId,
  balanceGameSelectionId,
  color,
}: OptionBoxProps) => {
  const handleCheckType = (type: CHECK_TYPE) => {
    if (checkType === type)
      setCheckType(CHECK_TYPE.NONE, balanceGameId, balanceGameSelectionId);
    else setCheckType(type, balanceGameId, balanceGameSelectionId);
  };
  return (
    <OptionBoxContainer
      {...{ checkType, isSelected }}
      style={{
        background,
        color,
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="checkbox">{isSelected ? <Select /> : <Unselect />}</div>
      <div className="title" onClick={() => handleCheckType(type)}>
        {title}
      </div>
    </OptionBoxContainer>
  );
};

interface FeedPostProps {
  data?: any;
}

const getInitCheckType = (data: any) => {
  if (data.mySelection) {
    const balanceGameSelection = data.balanceGameSelections.find(
      (balanceGameSelection: any) =>
        balanceGameSelection.id === data.mySelection
    );
    if (balanceGameSelection.order === 0) return CHECK_TYPE.FIRST;
    else if (balanceGameSelection.order === 1) return CHECK_TYPE.SECOND;
    else return CHECK_TYPE.NONE;
  } else {
    return CHECK_TYPE.NONE;
  }
};

const FeedPost: React.FC<FeedPostProps> = ({ data }) => {
  const [checkType, setCheckType] = useState(getInitCheckType(data));
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED_MUTATION);
  const [balanceA, balanceB] = getBalanceGameSelections(data);

  console.log(balanceA);
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

  const onClickCheckType = async (
    type: CHECK_TYPE,
    balanceGameId: string,
    balanceGameSelectionId: string
  ) => {
    setCheckType(type);
    if (type !== CHECK_TYPE.NONE) {
      try {
        await mCreateVoteLogined({
          variables: {
            balanceGameId,
            balanceGameSelectionId,
          },
        });
      } catch (e) {
        alert("이미 투표에 참여 하셨습니다.");
        setCheckType(checkType);
      }
    }
  };

  console.log("????????????", data);

  return (
    <Container>
      <OptionBox
        type={CHECK_TYPE.FIRST}
        isSelected={checkType === CHECK_TYPE.FIRST}
        title={balanceA.description}
        checkType={checkType}
        setCheckType={onClickCheckType}
        balanceGameId={data.id}
        balanceGameSelectionId={balanceA.id}
        background={balanceA.backgroundColor}
        backgroundImage={balanceA.backgroundImage}
        color={balanceA.textColor}
      />
      <OptionBox
        type={CHECK_TYPE.SECOND}
        isSelected={checkType === CHECK_TYPE.SECOND}
        title={balanceB.description}
        checkType={checkType}
        setCheckType={onClickCheckType}
        balanceGameId={data.id}
        balanceGameSelectionId={balanceB.id}
        background={balanceB.backgroundColor}
        backgroundImage={balanceB.backgroundImage}
        color={balanceB.textColor}
      />
      <Versus>
        {checkType === CHECK_TYPE.NONE ? (
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
  isSelected: boolean;
  checkType: CHECK_TYPE;
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
    opacity: ${({ isSelected, checkType }) =>
      !isSelected ? (checkType === CHECK_TYPE.NONE ? 1 : 0.4) : 1};
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
