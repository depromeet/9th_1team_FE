import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 36rem;
  overflow: hidden;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  margin-bottom: 2.5rem;
  background: white;
  position: relative;
  box-sizing: border-box;
  .content {
    padding-bottom: 1rem;
    color: #606060;
    position: relative;
    &__info {
      padding: 1rem 0;
      cursor: pointer;
    }
    &__title {
      display: block;
      padding: 0 0.8rem 0.3rem 0.8rem;
      color: #222222;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > a {
        text-decoration: none;
        color: inherit;
      }
    }
    &__state {
      padding: 0 0.8rem;
      display: flex;
      margin-top: 0.4rem;
      font-size: 1.1rem;
      line-height: 1.6rem;
      color: #868e96;
    }
    &__buttons {
      padding: 1.3rem 0.8rem;
      border: 0 solid #e9ecef;
      border-top-width: 0.1rem;
      display: flex;
      font-size: 1.3rem;
      color: #343a40;
      font-weight: 500;
      &__button {
        display: flex;
        align-items: center;
        :first-child {
          ::after {
            content: "의견 쓰기";
            margin-left: 0.4rem;
          }
        }
        :nth-child(2) {
          margin-left: 1.4rem;
        }
        :last-child {
          margin-left: auto;
        }
      }
    }
  }
`;

export const VoteWrapper = styled.div`
  position: relative;
`;

export const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const MoreMenu = styled.ul`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 140px;
  position: absolute;
  right: -3rem;
  bottom: 4.5rem;
  z-index: 2;
  background-color: #fff;
  margin-right: 1.6rem;

  li a {
    display: inline-block;
    width: 100%;
    padding: 15px 0 15px 16px;
    font-size: 1.3rem;
    border-bottom: 1px solid #e9ecef;
    box-sizing: border-box;
  }
  li:last-child a {
    border-bottom: none;
  }
`;