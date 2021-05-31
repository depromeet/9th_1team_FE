import React, { useEffect, useState } from "react";
import MiniCards from "components/MypageContent/MiniCards";
import PencilIcon from "public/pencil.svg";
import BellIcon from "../../public/bell.svg";
import TomatoIcon from "public/tomato/smile-red.svg";
import {
  CardsHeader,
  CardsSection,
  ContentWrapper,
  EditBtn,
  LogoutBtn,
  LogoutWrapper,
  MypageWrapper,
  NoticeLink,
  PencilIconBtn,
  UserImage,
  UserInfo,
  UserName,
} from "./index.style";
import { gql } from "@apollo/client/core";
import { useLazyQuery } from "@apollo/client";
import NotLogin from "../../components/MypageContent/NotLogin";
import CommonHeader from "../../components/Header/CommonHeader";
import Link from "next/link";
import NicknameModal from "../../components/modal/NicknameModal";

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
          textColor
        }
      }
    }
  }
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
