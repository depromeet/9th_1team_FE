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
              <img src="img.png" alt="" />
            </Logo>
            토맛토(LOGO)
          </a>
        </Link>
      </Title>
      <BtnContainer>
        <Link href={"/article/write"}>
          <a>
            <CreateBalanceLink>
              <img src="img.png" alt="" />
            </CreateBalanceLink>
          </a>
        </Link>
        <Link href={"/mypage"}>
          <a>
            <MypageLink>
              <img src="img.png" alt="" />
            </MypageLink>
          </a>
        </Link>
      </BtnContainer>
    </Container>
  );
};

export default HomeHeader;
