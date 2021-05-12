import styled from "styled-components";

const CommentWrapper = styled.li`
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

interface CommentProps {
  comment: {
    id: number;
    name: String;
    pubDate: String;
    content: String;
  };
}
// wrapper -> 내 거면 배경색
// comment__content -> border bottom
const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <CommentWrapper key={comment.id}>
      <div className="comment__content">
        <div className="info">
          <div className="comment__user-pick"></div>
          <span className="author">{comment.name}</span>
          <span className="pub-date">{comment.pubDate}</span>
          <div className="setting__more-btn">...</div>
        </div>
        <div className="comment__user-text">
          <p className="text">{comment.content}</p>
          <button className="reply-btn">답글 쓰기</button>
        </div>
      </div>
    </CommentWrapper>
  );
};

export default Comment;
