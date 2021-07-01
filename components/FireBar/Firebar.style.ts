import styled from "styled-components";

export const FireBarWrapper = styled.div`
  width: 100%;
  .fire {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    transition: 0.8s;
    &__rectangle {
      :first-child {
        top: auto;
        bottom: 0;
        left: auto;
        right: 0rem;
        border-radius: 12px 12px 0px 12px;
      }
      transition: 0.8s;
      background-color: white;
      top: -0.8rem;
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
    transition: 0.8s;
    :last-child {
      left: auto;
      right: 0;
    }
  }
`;
