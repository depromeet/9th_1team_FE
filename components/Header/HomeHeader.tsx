import Link from "next/link";
import React from "react";
import {
  CreateBalanceLink,
  BtnContainer,
  Container,
  Title,
  Logo,
  MypageLink,
} from "./HomeHeader.style";
import TomatoIcon from "../../public/tomato/smile-red.svg";
import LetterIcon from "../../public/tomato/letter-logo.svg";
import CheckSquareIcon from "../../public/check-square.svg";
import { useRouter } from "next/router";

const HomeHeader = () => {
  const router = useRouter();

  const pushWritePage = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.confirm("로그인이 필요한 서비스입니다.");
      return;
    }
    router.push("/article/write");
  };
  return (
    <Container>
      <Title>
        <Link href={"/"}>
          <a>
            <Logo>
              <TomatoIcon />
              <LetterIcon className="letter" />
            </Logo>
          </a>
        </Link>
      </Title>
      <BtnContainer>
        <a onClick={pushWritePage}>
          <CreateBalanceLink>
            <CheckSquareIcon />
          </CreateBalanceLink>
        </a>
        <Link href={"/mypage"} passHref>
          <MypageLink>MY</MypageLink>
        </Link>
      </BtnContainer>
    </Container>
  );
};

export default HomeHeader;
