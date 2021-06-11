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

var express = require("express");
var app = express();
var client_id = "XGDSeirQeWFadsfGP6YI";
var client_secret = "bRcMqAGOj8";
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/login/oauth/naver");
var api_url = "";
app.get("/naverlogin", function (req, res) {
  api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});
app.get("/login/oauth/naver", function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3000, function () {
  console.log("http://127.0.0.1:3000/naverlogin app listening on port 3000!");
});
