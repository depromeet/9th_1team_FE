import Link from "next/link";
import React from "react";
import {
  CreateBalanceLink,
  BtnContainer,
  Container,
  Title,
  Logo,
  MypageLink,
  Text,
} from "./HomeHeader.style";
import TomatoIcon from "../../public/tomato-character.svg";
import CheckSqureIcon from "../../public/check-square.svg";

const HomeHeader = () => {
  return (
    <Container>
      <Title>
        <Link href={"/"}>
          <a>
            <Logo>
              <TomatoIcon />
              <Text>토맛토</Text>
            </Logo>
          </a>
        </Link>
      </Title>
      <BtnContainer>
        <Link href={"/article/write"} passHref>
          <CreateBalanceLink>
            <CheckSqureIcon />
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
