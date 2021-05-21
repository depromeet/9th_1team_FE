import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_USER } from "lib/queries";

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
  const [login, { data }] = useMutation(LOGIN_USER);

  const onLogin = () => {
    window.Kakao.Auth.login({
      success: (res) => {
        console.log("S", res);
        const variables = { socialKey: res.access_token, socialType: "kakao" };
        login({ variables })
          .then((res) => console.log("로그인 전달완료", res, data))
          .catch((err) => console.log("err", err));
      },

      fail: (res) => {
        console.log("F", res);
      },
    });
  };

  return (
    <>
      <KakaoLoginWrapper>
        <button className="login-btn" onClick={onLogin}>
          <div id="kakao-login"></div>
          <a>카카오 로그인</a>
        </button>
      </KakaoLoginWrapper>
    </>
  );
};

export default test;
