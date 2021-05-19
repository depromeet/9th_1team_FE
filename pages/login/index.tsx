import React, { useEffect } from "react";
import {
  BtnContainer,
  Container,
  KakaoButton,
  Logo,
  WithoutLoginButton,
} from "./index.style";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

const LOGIN_MUTATION = gql`
  mutation login($type: String!, $key: String!) {
    login(loginUserInput: { socialType: $type, socialKey: $key }) {
      jwt
      email
      status
    }
  }
`;

export default function Login() {
  const [mLogin, { data }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (window.Kakao.Auth == null) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_ID);
      window.Kakao.isInitialized();
    }
  }, []);

  const onKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile,account_email",
      success: function (response: Object) {
        console.log(response);
        mLogin({
          variables: {
            type: "kakao",
            key: response.access_token,
          },
        });
      },
      fail: function (error: Error) {
        console.log(error);
      },
    });
  };

  console.log("login data : ", data);

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
