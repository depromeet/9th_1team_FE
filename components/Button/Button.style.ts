import styled from "styled-components";

export const Button = styled.button.attrs({ type: "button" })`
  display: inline-flex;
  width: 36px;
  height: 36px;
  margin-left: 14px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  &:first-child {
    margin-left: 0;
  }
  flex-direction: column;
  > span {
    width: 100%;
    height: 100%;
    flex: 1;
  }
`;