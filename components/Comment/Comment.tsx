import React, { ChangeEvent, FormEvent, useState } from "react";
import TextareaComment from "./TextareaComment";
import { ApolloQueryResult, gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import ReplyComment from "./ReplyComment";
import MoreIcon from "public/more.svg";
import CommentMore from "./CommentMore";
import { modifyDate } from "utils/date";
import { CommentWrapper } from "./Comment.style";

interface CommentProps {
  mySelectionColor: string;
  balanceGameId: string;
  comment: {
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
    replies: {
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
    }[];
  };
  refetch: () => Promise<ApolloQueryResult<any>>;
}

const CREATE_REPLY_MUTATION = gql`
  mutation createReply($balanceGameId: String!, $commentId: String!, $content: String!, $color: String) {
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

const REMOVE_COMMENT_MUTATION = gql`
  mutation removeComment($id: String!) {
    removeComment(id: $id)
  }
`;

const UPDATE_COMMENT_MUTATION = gql`
  mutation removeComment($id: String!, $content: String!) {
    updateComment(updateCommentInput: { id: $id, content: $content }) {
      id
      content
    }
  }
`;

const Comment: React.FC<CommentProps> = ({ mySelectionColor, balanceGameId, comment, refetch }) => {
  const [opened, setOpened] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [modifyComment, setModifyComment] = useState(comment.content);
  const [moreOpened, setMoreOpened] = useState(false); //comment more
  const [content, setContent] = useState("");
  const [mCreateReply] = useMutation(CREATE_REPLY_MUTATION);
  const [mRemoveComment] = useMutation(REMOVE_COMMENT_MUTATION);
  const [mUpdateComment] = useMutation(UPDATE_COMMENT_MUTATION);

  const onToggle = () => {
    setOpened(!opened);
  };

  const onSubmitReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) return;

    try {
      await mCreateReply({
        variables: {
          balanceGameId,
          commentId: comment.id,
          content,
          color: mySelectionColor,
        },
      });
      setContent("");
      setOpened(false);
      await refetch();
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
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

  const onDeleteComment = (id: string) => async () => {
    try {
      await mRemoveComment({
        variables: { id },
      });
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  };

  const onModifyCommentMode = () => {
    setIsModifyMode(true);
  };
  const onSubmitModifyComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mUpdateComment({
        variables: {
          id: comment.id,
          content: modifyComment,
        },
      });
      setIsModifyMode(false);
    } catch (e) {}
  };

  const onChangeModifyComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setModifyComment(e.target.value);
  };

  return (
    <CommentWrapper key={comment.id}>
      <div className='comment__content' onClick={onCloseMore}>
        {comment.status === "delete" ? (
          <div className='comment__deleted'>삭제된 댓글입니다.</div>
        ) : (
          <>
            <div className='info'>
              <div
                className='comment__user-pick'
                style={{
                  backgroundColor: comment.color || "#ffffff",
                  borderColor: comment.color || "lightgray",
                }}
              />
              <span className='author'>{comment?.user?.profile?.nickname}</span>
              <span className='pub-date'>{modifyDate(comment.createdAt)}</span>
            </div>
            <div className='comment__user-text'>
              {isModifyMode ? (
                <div className='comment__textarea-comment'>
                  <TextareaComment
                    mySelectionColor={comment.color}
                    onSubmit={onSubmitModifyComment}
                    onChange={onChangeModifyComment}
                    value={modifyComment}
                  />
                </div>
              ) : (
                <p className='text'>{comment.content}</p>
              )}

              <button className='reply-btn' onClick={onToggle}>
                답글 쓰기
              </button>
            </div>
            {opened && (
              <div className='comment__textarea-comment'>
                <TextareaComment
                  mySelectionColor={mySelectionColor}
                  onSubmit={onSubmitReply}
                  onChange={onChangeReply}
                  value={content}
                />
              </div>
            )}
          </>
        )}

        {comment.replies.map((reply) => (
          <ReplyComment
            mySelectionColor={mySelectionColor}
            balanceGameId={balanceGameId}
            commentId={comment.id}
            reply={reply}
            refetch={refetch}
          />
        ))}
      </div>
      {comment.status !== "delete" && (
        <div className='comment__more'>
          <MoreIcon onClick={onToggleMore} />
          {/** isMine: 내 코멘트인지 확인 필요 */}
          <CommentMore
            isMine={true}
            isOpen={moreOpened}
            onDelete={onDeleteComment(comment.id)}
            onModify={onModifyCommentMode}
          />
        </div>
      )}
    </CommentWrapper>
  );
};

export default Comment;
