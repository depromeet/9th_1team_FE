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

const HomeHeader = () => {
  return (
    <Container>
      <Title>
        <Link href={"/"}>
          <a>
            <Logo>
              <img src="static/img.png" alt="" />
            </Logo>
            토맛토(LOGO)
          </a>
        </Link>
      </Title>
      <BtnContainer>
        <Link href={"/article/write"} passHref>
          <CreateBalanceLink>
            <img src="static/img.png" alt="" />
          </CreateBalanceLink>
        </Link>
        <Link href={"/mypage"} passHref>
          <MypageLink>
            <img src="static/img.png" alt="" />
          </MypageLink>
        </Link>
      </BtnContainer>
    </Container>
  );
};

export default HomeHeader;
