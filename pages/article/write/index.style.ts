import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  color: #2a2a2d;
`;

export const CloseBtn = styled.button`
  width: 16px;
  height: 16px;
`;

export const HelpBtn = styled.button`
  width: 16px;
  height: 16px;
`;

export const InputTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

export const BalanceSelectBtn = styled.button`
  height: 56px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 0.7px solid #cacad8;
  box-sizing: border-box;
  border-radius: 8px;

  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
