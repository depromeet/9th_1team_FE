import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const BtnContainer = styled.div`
  .login {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-family: NanumSquareRound;
    font-weight: 800;
    font-size: 20px;
    line-height: 140%;

    color: #343a40;
    text-decoration: none;
    padding: 16px;
    height: 76px;
    box-sizing: border-box;
    border-bottom: 1px solid #e9ecef;
  }
`;
export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  font-family: Noto Sans CJK KR;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  /* main */

  color: #343a40;
  img {
    background-color: red;
    width: 100px;
    height: 100px;
    margin-bottom: 22px;
  }
`;
