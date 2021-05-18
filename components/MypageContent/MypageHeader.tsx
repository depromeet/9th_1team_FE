import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;

  .mypage__header {
    box-sizing: border-box;
    /* border-bottom: 1px solid black; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.4rem;
  }
  .icon {
    display: inline-block;
  }
  .icon__wrapper .icon:nth-child(1) {
    margin-right: 1.4rem;
  }
`;

const MypageHeader = () => {
  return (
    <HeaderWrapper>
      <header className="mypage__header">마이페이지</header>
    </HeaderWrapper>
  );
};

export default MypageHeader;
