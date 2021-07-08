import React, { PropsWithChildren } from "react";
import { BackBtn, BtnContainer, Container, Title } from "./CommonHeader.style";
import { useRouter } from "next/router";
import PrevIcon from "public/top-prev.svg";
import { HeaderProps } from "./";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { changePrevPageWrite } from "redux/postsSlice";

const CommonHeader: React.FC<PropsWithChildren<HeaderProps>> = ({ title = "", onClickBack, children }) => {
  const dispatch = useAppDispatch();
  const { isPrevPageWrite } = useAppSelector((state) => state.posts);
  const router = useRouter();

  const onBack = () => {
    // 상세페이지 직전에 글을 작성했다면 home으로 push하고 상태 수정
    if (isPrevPageWrite) {
      router.push("/");
      dispatch(changePrevPageWrite(false));
      return;
    }

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
