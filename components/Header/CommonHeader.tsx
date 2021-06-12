import React, { PropsWithChildren } from "react";
import { BackBtn, BtnContainer, Container, Title } from "./CommonHeader.style";
import { useRouter } from "next/router";
import PrevIcon from "../../public/top-prev.svg";
import { HeaderProps } from "./";

const CommonHeader: React.FC<PropsWithChildren<HeaderProps>> = ({
  title = "",
  onClickBack,
  children,
}) => {
  const router = useRouter();

  const onBack = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      router.back();
    }
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
