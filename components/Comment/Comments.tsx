import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import OpinionIcon from "../../public/opinion.svg";
import TriangleIcon from "../../public/opinion-triangle.svg";
import TriReverseIcon from "../../public/opinion-triangle-reverse.svg";
import TextareaAutosize from "react-textarea-autosize";
import { gql, useMutation } from "@apollo/client";

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
    /* border: 1px solid #e9ecef; */
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: ${({ opened }) => (opened ? "0 16px" : "0 16px 45px 16px")};
    /* height: 4.8rem; */
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    box-sizing: border-box;
    min-height: 4rem;
    max-height: 8rem;
    padding-left: 3.4rem;
    border: 1px solid #e9ecef;
    outline: none;
    resize: none;
    font-family: sans-serif;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    &::-webkit-scrollbar {
      background-color: #fff;
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e9ecef;
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
    position: absolute;
    right: 0;
    top: 0;
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
    font-weight: 500;
    background: none;
    /* padding: 0.8rem 1.2rem; */
    border: 1px solid #868e96;
    border-radius: 15px;
    line-height: 3rem;
    padding: 0 1.2rem;
    color: #868e96;
  }
`;

//
const ADD_COMMENT_MUTATION = gql`
  mutation createComment($gameId: String, $content: String!, $color: String) {
    createComment(
      createCommentInput: {
        balanceGameId: $gameId
        content: $content
        color: $color
      }
    ) {
      id
      color
      content
      createdAt
      updatedAt
    }
  }
`;
type CommentsProps = any;

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [commentText, setCommentText] = useState<any>();
  const [opened, setOpened] = useState<boolean>(true);
  const [addComment, { data: newComment }] = useMutation(ADD_COMMENT_MUTATION);

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    console.log(commentText);
  };

  const onAddComment = () => {
    addComment({
      variables: {
        balanceGameId: "a9e61383-165f-4caf-924e-1994de4a1ff2",
        content: commentText,
        color: "orange",
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
          {opened ? "의견 접기" : "의견 보기"} ({comments?.length || 0})
          {opened ? <TriangleIcon /> : <TriReverseIcon />}
        </button>
      </div>
      <form>
        <TextareaAutosize
          placeholder={"의견을 입력해주세요."}
          className="write-area"
          value={commentText}
          onChange={onChangeComment}
        />
        <div className="form__user-pick"></div>
        <button className="submit-btn" onClick={onAddComment}>
          등록
        </button>
      </form>
      {opened && (
        <>
          <ul className="comments">
            {comments &&
              comments.map((comment: any) => <Comment comment={comment} />)}
          </ul>
          <div className="btn__wrapper">
            <button className="comment__more-btn">의견 더보기</button>
          </div>
        </>
      )}
    </CommentsWrapper>
  );
};

export default Comments;
