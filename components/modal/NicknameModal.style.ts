import styled from "styled-components";

export const Container = styled.form``;

export const InputNicknameContainer = styled.div`
  position: relative;
  margin: 52px 16px 0;
  border-bottom: 1px solid #e9ecef;
  padding: 8px 24px 8px 0;
`;
export const InputNickname = styled.input`
  width: 100%;
  padding: 0;
  border: none;
  font-weight: bold;
  font-size: 20px;
  line-height: 140%;
  color: #343a40;
`;

export const DeleteCircleIconBtn = styled.button.attrs({
  type: "button",
})`
  position: absolute;
  right: 0;
  top: calc(50% - 17px);
  padding: 0;
  border: none;
  background-color: transparent;
`;

export const SubmitBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  margin: 16px 16px 30px;
  left: 0;
  right: 0;
`;

export const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
  width: 100%;
  background: #f74d4d;
  border-radius: 8px;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  border: none;

  color: #ffffff;

  font-family: Noto Sans CJK KR;
  font-weight: bold;
  font-size: 14px;
  line-height: 165%;

  letter-spacing: -0.05em;

  &:disabled {
    background: #adb5bd;
  }
`;
