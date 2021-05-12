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
  font-size: 13px;
  line-height: 14px;
  padding: 19px 0 5px;
`;

export const BalanceCard = styled.div`
  position: relative;
  height: 143px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  font-size: 20px;
  font-weight: 800;
`;

export const BalanceCardBtn = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 22px;
  height: 20px;
  img {
    display: block;
    width: 22px;
    height: 20px;
  }
`;

export const BalanceTitle = styled.div`
  padding: 3px 11px 0;
  .img {
    width: 38px;
    height: 34px;
  }
  .title {
    margin-top: 6px;
    font-size: 12px;
  }
`;

export const BalanceContainer = styled.div`
  padding: 18px 16px;
`;

export const BalanceCardContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  .vs {
    position: absolute;
    width: 25px;
    height: 15px;
    left: calc(50%);
    top: calc(50%);
    img {
      display: block;
      width: 25px;
      height: 15px;
    }
  }
`;
