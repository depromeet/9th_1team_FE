import React from "react";
import styled from "styled-components";
import MiniUserIcon from "../../public/mini-user.svg";
import MiniChatIcon from "../../public/mini-chat.svg";
import CloseCard from "../../public/close-card.svg";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";

type CardProps = {
  item: {
    id: string;
    commentCount: number;
    totalVoteCount: number;
  };
  isModifyMode: Boolean;
};

const REMOVE_BALANCE_GAME_MUTATION = gql`
  mutation removeBalanceGame($id: String!) {
    removeBalanceGame(id: $id)
  }
`;

const CardWrapper = styled.div`
  width: calc(50% - 5px);
  box-sizing: border-box;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
  border-radius: 0.8rem;
  margin-bottom: 1.6rem;
  position: relative;

  .choices-box {
    border-radius: 0.8rem;
    overflow: hidden;
    margin-bottom: 1rem;
    div {
      padding: 3rem 1rem;
      font-family: "NanumSquareRound";
      font-size: 1.6rem;
      font-weight: 800;
      text-align: center;
      line-height: 2.2rem;
    }
  }
  .top {
    background-color: #f99e4b;
  }
  .bottom {
    background-color: #bae476;
  }
  .count__wrapper {
    width: 100%;
  }
  .count-item {
    display: inline-flex;
    align-items: center;
    span {
      font-size: 1.1rem;
      font-weight: 500;
      color: #868e96;
    }
    &:first-child {
      margin-right: 1rem;
    }
  }
  .count-number {
    margin-left: 0.3rem;
  }
  .close-btn {
    position: absolute;
    right: -12px;
    top: -12px;
    border: none;
    background-color: transparent;
    padding: 0;
    width: 24px;
    height: 24px;
  }
`;

const MiniCard: React.FC<CardProps> = ({ item, isModifyMode }) => {
  const [mRemoveBalanceGame] = useMutation(REMOVE_BALANCE_GAME_MUTATION);

  const onRemove = (id: string) => async () => {
    await mRemoveBalanceGame({
      variables: {
        id,
      },
    });
    window.location.reload();
  };

  return (
    <>
      <CardWrapper>
        <div className="choices-box">
          <div className="top">추성훈 선수한테 맞고 이국종 교수...</div>
          <div className="bottom">이국종 교수한테 맞고 추성훈...</div>
        </div>
        <div className="count__wrapper">
          <div className="count-item">
            <MiniUserIcon />
            <span className="count-number">{item.totalVoteCount}</span>
          </div>
          <div className="count-item">
            <MiniChatIcon />
            <span className="count-number">{item.commentCount}</span>
          </div>
        </div>
        {isModifyMode && (
          <button
            type="button"
            className="close-btn"
            onClick={onRemove(item.id)}
          >
            <CloseCard />
          </button>
        )}
      </CardWrapper>
    </>
  );
};

export default MiniCard;
