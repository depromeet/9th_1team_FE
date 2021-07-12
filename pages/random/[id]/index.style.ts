import styled from "styled-components";

export const DetailWrapper = styled.div`
  .contents__wrapper {
    padding: 0 1.6rem;
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.4rem 0 1rem;
    p,
    span {
      font-size: 1.2rem;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  .contents p {
    font-size: 1.4rem;
    line-height: 2.45rem;
    margin-bottom: 0.5rem;
  }
  .contents span {
    font-size: 1.2rem;
    color: #868e96;
  }
  .fake__image {
    width: 2rem;
    height: 2rem;
    background-color: tomato;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .play__wrapper {
    display: flex;
    flex-direction: column;
  }
  .play-ment {
    margin: 0;
    color: #e56f53;
    line-height: 1.7rem !important;
    font-weight: 500;
  }
  .play-count {
    line-height: 1.7rem !important;
  }
  .comment-count {
    display: inline-block;
    width: 7rem;
    line-height: 3rem;
    border: 1px solid #868e96;
    border-radius: 15px;
    text-align: center;
    color: #868e96;
    font-weight: 500;
    box-sizing: border-box;
  }

  .icon {
    &:first-child {
      margin-right: 1.4rem;
    }
  }
  nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.3rem;
    background-color: #f8f9fa;
    padding: 1.4rem 1.5rem;
  }
  .prev,
  .next {
    display: flex;
    font-size: 1.3rem;
    line-height: 2rem;
    align-items: center;
    span {
      font-weight: 500;
    }
  }
`;

export const VoteWrapper = styled.div`
  position: relative;
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
