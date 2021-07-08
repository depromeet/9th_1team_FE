import styled from "styled-components";

export const PickerWrapper = styled.div<{ picked: boolean }>`
  width: 3.6rem;
  height: 3.6rem;
  display: inline-block;
  border-radius: 0.8rem;
  position: relative;
  box-shadow: ${({ picked }) =>
    picked ? "0px 2px 2px rgba(0, 0, 0, 0.1)" : "none"};
`;

export const Border = styled.div<{ picked: boolean }>`
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.8rem;
  box-shadow: ${({ picked }) =>
    picked ? "0 0 0 4px #fff inset" : "0 0 0 2px #fff inset"};
`;

export const ColorWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const Color = styled.div<{ color: string }>`
  background-color: ${({ color }) => (color ? color : "#fff")};
  width: 100%;
  height: 50%;
`;