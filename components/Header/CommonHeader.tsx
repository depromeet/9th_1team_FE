import React from "react";
import { BackBtn, BtnContainer, Container, Title } from "./CommonHeader.style";
import { useRouter } from "next/router";

const CommonHeader = ({ title = "", children = null }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <Container>
      <BtnContainer>
        <BackBtn onClick={onBack}>
          <img src="img.png" alt="" />
        </BackBtn>
      </BtnContainer>
      <Title>{title}</Title>
      <BtnContainer>{children}</BtnContainer>
    </Container>
  );
};

export default CommonHeader;
