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

const HomeHeader = () => {
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
        <Link href={"/article/write"} passHref>
          <CreateBalanceLink>
            <CheckSquareIcon />
          </CreateBalanceLink>
        </Link>
        <Link href={"/mypage"} passHref>
          <MypageLink>MY</MypageLink>
        </Link>
      </BtnContainer>
    </Container>
  );
};

export default HomeHeader;
