import CommonHeader from "components/Header/CommonHeader";
import React from "react";
import {
  Container,
  IconWrapper,
  ContentWrapper,
  NotiItem,
  NotiLists,
  Background,
  Footer,
} from "./index.style";
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
