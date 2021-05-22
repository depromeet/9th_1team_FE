import React from "react";
import { BackBtn, BtnContainer, Container, Title } from "./HomeHeader.style";

const HomeHeader = () => {
  return (
    <Container>
      <Title>
        <Logo>
          <img src="img.png" alt="" />
        </Logo>
        토맛토(LOGO)
      </Title>
      <BtnContainer>
        <CreateBalanceLink>
          <img src="img.png" alt="" />
        </CreateBalanceLink>
      </BtnContainer>
    </Container>
  );
};

export default HomeHeader;
