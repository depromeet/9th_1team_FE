import styled from "styled-components";
import CommonHeader from "components/Header/CommonHeader";
import React from "react";
import ChatIcon from "../../public/opinion.svg";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e9ecef;
`;

const NotiLists = styled.ul``;

const NotiItem = styled.li`
  a {
    display: flex;
    padding: 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e9ecef;
    text-decoration: none;
  }
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

const MY_NOTIFICATIONS_QUERY = gql`
  query {
    myNotifications {
      id
      kind
      balanceGameId
      userForId
      userFromId
      userFromNickname
      commentId
      commentContent
      replyId
      replyContent
      status
      createdAt
    }
  }
`;

const Notifications = () => {
  const { data } = useQuery(MY_NOTIFICATIONS_QUERY);

  console.log(data);

  if (!data) return null;

  const notifications = data?.myNotifications;

  const getContent = (notification: any) => {
    if (notification.commentId) {
      return notification.commentContent;
    } else if (notification.replyId) {
      return notification.reolyContent;
    } else {
      return "";
    }
  };

  const getContentId = (notification: any) => {
    return notification.commentId || notification.replyId;
  };

  return (
    <Container>
      <CommonHeader title="알림" />
      <NotiLists>
        {notifications.map((notification: any) => {
          const content = getContent(notification);
          const contentId = getContentId(notification);
          return (
            <NotiItem>
              <Link
                href={`/article/${notification.balanceGameId}?contentId=${contentId}`}
                passHref
              >
                <a>
                  <IconWrapper>
                    <Background
                      isRead={notification.isRead}
                      color={notification.color}
                    >
                      <ChatIcon />
                    </Background>
                  </IconWrapper>
                  <ContentWrapper isRead={notification.isRead}>
                    <div className="header">
                      <h2>
                        {notification.userFromNickname}님이 의견을 남기셨습니다.
                      </h2>
                      <span className="date">{notification.createdAt}</span>
                    </div>
                    <p className="text">{content}</p>
                  </ContentWrapper>
                </a>
              </Link>
            </NotiItem>
          );
        })}
      </NotiLists>
      <Footer>
        <p>알림 내역은 30일 이전까지만 확인 가능합니다. </p>
      </Footer>
    </Container>
  );
};

export default Notifications;
