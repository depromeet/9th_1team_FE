import React from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import FeedPosts from "components/FeedPosts";

interface IndexProps {
  isLoggedin: boolean;
}

const Index: React.FC<IndexProps> = ({ isLoggedin }) => {
  return <FeedPosts isLoggedin={isLoggedin} />;
};

// const Order = styled.div<{ isSelect: boolean }>`
//   color: ${({ isSelect }) => (isSelect ? "#343A40" : "#ADB5BD")};
// `;
export const getServerSideProps: GetServerSideProps = async function (context) {
  const { token } = nookies.get(context);
  const isLoggedin = !!token;

  return {
    props: {
      isLoggedin,
    },
  };
};

export default Index;
