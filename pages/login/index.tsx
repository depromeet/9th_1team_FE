import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BtnContainer,
  Container,
  KakaoButton,
  NaverButton,
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
  const router = useRouter();
  const [mLogin, { data }] = useMutation(LOGIN_MUTATION);
  const [naverUser, setNaverUser] = useState({});

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
        <NaverButton onClick={onNaver}>
          <img src="img.png" alt="" />
          네이버로 시작하기
        </NaverButton>
        <KakaoButton onClick={onKakaoLogin}>
          <img src="img.png" alt="" />
          카카오톡으로 시작하기
        </KakaoButton>
      </BtnContainer>
      <WithoutLoginButton>로그인없이 둘러보기</WithoutLoginButton>
    </Container>
  );
}
