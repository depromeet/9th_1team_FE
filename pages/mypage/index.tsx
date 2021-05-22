import React from "react";
import MiniCards from "components/MypageContent/MiniCards";
import MypageHeader from "components/MypageContent/MypageHeader";
import PencilIcon from "public/pencil.svg";
import FacebookIcon from "public/facebook.svg";
import { MypageWrapper } from "./index.style";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";

const MYPAGE_QUERY = gql`
  query {
    mypage {
      id
      socialId
      platformType
      status
      createdAt
      updatedAt
      balanceGames {
        id
        totalVoteCount
        commentCount
        #        balanceGameSelections {
        #          description
        #          textColor
        #          backgroundColor
        #        }
      }
    }
  }
`;

const mypage = () => {
  const { data } = useQuery(MYPAGE_QUERY);

  console.log(data);

  if (!data) return null;

  const { balanceGames } = data?.mypage;

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
              <h2>내가 만든 밸런스 게임({balanceGames.length})</h2>
              <a className="edit-btn">편집</a>
            </div>
            <MiniCards list={balanceGames} />
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
