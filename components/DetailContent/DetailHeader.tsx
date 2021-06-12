import React, { useState } from "react";
import styled from "styled-components";
import PrevIcon from "../../public/top-prev.svg";
import ShareIcon from "../../public/top-share.svg";
import MoreIcon from "../../public/top-more.svg";
import HeaderMore from "./HederMore";

// header border-bottom 부분은 스크롤 했을때 나옴
const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;

  .detail__header {
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

const DetailHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMore = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <HeaderWrapper>
      <header className="detail__header">
        <div className="icon">
          <PrevIcon />
        </div>
        <div className="icon__wrapper">
          <div className="icon">
            <ShareIcon />
          </div>
          <div className="icon">
            <MoreIcon onClick={toggleMore} />
          </div>
        </div>
      </header>
      <HeaderMore isMine={false} isOpen={isOpen} />
    </HeaderWrapper>
  );
};

export default DetailHeader;
