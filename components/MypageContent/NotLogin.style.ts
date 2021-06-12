import styled from "styled-components";

export const Container = styled.div`
  height: calc(100% - 12.8rem);
`;

export const BtnContainer = styled.div`
  .login {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: #343a40;
  p {
    margin-top: 2.2rem;
  }

  /* main */
`;
