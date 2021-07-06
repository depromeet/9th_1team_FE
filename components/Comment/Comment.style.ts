import styled from "styled-components";

export const CommentWrapper = styled.li`
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
  .comment__deleted {
    font-size: 13px;
    line-height: 140%;
    color: #343a40;
    opacity: 0.6;
    padding-left: 38px;
    padding-bottom: 0.8rem;
  }
  .comment__user-pick {
    display: inline-block;
    background-color: #ffffff;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.6rem;
    border: 1px solid lightgray;
    box-sizing: border-box;
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
  .comment__textarea-comment {
    margin-top: 6px;
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

export const MoreMenu = styled.ul<{ isOpen: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 12.7rem;
  position: absolute;
  right: 0;
  z-index: 2;
  background-color: #fff;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  li {
  }
  li a {
    display: inline-block;
    width: 100%;
    padding: 1.5rem 0 1.5rem 1.6rem;
    font-size: 1.3rem;
    border-bottom: 1px solid #e9ecef;
    box-sizing: border-box;
  }
  li:last-child a {
    border-bottom: none;
  }
`;

export const CommentsWrapper = styled.div<{ opened: boolean }>`
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


export const ReplyCommentWrapper = styled.li`
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

export const Container = styled.form`
  position: relative;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 0 1.3rem;
  padding: 7px 0;

  .submit-btn {
    font-family: "Noto Sans KR";
    padding: 0;
    font-size: 1.3rem;
  }
`;