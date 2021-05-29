import styled from "styled-components";

export const LoginHeader = styled.header`
  width: 100%;
  padding: 1.6rem;
  height: 5.2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 5.2rem);
  padding: 1.6rem;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;

export const BtnContainer = styled.div`
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

export const NaverButton = styled.button`
  background-color: #2db400;
  color: #fff;
  margin-bottom: 1.2rem;
`;

export const KakaoButton = styled.button`
  background-color: #fee500;
  font-weight: 500;
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

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
`;
