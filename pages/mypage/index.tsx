import React, { useEffect, useState } from "react";
import MiniCards from "components/MypageContent/MiniCards";
import PencilIcon from "public/pencil.svg";
import BellIcon from "../../public/bell.svg";
import TomatoIcon from "public/tomato-character.svg";
import {
  CardsHeader,
  CardsSection,
  ContentWrapper,
  EditBtn,
  LogoutBtn,
  LogoutWrapper,
  MypageWrapper,
  NoticeLink,
  UserImage,
  UserInfo,
  UserName,
} from "./index.style";
import { gql } from "@apollo/client/core";
import { useLazyQuery } from "@apollo/client";
import NotLogin from "../../components/MypageContent/NotLogin";
import CommonHeader from "../../components/Header/CommonHeader";
import Link from "next/link";

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
          backgroundColor
          textColor
        }
      }
    }
  }
`;

const Mypage = () => {
  const [qMypqge, { data }] = useLazyQuery(MYPAGE_QUERY);
  const [isModifyMode, setIsModifyMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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

  const userImg = false;

  return (
    <>
      <CommonHeader title={"마이페이지"}>
        <Link href={"/notifications"}>
          <NoticeLink>
            <BellIcon />
          </NoticeLink>
        </Link>
      </CommonHeader>
      <MypageWrapper>
        <UserInfo>
          <UserImage>{userImg ? userImg : <TomatoIcon />}</UserImage>
          <UserName>김정현님</UserName>
          <PencilIcon />
        </UserInfo>
        <ContentWrapper>
          <CardsSection>
            <CardsHeader>
              <h2>내가 만든 밸런스 게임({balanceGames.length})</h2>
              {isModifyMode ? (
                <EditBtn
                  type="button"
                  className="edit-btn"
                  onClick={onCompleteModifyMode}
                >
                  편집 완료
                </EditBtn>
              ) : (
                <EditBtn
                  type="button"
                  className="edit-btn"
                  onClick={onModifyMode}
                >
                  편집
                </EditBtn>
              )}
            </CardsHeader>
            <MiniCards isModifyMode={isModifyMode} list={balanceGames} />
          </CardsSection>
          <LogoutWrapper>
            <LogoutBtn
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              로그아웃
            </LogoutBtn>
          </LogoutWrapper>
        </ContentWrapper>
      </MypageWrapper>
    </>
  );
};

export default Mypage;
