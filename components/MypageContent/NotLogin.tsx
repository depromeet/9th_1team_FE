import React from "react";
import { Container, BtnContainer, ContentContainer } from "./NotLogin.style";
import CommonHeader from "../Header/CommonHeader";
import Link from "next/link";

const MiniCards: React.FC = () => {
  return (
    <Container>
      <CommonHeader title={"마이페이지"} />
      <BtnContainer>
        <Link href={"/login"}>
          <a className="login">로그인/회원가입</a>
        </Link>
      </BtnContainer>
      <ContentContainer>
        <img src="img.png" alt="" />
        로그인 후 <br />
        밸런스 게임을 만들어보세요!
      </ContentContainer>
    </Container>
  );
};

export default MiniCards;
