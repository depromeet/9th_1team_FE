import React from "react";
import { Container, BtnContainer, ContentContainer } from "./NotLogin.style";
import CommonHeader from "components/Header/CommonHeader";
import Link from "next/link";
import VomitIcon from "public/tomato/vomit-light-side.svg";
import NextArr from "public/game-next.svg";

const MiniCards: React.FC = () => {
  return (
    <Container>
      <CommonHeader title={"마이페이지"} />
      <BtnContainer>
        <Link href={"/login"}>
          <a className="login">
            <span>로그인/회원가입</span>
            <NextArr />
          </a>
        </Link>
      </BtnContainer>
      <ContentContainer>
        <VomitIcon />
        <p>
          로그인 후 <br />
          밸런스 게임을 만들어보세요!
        </p>
      </ContentContainer>
    </Container>
  );
};

export default MiniCards;
