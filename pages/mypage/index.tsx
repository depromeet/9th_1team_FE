import React, { useEffect, useState } from "react";
import MiniCards from "components/MypageContent/MiniCards";
import MypageHeader from "components/MypageContent/MypageHeader";
import PencilIcon from "public/pencil.svg";
import FacebookIcon from "public/facebook.svg";
import { MypageWrapper } from "./index.style";
import { gql } from "@apollo/client/core";
import { useLazyQuery } from "@apollo/client";
import NotLogin from "../../components/MypageContent/NotLogin";

const MYPAGE_QUERY = gql`
  query {
    myGames {
      balanceGames: balanceGame {
        id
        totalVoteCount
        commentCount
        balanceGameSelections {
          order
          description
        }
      }
    }
  }
`;

const mypage = () => {
  const [qMypqge, { data }] = useLazyQuery(MYPAGE_QUERY);
  const [isModifyMode, setIsModifyMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("??????????", token);
    if (token) {
      qMypqge();
    }
  }, []);

  if (!data) return <NotLogin />;

  const balanceGames = data?.myGames?.balanceGames;

  const onClickLogout = () => {
    if (window.confirm("로그아웃 하시겠어요?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const onCompleteModifyMode = () => {
    setIsModifyMode(false);
  };
  const onModifyMode = () => {
    setIsModifyMode(true);
  };

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
              {isModifyMode ? (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={onCompleteModifyMode}
                >
                  편집 완료
                </button>
              ) : (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={onModifyMode}
                >
                  편집
                </button>
              )}
            </div>
            <MiniCards isModifyMode={isModifyMode} list={balanceGames} />
          </section>
          <div className="logout">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </MypageWrapper>
    </>
  );
};

export default mypage;
