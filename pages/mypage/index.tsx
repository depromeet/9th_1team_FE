import styled from "styled-components";
import React, { useEffect, useState } from "react";
import MiniCards from "components/MypageContent/MiniCards";
import PencilIcon from "public/pencil.svg";
import BellIcon from "../../public/bell.svg";
import TomatoIcon from "public/tomato/smile-red.svg";
import { gql } from "@apollo/client/core";
import { useLazyQuery } from "@apollo/client";
import NotLogin from "../../components/MypageContent/NotLogin";
import CommonHeader from "../../components/Header/CommonHeader";
import Link from "next/link";
import NicknameModal from "../../components/modal/NicknameModal";
import Header from "components/Header";

const MYPAGE_QUERY = gql`
  query {
    mypage {
      profile {
        id
        nickname
        email
      }
    }
    myGames {
      balanceGames: balanceGame {
        id
        totalVoteCount
        commentCount
        balanceGameSelections {
          order
          description
          backgroundColor
          backgroundImage
          textColor
        }
      }
    }
  }
`;

const MypageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 5.2rem);
  box-sizing: border-box;

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

const UserInfo = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 9.5rem;
  padding: 1.6rem;
  box-sizing: border-box;
`;

const UserImage = styled.div`
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  border: 2px solid #e9ecef;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const UserName = styled.span`
  font-family: "NanumSquareRound";
  font-size: 2rem;
  font-weight: 800;
  margin: 0 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardsSection = styled.section`
  flex: 1;
  padding: 1.6rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CardsHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    display: inline-block;
  }
`;

const EditBtn = styled.button`
  font-size: 1.4rem;
  color: #797878;
  background-color: transparent;
  border: none;
`;

const LogoutWrapper = styled.div`
  padding: 2.4rem;
  text-align: center;
  background-color: #f8f9fa;
`;

const LogoutBtn = styled.button`
  color: #868e96;
  font-family: "Noto Sans KR";
  font-size: 1.4rem;
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: #868e96;
    left: 0;
    bottom: 1px;
  }
`;

const NoticeLink = styled.a``;

const PencilIconBtn = styled.button.attrs({ type: "button" })`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: 0;
`;

const Mypage = () => {
  const [qMypqge, { data }] = useLazyQuery(MYPAGE_QUERY);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isOpenNicknameModify, setIsOpenNicknameModify] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      qMypqge();
    }
  }, []);

  if (!data) return <NotLogin />;

  const balanceGames = data?.myGames?.balanceGames;
  const profile = data?.mypage?.profile;

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

  const onOpenNicknameModifyModal = () => {
    setIsOpenNicknameModify(true);
  };

  const onCloseNicknameModifyModal = () => {
    setIsOpenNicknameModify(false);
  };

  const userImg = false;

  return (
    <>
      <Header title={"마이페이지"}>
        <Link href={"/notifications"}>
          <NoticeLink>
            <BellIcon />
          </NoticeLink>
        </Link>
      </Header>
      <MypageWrapper>
        <UserInfo>
          <UserImage>{userImg ? userImg : <TomatoIcon />}</UserImage>
          <UserName>{profile.nickname}님</UserName>
          <PencilIconBtn onClick={onOpenNicknameModifyModal}>
            <PencilIcon />
          </PencilIconBtn>
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
      <NicknameModal
        initNickname={profile.nickname}
        email={profile.email}
        isOpen={isOpenNicknameModify}
        onRequestClose={onCloseNicknameModifyModal}
      />
    </>
  );
};

export default Mypage;
