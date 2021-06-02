import styled from "styled-components";
import CommonHeader from "components/Header/CommonHeader";
import React from "react";
import ChatIcon from "../../public/opinion.svg";
const data = [
  {
    id: 1,
    createdAt: "1분전",
    isRead: false,
    color: "#FFD569",
    name: "익명",
    content:
      "똥은 먹을게 못된다. 똥맛이어도 실체가 카레인게 낫다. 이런 어이없는 질문은 또 처음이네",
  },
  {
    id: 2,
    createdAt: "11분전",
    isRead: false,
    color: "#6980D1",
    name: "익명2",
    content:
      "똥은 먹을게 못된다. 똥맛이어도 실체가 카레인게 낫다. 이런 어이없는 질문은 또 처음이네",
  },
  {
    id: 3,
    createdAt: "18분전",
    isRead: true,
    color: "#6980D1",
    name: "아악",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quod impedit deserunt accusantium dolor quis fugit odio repellendus, facilis laudantium.",
  },
];

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e9ecef;
`;

const NotiLists = styled.ul``;

const NotiItem = styled.li`
  display: flex;
  padding: 1.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e9ecef;
`;

const IconWrapper = styled.div`
  width: 3.2rem;
  margin-right: 1.2rem; ;
`;

const Background = styled.div<{ isRead: boolean; color: string }>`
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

const ContentWrapper = styled.div<{ isRead: boolean }>`
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

const Footer = styled.footer`
  padding: 4.5rem 0 6rem 0;
  text-align: center;
  p {
    font-size: 1.2rem;
    color: #868e96;
    font-weight: 400;
  }
`;

const Notifications = () => {
  return (
    <>
      <CommonHeader title="알림" />
      <Container>
        {data.map((item) => (
          <NotiLists>
            <NotiItem>
              <IconWrapper>
                <Background isRead={item.isRead} color={item.color}>
                  <ChatIcon />
                </Background>
              </IconWrapper>
              <ContentWrapper isRead={item.isRead}>
                <div className="header">
                  <h2>{item.name}님이 의견을 남기셨습니다.</h2>
                  <span className="date">{item.createdAt}</span>
                </div>
                <p className="text">{item.content}</p>
              </ContentWrapper>
            </NotiItem>
          </NotiLists>
        ))}
        <Footer>
          <p>알림 내역은 30일 이전까지만 확인 가능합니다. </p>
        </Footer>
      </Container>
    </>
  );
};

export default Notifications;
