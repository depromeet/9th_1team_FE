import React, { useEffect } from "react";
import {
  BtnContainer,
  Container,
  KakaoButton,
  Logo,
  WithoutLoginButton,
} from "./index.style";

export default function Login() {
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_ID);
    window.Kakao.isInitialized();
  }, []);

  const onKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile,account_email",
      success: function (response: Object) {
        console.log(response);
      },
      fail: function (error: Error) {
        console.log(error);
      },
    });
  };

  return (
    <Container>
      <Logo>
        <img src="img.png" alt="" />
      </Logo>
      <BtnContainer>
        <KakaoButton onClick={onKakaoLogin}>
          <img src="img.png" alt="" />
          카카오톡으로 시작하기
        </KakaoButton>
      </BtnContainer>
      <WithoutLoginButton>로그인없이 둘러보기</WithoutLoginButton>
    </Container>
  );
}
