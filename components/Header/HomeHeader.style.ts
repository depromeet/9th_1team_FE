import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 13px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  > a {
    display: flex;
    align-items: center;

    font-family: NanumSquareRoundOTF;
    font-weight: 800;
    font-size: 18px;
    color: #f64d4d;
    text-decoration: none;
  }
`;

export const Logo = styled.div`
  width: 27px;
  height: 24px;
  background-color: red;
  margin-right: 11px;
`;

export const BtnContainer = styled.div`
  width: 72px;
  display: flex;
  align-items: center;
`;

export const CreateBalanceLink = styled.a`
  width: 24px;
  height: 24px;
  background-color: gray;
  margin-right: 10px;
`;

export const MypageLink = styled.a`
  width: 24px;
  height: 24px;
  background-color: gray;
`;
