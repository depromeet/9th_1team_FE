import styled from "styled-components";

export const FireBarWrapper = styled.div`
  .fire {
    position: absolute;
    &__rectangle {
      :first-child {
        top: auto;
        bottom: -0.4rem;
        left: auto;
        right: 0.3rem;
        border-radius: 12px 12px 0px 12px;
        color: #e56f53;
      }
      color: #f8d272;

      top: -0.4rem;
      left: 0.3rem;
      position: absolute;
      z-index: 1;
      font-size: 1.4rem;
      font-weight: 800;
      padding: 0.3rem 0.9rem;
      padding-top: 0.5rem;
      background: #f8f9fa;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
      border-radius: 0px 12px 12px 12px;
    }
  }
`;