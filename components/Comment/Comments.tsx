import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import OpinionIcon from "../../public/opinion.svg";
import TriangleIcon from "../../public/opinion-triangle.svg";
import TriReverseIcon from "../../public/opinion-triangle-reverse.svg";
import { gql, useMutation, useQuery } from "@apollo/client";
import TextareaComment from "./TextareaComment";

const CommentsWrapper = styled.div<{ opened: boolean }>`
  border-top: 1px solid #e9ecef;

  .toggle__wrapper {
    margin: 2.2rem 0 1.2rem 1.6rem;
    display: flex;
  }
  .toggle-btn {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 500;
    svg {
      margin-left: 0.5rem;
    }
  }
  form {
    position: relative;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: ${({ opened }) => (opened ? "0 16px" : "0 16px 45px 16px")};
  }
  textarea {
    margin-left: 3.4rem;
    border: none;
    flex: 1;
    outline: none;
    resize: none;
    font-family: sans-serif;
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: red;
    }
  }
  .form__user-pick {
    display: inline-block;
    background-color: #ffd770;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
  }
  .submit-btn {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    margin: 0 1.6rem;
  }
  .comments {
    margin: 0;
    padding: 0;
  }
  .btn__wrapper {
    display: flex;
    justify-content: center;
    margin: 3rem 0 7.5rem;
  }
  .comment__more-btn {
    font-size: 1.2rem;
    background: none;
    padding: 0.8rem 1.2rem;
    border: 1px solid #868e96;
    border-radius: 15px;
  }
`;

const COMMENTS_BY_GAME_ID_QUERY = gql`
  query commentsByGameId($id: String!) {
    comments: commentsByGameId(gameId: $id) {
      id
      userId
      content
      replies {
        id
        userId
        content
      }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      userId
      color
      content
    }
  }
`;

// textarea 영역 구현가능한지 확인하기
const Comments: React.FC<{ id: string }> = ({ id = "" }) => {
  const [opened, setOpened] = useState(true);
  const [content, setContent] = useState("");
  const [mCreateComment] = useMutation(CREATE_COMMENT_MUTATION);
  const { data } = useQuery(COMMENTS_BY_GAME_ID_QUERY, { variables: { id } });

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSendComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mCreateComment({
      variables: {
        createCommentInput: {
          balanceGameId: id,
          content,
        },
      },
    });
  };

  return (
    <CommentsWrapper opened={opened}>
      <div className="toggle__wrapper">
        <OpinionIcon />
        <button
          className="toggle-btn"
          onClick={() => setOpened((prev) => !prev)}
        >
          {opened ? "의견 접기" : "의견 보기"} ({data?.comments.length})
          {opened ? <TriangleIcon /> : <TriReverseIcon />}
        </button>
      </div>
      <TextareaComment
        onSubmit={onSendComment}
        onChange={onChangeComment}
        value={content}
      />
      {opened && (
        <>
          {data && (
            <>
              <ul className="comments">
                {data?.comments.map((comment, i) => (
                  <Comment key={i} balanceGameId={id} comment={comment} />
                ))}
              </ul>
              <div className="btn__wrapper">
                <button className="comment__more-btn">의견 더보기</button>
              </div>
            </>
          )}
        </>
      )}
    </CommentsWrapper>
  );
};

export default Comments;
