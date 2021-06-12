import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import OpinionIcon from "../../public/opinion.svg";
import TriangleIcon from "../../public/opinion-triangle.svg";
import TriReverseIcon from "../../public/opinion-triangle-reverse.svg";
import { gql, useMutation, useQuery } from "@apollo/client";
import TextareaComment from "./TextareaComment";
import Loading from "../Loading";
import { useRouter } from "next/router";

const CommentsWrapper = styled.div<{ opened: boolean }>`
  border-top: 1px solid #e9ecef;
  padding-bottom: 0.1rem;

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
    border: 1px solid lightgray;
    box-sizing: border-box;
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
    align-items: center;
    margin: 3rem 0 4.5rem;
  }
  .comment__more-btn {
    color: #868e96;
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
      status
      color
      content
      createdAt
      user {
        profile {
          nickname
        }
      }
      replies {
        id
        userId
        status
        color
        content
        createdAt
        user {
          profile {
            nickname
          }
        }
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

interface CommentProps {
  id: string;
  mySelectionColor: string;
  commentCount: number;
  isLoggedin: boolean;
}

// textarea 영역 구현가능한지 확인하기
const Comments: React.FC<CommentProps> = ({
  id = "",
  mySelectionColor = "",
  commentCount = 0,
  isLoggedin = false,
}) => {
  const [opened, setOpened] = useState(true);
  const [content, setContent] = useState("");
  const [mCreateComment, { loading: createCommentLoading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const {
    data,
    loading: commentsLoading,
    refetch,
  } = useQuery(COMMENTS_BY_GAME_ID_QUERY, {
    variables: { id },
  });
  const router = useRouter();

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mCreateComment({
        variables: {
          createCommentInput: {
            balanceGameId: id,
            content,
            color: mySelectionColor,
          },
        },
      });
      await refetch();
    } catch (e) {
      alert("게임에 투표 후 댓글을 남길 수 있습니다.");
    }
  };

  const onClickComment = () => {
    if (!isLoggedin) {
      alert("로그인 후 사용 가능합니다.");
      router.push("/login");
    }
  };

  if (commentsLoading) return <Loading />;

  return (
    <CommentsWrapper opened={opened}>
      <div className="toggle__wrapper">
        <OpinionIcon />
        <button
          className="toggle-btn"
          onClick={() => {
            if (isLoggedin) {
              setOpened((prev) => !prev);
            } else {
              alert("로그인 후 사용 가능합니다.");
              router.push("/login");
            }
          }}
        >
          {opened ? "의견 접기" : "의견 보기"} (
          {data?.comments.length || commentCount})
          {opened ? <TriangleIcon /> : <TriReverseIcon />}
        </button>
      </div>
      {createCommentLoading ? (
        <Loading height={"36px"} />
      ) : (
        <TextareaComment
          mySelectionColor={mySelectionColor}
          onSubmit={onSendComment}
          onChange={onChangeComment}
          onClick={onClickComment}
          value={content}
        />
      )}
      {opened && (
        <>
          {data && (
            <>
              <ul className="comments">
                {data?.comments.map((comment: any, i: number) => (
                  <Comment
                    key={i}
                    mySelectionColor={mySelectionColor}
                    balanceGameId={id}
                    comment={comment}
                    refetch={refetch}
                  />
                ))}
              </ul>
              {/*<div className="btn__wrapper">*/}
              {/*  <button className="comment__more-btn">의견 더보기</button>*/}
              {/*</div>*/}
            </>
          )}
        </>
      )}
    </CommentsWrapper>
  );
};

export default Comments;
