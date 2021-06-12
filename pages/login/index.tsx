import styled from "styled-components";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import VomitIcon from "../../public/tomato/vomit-normal-front.svg";
import KakaoIcon from "../../public/kakao.svg";
import CloseIcon from "../../public/close.svg";
import Link from "next/link";
import { setCookie } from "nookies";

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

const LoginHeader = styled.header`
  width: 100%;
  padding: 1.6rem;
  height: 5.2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 5.2rem);
  padding: 1.6rem;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 9rem;
`;

const Text = styled.p`
  font-family: "NanumSquareRound";
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 800;
  width: 20rem;
  text-align: center;
  margin: 2rem 0 3.6rem;
`;

const BtnContainer = styled.div`
  width: 100%;
  max-width: 60rem;

  button {
    width: 100%;
    height: 5.5rem;
    padding: 2rem;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: none;
    cursor: pointer;

    span {
      flex: 1;
      height: 2rem;
      line-height: 2rem;
    }
  }
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  font-weight: 500;
`;

const WithoutLoginButton = styled.button`
  font-size: 1.4rem;
  line-height: 25px;
  color: #868e96;
  margin-top: 30px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;

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
