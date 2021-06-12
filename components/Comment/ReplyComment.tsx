import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ApolloQueryResult, gql } from "@apollo/client/core";
import TextareaComment from "./TextareaComment";
import CommentMore from "./CommentMore";
import MoreIcon from "../../public/more.svg";
import { modifyDate } from "../../utils/date";

const ReplyCommentWrapper = styled.li`
  position: relative;
  &:nth-child(2) {
    // 내 게시글인 경우 배경색상
    background-color: #f8f9fa;
  }
  padding: 0 16px;

  .reply__content {
    border-bottom: 1px solid #e9ecef;
    padding: 13px 0 8px;
  }
  .reply__deleted {
    font-size: 13px;
    line-height: 140%;
    color: #343a40;
    opacity: 0.6;
    padding-left: 22px;
    padding-bottom: 0.8rem;
  }
  .reply__user-pick {
    display: inline-block;
    background-color: #ffd770;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    border: 1px solid lightgray;
    box-sizing: border-box;
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
  .reply__user-text {
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
  .reply__more {
    position: absolute;
    top: 1.3rem;
    right: 1.6rem;
  }
  .setting__more-btn {
    display: inline-block;
    flex: 1;
    text-align: right;
  }
`;

interface ReplyCommentProps {
  mySelectionColor: string;
  balanceGameId: string;
  commentId: string;
  reply: {
    id: string;
    userId: string;
    color: string;
    content: string;
    status: string;
    createdAt: string;
    user: {
      profile: {
        nickname: string;
      };
    };
  };
  refetch: () => Promise<ApolloQueryResult<any>>;
}

const CREATE_REPLY_MUTATION = gql`
  mutation createReply(
    $balanceGameId: String!
    $commentId: String!
    $content: String!
    $color: String
  ) {
    createReply(
      createReplyInput: {
        balanceGameId: $balanceGameId
        commentId: $commentId
        content: $content
        color: $color
      }
    ) {
      id
      content
    }
  }
`;

const REMOVE_REPLY_MUTATION = gql`
  mutation removeReply($id: String!) {
    removeReply(replyId: $id)
  }
`;

const UPDATE_REPLY_MUTATION = gql`
  mutation updateReply($id: String!, $content: String!) {
    updateReply(updateReplyInput: { replyId: $id, content: $content }) {
      id
      content
    }
  }
`;

const ReplyComment: React.FC<ReplyCommentProps> = ({
  mySelectionColor,
  balanceGameId = "",
  commentId = "",
  reply,
  refetch,
}) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [modifyReply, setModifyReply] = useState(reply.content);
  const [moreOpened, setMoreOpened] = useState(false); //comment more
  const [mCreateReply] = useMutation(CREATE_REPLY_MUTATION);
  const [mRemoveReply] = useMutation(REMOVE_REPLY_MUTATION);
  const [mUpdateReply] = useMutation(UPDATE_REPLY_MUTATION);

  const onToggle = () => {
    setOpened(!opened);
  };

  const onToggleMore = () => {
    setMoreOpened((prev) => !prev);
  };

  const onCloseMore = () => {
    if (!moreOpened) return;
    setMoreOpened(false);
  };

  const onSubmitReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) return;

    try {
      await mCreateReply({
        variables: {
          balanceGameId,
          commentId,
          content,
          color: mySelectionColor,
        },
      });
      await refetch();
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  };

  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onDeleteReply = (id: string) => async () => {
    try {
      await mRemoveReply({ variables: { id } });
      await refetch();
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  };

  const onModifyReplyMode = () => {
    setIsModifyMode(true);
  };

  const onSubmitModifyReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mUpdateReply({
        variables: {
          id: reply.id,
          content: modifyReply,
        },
      });
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  };

  const onChangeModifyReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setModifyReply(e.target.value);
  };

  return (
    <ReplyCommentWrapper>
      <div className="reply__content" onClick={onCloseMore}>
        {reply.status === "delete" ? (
          <div className="reply__deleted">삭제된 댓글입니다.</div>
        ) : (
          <>
            <div className="info">
              <div
                className="reply__user-pick"
                style={{
                  backgroundColor: reply.color || "#ffffff",
                  borderColor: reply.color || "lightgray",
                }}
              />
              <span className="author">{reply?.user?.profile?.nickname}</span>
              <span className="pub-date">{modifyDate(reply.createdAt)}</span>
            </div>
            <div className="reply__user-text">
              {isModifyMode ? (
                <TextareaComment
                  mySelectionColor={reply.color}
                  onSubmit={onSubmitModifyReply}
                  onChange={onChangeModifyReply}
                  value={modifyReply}
                />
              ) : (
                <p className="text">{reply.content}</p>
              )}
              <button className="reply-btn" onClick={onToggle}>
                답글 쓰기
              </button>
            </div>
            {opened && (
              <TextareaComment
                mySelectionColor={mySelectionColor}
                onSubmit={onSubmitReply}
                onChange={onChangeReply}
                value={content}
              />
            )}
          </>
        )}
      </div>
      {/** isMine: 내 코멘트인지 확인 필요 */}
      {reply.status !== "delete" && (
        <div className="reply__more">
          <MoreIcon onClick={onToggleMore} />
          {/** isMine: 내 코멘트인지 확인 필요 */}
          <CommentMore
            isMine={true}
            isOpen={moreOpened}
            onDelete={onDeleteReply(reply.id)}
            onModify={onModifyReplyMode}
          />
        </div>
      )}
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;
