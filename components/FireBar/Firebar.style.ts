import styled from "styled-components";

export const FireBarWrapper = styled.div`
  width: 100%;
  .fire {
    top: 12.4rem;
    position: absolute;
    &__rectangle {
      :first-child {
        top: auto;
        bottom: -0.4rem;
        left: auto;
        right: 0rem;
        border-radius: 12px 12px 0px 12px;
      }
      background-color: white;
      top: -0.4rem;
      left: 0rem;
      position: absolute;
      z-index: 1;
      font-size: 1.4rem;
      font-weight: 800;
      padding: 0.5rem 1.1rem;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
      border-radius: 0px 12px 12px 12px;
    }
  }
  .line {
    width: 50%;
    height: 0.8rem;
    position: absolute;
    z-index: 0;
    top: 12rem;
    left: 0;
    :last-child {
      left: auto;
      right: 0;
    }
  }
`;
