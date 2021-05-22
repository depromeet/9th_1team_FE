import React from "react";
import { BackBtn, BtnContainer, Container, Title } from "./CommonHeader.style";

const CommonHeader = ({ title = "", children = null }) => {
  return (
    <Container>
      <BtnContainer>
        <BackBtn>
          <img src="img.png" alt="" />
        </BackBtn>
      </BtnContainer>
      <Title>{title}</Title>
      <BtnContainer>{children}</BtnContainer>
    </Container>
  );
};

export default CommonHeader;
