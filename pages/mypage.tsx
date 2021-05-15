import MiniCards from "components/MypageContent/MiniCards";
import MypageHeader from "components/MypageContent/MypageHeader";
import React from "react";
import styled from "styled-components";
import RightArrowIcon from "../public/game-next.svg";
import PencilIcon from "../public/pencil.svg";
import FacebookIcon from "../public/facebook.svg";

const MypageWrapper = styled.div`
  .user__status {
    font-weight: 800;
    display: flex;
    align-items: center;
  }
  .user-name {
    font-family: "NanumSquareRound";
    font-size: 2rem;
    font-weight: 800;
  }
  section.cards {
    padding: 1.7rem 1.6rem 4rem 1.6rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
  }

  .cards__header {
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      display: inline-block;
    }
  }
  .edit-btn {
    font-size: 1.4rem;
    color: #797878;
  }
  .logout {
    padding: 2.4rem;
    text-align: center;
    background-color: #f8f9fa;
  }
  .logout-btn {
    color: #868e96;
    font-family: "Noto Sans KR";
    font-size: 1.4rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: #868e96;
      left: 0;
      bottom: 1px;
    }
  }
  .delete-circle {
    //opacity : 0;
    // visibility: hidden;
  }
  .edit-mode {
    .delete-circle {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const mypage = () => {
  return (
    <>
      <MypageHeader />
      <MypageWrapper>
        <div className="contents__wrapper">
          <div className="user__status">
            <FacebookIcon />
            <span className="user-name">김정현님</span>
            <PencilIcon />
          </div>
          <section className="cards">
            <div className="cards__header">
              <h2>내가 만든 밸런스 게임(4)</h2>
              <a className="edit-btn">편집</a>
            </div>
            <MiniCards />
          </section>
          <footer className="logout">
            <a className="logout-btn">로그아웃</a>
          </footer>
        </div>
      </MypageWrapper>
    </>
  );
};

export default mypage;
