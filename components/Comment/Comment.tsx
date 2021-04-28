import styled from "styled-components";

const CommentWrapper = styled.li`
  border-bottom: 1px solid #e9ecef;
  list-style: none;
  position: relative;
  display: flex;

  .comment__user-pick {
    display: inline-block;
    background-color: #ffd770;
    border-radius: 50%;
    width: 15px;
    height: 15px;
  }
  .comment__contents {
    flex: 1;
    .author {
    }
    .pub-date {
      margin-left: 4px;
    }
  }
  .reply-btn {
    border: none;
    background: none;
    text-decoration: underline;
    cursor: pointer;
  }
  .setting__more-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
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

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <CommentWrapper key={comment.id}>
      <div className="comment__user-pick"></div>
      <div className="comment__contents">
        <div className="info">
          <span className="author">{comment.name}</span>
          <span className="pub-date">{comment.pubDate}</span>
        </div>
        <p className="text">{comment.content}</p>
        <button className="reply-btn">답글 쓰기</button>
      </div>
      <button className="setting__more-btn">...</button>
    </CommentWrapper>
  );
};

export default Comment;
