import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import VS from "public/versus.svg";
import Fire from "public/fire.svg";
import { useState } from "react";
import dayjs from "dayjs";
import { countDate } from "lib/utils";
import { gql, useMutation } from "@apollo/client";

const GameFire = ({
  fistColor,
  secondColor,
  firstVote,
  secondVote,
}: {
  fistColor: string;
  secondColor: string;
  firstVote: number;
  secondVote: number;
}) => (
  <>
    <div className="fire">
      <div className="fire__rectangle" style={{ color: fistColor }}>
        {firstVote}
      </div>
      <div
        style={{
          position: "absolute",
          top: "-2.5rem",
          left: "-2.1rem",
          zIndex: 3,
        }}
      >
        <Fire />
      </div>
      <div className="fire__rectangle" style={{ color: secondColor }}>
        {secondVote}
      </div>
    </div>
    <div className="line" style={{ background: fistColor }} />
    <div className="line" style={{ background: secondColor }} />
  </>
);

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

const Selection = ({
  selection,
  checkedId,
  postId,
  setCheckedId,
}: {
  selection: any;
  postId: string;
  checkedId: string | null;
  setCheckedId: any;
}) => {
  const [mCreateVoteLogined, { data: dataCreateVoteLogined }] =
    useMutation(CREATE_VOTE_LOGINED);
  const [mCreateVoteNotLogined, { data: dataCreateVoteNotLogined }] =
    useMutation(CREATE_VOTE_NOT_LOGINED);
  const [mRemoveVoteLogined, { data: dataRemoveVoteLogined }] =
    useMutation(REMOVE_VOTE_LOGINED);

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
        color: selection.textColor,
      }}
      onClick={() => handleVote(selection.id)}
    >
      {selection.backgroundImage && <img src={selection.backgroundImage} />}
      <div className="checkbox">{isChecked ? <Select /> : <Unselect />}</div>
      <div className="title">{selection.description}</div>
    </OptionBoxContainer>
  );
};

const FeedPost = ({ post }: { post: any }) => {
  const [checkedId, setCheckedId] = useState(post.mySelection);
  const before = countDate(
    dayjs(post.createdAt || new Date()).format("YYYY-MM-DD HH:mm")
  );
  return (
    <Container>
      {post.balanceGameSelections.map((selection: any) => (
        <Selection
          key={selection.id}
          postId={post.id}
          {...{ selection, checkedId, setCheckedId }}
        />
      ))}
      <Versus>
        {checkedId === null ? (
          <VS />
        ) : (
          <GameFire
            fistColor={post.balanceGameSelections[0].backgroundColor}
            secondColor={post.balanceGameSelections[1].backgroundColor}
            firstVote={
              (post.balanceGameSelections[0].voteCount / post.totalVoteCount) *
                100 || 0
            }
            secondVote={
              (post.balanceGameSelections[1].voteCount / post.totalVoteCount) *
                100 || 0
            }
          />
        )}
      </Versus>

      <div className="content">
        <div className="content__title">{post.description}</div>
        <div className="content__state">
          <div>
            참여 {post.totalVoteCount || 0} • 의견 {post.commnetCount || 0} •
            {before}
          </div>
        </div>
        <div className="content__buttons">
          <div className="content__buttons__button">
            <Opinion />
          </div>
          <div className="content__buttons__button">
            <Share />
          </div>
          <div className="content__buttons__button">
            <More />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 36rem;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  margin-bottom: 2.5rem;
  background: white;
  position: relative;
  .content {
    box-sizing: border-box;
    padding: 1rem 0;
    color: #606060;
    &__title {
      padding: 0 0.8rem;
      color: #222222;
      font-size: 1.3rem;
      > a {
        text-decoration: none;
        color: inherit;
      }
    }
    &__state {
      padding: 0 0.8rem;
      display: flex;
      margin-top: 0.5rem;
      font-size: 1.1rem;
    }
    &__buttons {
      padding: 1.3rem 0.8rem;
      margin-top: 1rem;
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
          ::after {
            content: "공유하기";
            margin-left: 0.4rem;
          }
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
  :first-child {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    img {
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
    }
  }
  width: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 12.8rem;
    object-fit: cover;
  }
  position: relative;
  height: 12.8rem;
  font-weight: 800;
  line-height: 2.6rem;
  .checkbox {
    position: absolute;
    top: 0.9rem;
    right: 1.2rem;
  }
  .title {
    width: 100%;
    font-size: 2rem;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 2;
    opacity: ${({ isChecked }) =>
      isChecked === null ? 1 : isChecked ? 1 : 0.4};
    display: flex;
    align-items: center;
    justify-content: center;
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
  .fire {
    position: absolute;
    &__rectangle {
      :first-child {
        top: auto;
        bottom: -0.4rem;
        left: auto;
        right: 0.3rem;
        border-radius: 12px 12px 0px 12px;
        color: #e56f53;
      }
      color: #f8d272;

      top: -0.4rem;
      left: 0.3rem;
      position: absolute;
      z-index: 1;
      font-size: 1.4rem;
      font-weight: 800;
      padding: 0.3rem 0.9rem;
      padding-top: 0.5rem;
      background: #f8f9fa;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
      border-radius: 0px 12px 12px 12px;
    }
  }
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
