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

export const BalanceCardTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  padding: 5px 0;
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
  color: rgba(52, 58, 64, 0.5);
  > input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

export const BalanceCardBtn = styled.label`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 22px;
  height: 20px;
  color: initial;
  > img {
    display: block;
    width: 22px;
    height: 20px;
  }
  > input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
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
    z-index: 1;
    img {
      display: block;
      width: 25px;
      height: 15px;
    }
  }
`;

export const ColorSamples = styled.div`
  padding: 10px 2px;
`;

export const ColorSample = styled.button`
  width: 36px;
  height: 36px;
  margin-left: 14px;
  &:first-child {
    margin-left: 0;
  }
`;

export const ColorSampleInfo = styled.div`
  color: #868e96;
  font-size: 11px;
  line-height: 16px;
`;

export const InputTextInfoContainer = styled.div`
  position: relative;
  margin: 28px 16px 0;
  > .title {
    font-size: 13px;
    line-height: 140%;
    margin-bottom: 2px;
  }
  > .textarea {
    border-bottom: 1px solid #e9ecef;
    padding: 4px 0;
    white-space: pre-wrap;
    font-size: 14px;
    word-break: break-word;
    > textarea {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  > .length {
    position: absolute;
    right: 16px;
    top: 0;
    font-size: 13px;
    line-height: 140%;
    color: #868e96;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  margin: 28px 16px 0;
  > .title {
    font-size: 13px;
    line-height: 140%;
    margin-bottom: 2px;
  }
  > .input {
    border-bottom: 1px solid #e9ecef;
    padding: 4px 0;
    > input {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
    }
  }
`;

export const SubmitBtnContainer = styled.div`
  margin: 28px 16px;
`;

export const SubmitBtn = styled.button`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  font-weight: bold;
  font-size: 14px;
  line-height: 165%;
  letter-spacing: -0.05em;

  background-color: #f74d4d;
  color: #ffffff;
  border: none;

  border-radius: 8px;

  &:disabled {
    background-color: #a5a5a5;
    color: #ffffff;
  }
`;
