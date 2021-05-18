import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

export const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;

export const BtnContainer = styled.div`
  margin-top: 80px;
  width: 100%;
`;

export const KakaoButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  border-radius: 12px;
  background-color: #fee500;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: none;
  > img {
    width: 20px;
    height: 18px;
    margin-right: 17px;
  }
`;

export const WithoutLoginButton = styled.button`
  font-size: 17px;
  line-height: 25px;

  color: #868e96;
  margin-top: 30px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;
