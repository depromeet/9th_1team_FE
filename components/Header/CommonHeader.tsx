import React from "react";
import { BackBtn, BtnContainer, Container, Title } from "./CommonHeader.style";
import { useRouter } from "next/router";
import PrevIcon from "../../public/top-prev.svg";

type Props = {
  title?: string;
};

const CommonHeader: React.FC<Props> = ({ title = "", children }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <Container>
      <BtnContainer>
        <BackBtn onClick={onBack}>
          <PrevIcon />
        </BackBtn>
      </BtnContainer>
      <Title>{title}</Title>
      <BtnContainer>{children}</BtnContainer>
    </Container>
  );
};

export default CommonHeader;
