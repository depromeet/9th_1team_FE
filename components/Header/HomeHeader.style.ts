import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.2rem;
  padding: 1.3rem;
  box-sizing: border-box;
  background-color: #fff;
`;

export const Title = styled.div`
  > a {
    display: inline-block;
    text-decoration: none;
  }
`;

export const Logo = styled.a`
  display: inline-flex;
  align-items: center;

  .letter {
    margin-left: 0.5rem;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CreateBalanceLink = styled.a``;

export const MypageLink = styled.a`
  font-family: "NanumSquareRound";
  font-weight: 700;
  font-size: 1.7rem;
  margin-left: 1.7rem;
  color: #343a40;
  text-decoration: none;
`;
