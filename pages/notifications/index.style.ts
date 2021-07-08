import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e9ecef;
`;

export const NotiLists = styled.ul``;

export const NotiItem = styled.li`
  a {
    display: flex;
    padding: 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e9ecef;
    text-decoration: none;
  }
`;

export const IconWrapper = styled.div`
  width: 3.2rem;
  margin-right: 1.2rem; ;
`;

export const Background = styled.div<{ isRead: boolean; color: string }>`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${({ isRead, color }) => (isRead ? "#E9ECEF" : `${color}`)};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    transform: scale(1.2);
    opacity: ${({ isRead }) => (isRead ? "0.5" : "1")};
  }
`;

export const ContentWrapper = styled.div<{ isRead: boolean }>`
  flex: 1;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      height: 2.5rem;
      line-height: 2.5rem;
      letter-spacing: -0.5px;
      font-size: 1.4rem;
      font-weight: 500;
      color: ${({ isRead }) => (isRead ? "#ADB5BD" : "#343a40")};
    }
    .date {
      font-size: 1.1rem;
      font-weight: 500;
      color: ${({ isRead }) => (isRead ? "#ADB5BD" : "#868e96")};
      margin-right: 0.8rem;
    }
  }
  .text {
    font-size: 1.2rem;
    color: ${({ isRead }) => (isRead ? "#ADB5BD" : "#343a40;")};
    font-weight: 400;
    line-height: 1.8rem;
  }
`;

export const Footer = styled.footer`
  padding: 4.5rem 0 6rem 0;
  text-align: center;
  p {
    font-size: 1.2rem;
    color: #868e96;
    font-weight: 400;
  }
`;