import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchQuery, graphql } from "relay-runtime";
import { useEnvironment } from "../lib/relay";

const KakaoLoginWrapper = styled.div`
  .login-btn {
    display: inline-block;
    background: #ffdd00;
    outline: none;
    border: none;
    width: 200px;
    height: 50px;
    position: relative;
  }
  #kakao-login img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;
// 1. fetchQuery (?)
// 2. Mutation

// const variables = {
//   socialKey: "110798995619330",
//   socialType: "kakao",
// };
// // key: access_t

// fetchQuery(useEnvironment, query, variables).then((data) => {
//   console.log(data);
//   // access the graphql response
// });

// const query = graphql`
//   query LoginQuery {
//     login(Key: $socialKey, Type: $socialType) {
//       key
//       type
//     }
//   }
// `;

const test = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_ID);
      window.Kakao.Auth.createLoginButton({
        container: "#kakao-login",
        success: (auth: any) => {
          console.log("kakao 로그인 완료", auth);

          // const variables = {
          //   socialKey: "",
          //   socialType: "kakao",
          // };
          // //key: auth.access_token
          // fetchQuery(useEnvironment, query, variables).then((data) => {
          //   console.log(data);
          //   // access the graphql response
          // });

          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res: any) => console.log("kakao 사용자 정보", res),
            fail: (err: any) => console.log(err),
          });
        },
        fail: (err: any) => console.log(err),
      });
    };
  }, []);

  return (
    <>
      <KakaoLoginWrapper>
        <button className="login-btn">
          <div id="kakao-login"></div>
          <a>카카오 로그인</a>
        </button>
      </KakaoLoginWrapper>
    </>
  );
};

export default test;
