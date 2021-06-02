import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import TextareaComment from "./TextareaComment";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import ReplyComment from "./ReplyComment";
import MoreIcon from "../../public/more.svg";
import CommentMore from "./CommentMore";

const CommentWrapper = styled.li`
  position: relative;

  &:nth-child(2) {
    // 내 게시글인 경우 배경색상
    background-color: #f8f9fa;
  }
  padding: 0 1.6rem;

  .comment__content {
    border-bottom: 1px solid #e9ecef;
    padding: 1.3rem 0 0.8rem;
  }
  .comment__user-pick {
    display: inline-block;
    background-color: #ffd770;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.6rem;
  }
  .info {
    height: 1.6rem;
    display: flex;
    align-items: center;
  }
  .author {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.1rem;
  }
  .pub-date {
    display: inline-block;
    font-size: 9px;
    line-height: 9px;
    margin-left: 4px;
    color: #868e96;
  }
  .comment__user-text {
    margin-left: 2.2rem;
  }
  .text {
    font-size: 1.3rem;
    line-height: 1.8rem;
    margin: 0.4rem 0;
  }

  .reply-btn {
    border: none;
    background: none;
    text-decoration: underline;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
    color: #868e96;
    padding: 0;
  }
  .comment__more {
    position: absolute;
    top: 1.3rem;
    right: 1.6rem;
  }
`;

interface CommentProps {
  balanceGameId: string;
  comment: {
    id: string;
    userId: string;
    pubDate: string;
    content: string;
    replies: {
      id: number;
      userId: string;
      pubDate: string;
      content: string;
    }[];
  };
}

const CREATE_REPLY_MUTATION = gql`
  mutation createReply(
    $balanceGameId: String!
    $commentId: String!
    $content: String!
  ) {
    createReply(
      createReplyInput: {
        balanceGameId: $balanceGameId
        commentId: $commentId
        content: $content
      }
    ) {
      id
      content
    }
  }
`;

const Comment: React.FC<CommentProps> = ({ balanceGameId, comment }) => {
  const [opened, setOpened] = useState(false);
  const [moreOpened, setMoreOpened] = useState(false); //comment more
  const [content, setContent] = useState("");
  const [mCreateReply] = useMutation(CREATE_REPLY_MUTATION);

  const onToggle = () => {
    setOpened(!opened);
  };

  const onSubmitReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) return;

    mCreateReply({
      variables: {
        balanceGameId,
        commentId: comment.id,
        content,
      },
    });
  };

  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onToggleMore = () => {
    setMoreOpened((prev) => !prev);
  };

  const onCloseMore = () => {
    if (!moreOpened) return;
    setMoreOpened(false);
  };

  return (
    <CommentWrapper key={comment.id}>
      <div className="comment__content" onClick={onCloseMore}>
        <div className="info">
          <div className="comment__user-pick" />
          <span className="author">{comment.userId}</span>
          <span className="pub-date">{comment.pubDate}</span>
        </div>
        <div className="comment__user-text">
          <p className="text">{comment.content}</p>
          <button className="reply-btn" onClick={onToggle}>
            답글 쓰기
          </button>
        </div>
        {opened && (
          <TextareaComment
            onSubmit={onSubmitReply}
            onChange={onChangeReply}
            value={content}
          />
        )}
        {comment.replies.map((reply) => (
          <ReplyComment
            balanceGameId={balanceGameId}
            commentId={comment.id}
            reply={reply}
          />
        ))}
      </div>
      <div className="comment__more">
        <MoreIcon onClick={onToggleMore} />
        {/** isMine: 내 코멘트인지 확인 필요 */}
        <CommentMore isMine={true} isOpen={moreOpened} />
      </div>
    </CommentWrapper>
  );
};

export default Comment;
