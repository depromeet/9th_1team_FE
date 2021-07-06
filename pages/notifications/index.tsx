import React from "react";
import Header from "components/Header";
import ChatIcon from "../../public/opinion.svg";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import Link from "next/link";
import { Container, NotiLists, NotiItem, IconWrapper, Background, ContentWrapper, Footer } from "./index.style";

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
      <Header title="알림" />
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
