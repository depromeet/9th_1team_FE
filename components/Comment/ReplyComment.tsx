import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import TextareaComment from "./TextareaComment";

const ReplyCommentWrapper = styled.li`
  &:nth-child(2) {
    // 내 게시글인 경우 배경색상
    background-color: #f8f9fa;
  }
  padding: 0 16px;

  .comment__content {
    border-bottom: 1px solid #e9ecef;
    padding: 13px 0 8px;
  }
  .comment__user-pick {
    display: inline-block;
    background-color: #ffd770;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  .info {
    height: 16px;
    display: flex;
    align-items: center;
  }
  .author {
    font-size: 11px;
    font-weight: 500;
    line-height: 11px;
  }
  .pub-date {
    display: inline-block;
    font-size: 9px;
    line-height: 9px;
    margin-left: 4px;
    color: #868e96;
  }
  .comment__user-text {
    margin-left: 22px;
  }
  .text {
    font-size: 13px;
    line-height: 18px;
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
  .setting__more-btn {
    display: inline-block;
    flex: 1;
    text-align: right;
  }
`;

interface ReplyCommentProps {
  balanceGameId: string;
  commentId: string;
  reply: {
    id: number;
    userId: string;
    pubDate: string;
    content: string;
    user: {
      profile: {
        nickname: string;
      };
    };
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

const ReplyComment: React.FC<ReplyCommentProps> = ({
  balanceGameId = "",
  commentId = "",
  reply,
}) => {
  const [opened, setOpened] = useState(false);
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
        commentId,
        content,
      },
    });
  };

  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <ReplyCommentWrapper>
      <div className="comment__content">
        <div className="info">
          <div className="comment__user-pick" />
          <span className="author">{reply?.user?.profile?.nickname}</span>
          <span className="pub-date">{reply.pubDate}</span>
          <div className="setting__more-btn">...</div>
        </div>
        <div className="comment__user-text">
          <p className="text">{reply.content}</p>
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
      </div>
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;
