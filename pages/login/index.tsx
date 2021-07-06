import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import VomitIcon from "public/tomato/vomit-normal-front.svg";
import KakaoIcon from "public/kakao.svg";
import CloseIcon from "public/close.svg";
import Link from "next/link";
import { setCookie } from "nookies";
import {
  LoginHeader,
  CloseBtn,
  Container,
  Logo,
  Text,
  BtnContainer,
  KakaoButton,
  WithoutLoginButton
} from './index.style'

const LOGIN_MUTATION = gql`
  mutation login($type: String!, $key: String!) {
    login(loginUserInput: { socialType: $type, socialKey: $key }) {
      jwt
      email
      status
    }
  }
`;

interface KakaoResponse {
  access_token: string;
}

export default function Login() {
  const router = useRouter();
  const [mLogin, { data }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (window.Kakao.Auth == null) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_ID);
      window.Kakao.isInitialized();
    }
  }, []);

  useEffect(() => {
    const jwt = data?.login?.jwt;
    if (jwt) {
      setCookie(null, "token", jwt);
    }
  }, [data?.login?.jwt]);

  const onKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile,account_email",
      success: async function (response: KakaoResponse) {
        console.log(response);
        try {
          await mLogin({
            variables: {
              type: "kakao",
              key: response.access_token,
            },
          });
          router.push("/");
        } catch (e) {
          alert("로그인에 실패했습니다.");
        }
      },
      fail: function (error: Error) {
        console.log(error);
      },
    });
  };

  console.log("login data : ", data);

  return (
    <>
      <LoginHeader>
        <CloseBtn onClick={() => router.push("/")}>
          <CloseIcon />
        </CloseBtn>
      </LoginHeader>
      <Container>
        <Logo>
          <VomitIcon />
        </Logo>
        <Text>로그인 후 밸런스 게임에 참여해보세요!</Text>
        <BtnContainer>
          <KakaoButton onClick={onKakaoLogin}>
            <KakaoIcon />
            <span>카카오톡으로 계속하기</span>
          </KakaoButton>
        </BtnContainer>
        <Link href={"/"}>
          <WithoutLoginButton>로그인없이 둘러보기</WithoutLoginButton>
        </Link>
      </Container>
    </>
  );
}
