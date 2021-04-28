import { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsWrapper = styled.div`
  form {
    position: relative;
    width: 100%;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  textarea {
    margin-left: 34px;
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
    margin: 0 16px;
  }
  .comments {
    margin: 0;
    padding: 0;
  }
  .comment__more-btn {
    background: none;
    padding: 8px 12px;
    border: 1px solid #868e96;
    border-radius: 15px;
  }
`;
// textarea 영역 구현가능한지 확인하기
const Comments: React.FC = () => {
  const comments = [
    { id: 1, name: "니밸네밸", pubDate: "1분전", content: "안녕" },
    {
      id: 2,
      name: "익명의 토맛토",
      pubDate: "1분전",
      content: "맛있는걸 먹어야지",
    },
    { id: 3, name: "익명의 토", pubDate: "5분전", content: "카레가 낫지~" },
  ];
  const [opend, setOpend] = useState<boolean>(true);

  return (
    <CommentsWrapper>
      <div>
        <span>A</span>
        <span>의견 접기 (145)</span>
      </div>
      <form>
        <textarea placeholder="의견을 입력해주세요" />
        <div className="form__user-pick"></div>
        <button className="submit-btn">등록</button>
      </form>
      {opend && (
        <ul className="comments">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </ul>
      )}
      <button className="comment__more-btn">의견 더보기</button>
    </CommentsWrapper>
  );
};

export default Comments;
