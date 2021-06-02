import styled from "styled-components";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import NaverIcon from "../../public/naver.svg";
import KakaoIcon from "../../public/kakao.svg";
import CloseIcon from "../../public/close.svg";
import Link from "next/link";

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
  width: 200px;
  height: 200px;
  background-color: gray;
`;

const BtnContainer = styled.div`
  margin-top: 80px;
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

const NaverButton = styled.button`
  background-color: #2db400;
  color: #fff;
  margin-bottom: 1.2rem;
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  font-weight: 500;
`;

const WithoutLoginButton = styled.button`
  font-size: 17px;
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
      localStorage.setItem("token", jwt);
    }
  }, [data?.login?.jwt]);

  // 네이버 로그인시 token
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { code, state } = router.query;
  //   console.log(code, state);
  //   const redirectURI = "http://localhost:3000/login";
  //   const apiUrl =
  //     "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
  //     process.env.NEXT_PUBLIC_NAVER_ID +
  //     "&client_secret=" +
  //     process.env.NEXT_PUBLIC_SECRET +
  //     "&redirect_uri=" +
  //     redirectURI +
  //     "&code=" +
  //     code +
  //     "&state=" +
  //     state;
  // fetch(`${apiUrl}`, {
  //   url: apiUrl,
  //   headers: {
  //     "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
  //     "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_SECRET,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res));
  //   window.location.href = apiUrl;
  //   window.location.href.includes("access_token");
  //   const location = window.location.href.split("=")[1];
  //   const naver_auth = location.split("&")[0];
  //   console.log("wow", location, naver_auth);
  // }, [router.isReady]);

  // const onNaverLogin = () => {
  //   console.log(window.naver);
  //   const state = "RANDOM_STATE";
  //   const redirectURI = "http://localhost:3000/login";
  //   const apiUrl =
  //     "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
  //     process.env.NEXT_PUBLIC_NAVER_ID +
  //     "&redirect_uri=" +
  //     redirectURI +
  //     "&state=" +
  //     state;

  //   //window.location.href = apiUrl;

  // };

  // useEffect(() => {
  //   window.location.href.includes("access_token");
  //   const location = window.location.href.split("=")[1];
  //   const naver_auth = location.split("&")[0];

  // }, []);

  const redirectURI = "http://localhost:3000/login";

  const Naver = () => {
    if (typeof window === "undefined") return;
    console.log("www", window.naver);
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_ID,
      callbackUrl: redirectURI,
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 30 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const UserProfile = () => {
    window.location.href.includes("access_token") && GetUser();
    function GetUser() {
      const location = window.location.href.split("=")[1];
      const token = location.split("&")[0];
      console.log("naver token: ", token);

      // const apiUrl =
      // "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
      // process.env.NEXT_PUBLIC_NAVER_ID +
      // "&client_secret=" +
      // process.env.NEXT_PUBLIC_SECRET +
      // "&redirect_uri=" +
      // redirectURI +
      // "&code=" +
      // code +
      // "&state=" +
      // state;

      //     fetch(`${API}/account/sign-in` , {
      //       method: "GET",
      //       headers : {
      //         "Content-type" : "application/json",
      //         "Authorization": token
      //       },
      //     })
      //     .then(res => res.json())
      //     .then(res => {
      //       localStorage.setItem("access_token", res.token);
      //       setNaverUser({
      //         nickname : res.nickname,
      //         image : res.image
      //       })
      //     })
      //     .catch(err => console.log("err : ", err));
      //   }
      // };
    }
  };

  const onNaver = () => {
    Naver();
    UserProfile();
  };

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
        <CloseBtn onClick={() => router.back()}>
          <CloseIcon />
        </CloseBtn>
      </LoginHeader>
      <Container>
        <Logo>
          <img src="img.png" alt="" />
        </Logo>
        <BtnContainer>
          <NaverButton onClick={onNaver}>
            <NaverIcon />
            <span>네이버로 계속하기</span>
          </NaverButton>
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
