import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 13px;
  box-sizing: border-box;
`;

export const BackBtn = styled.button.attrs({
  type: "button",
})`
  width: 32px;
  height: 32px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #343a40;
`;

export const BtnContainer = styled.div`
  width: 72px;
`;
