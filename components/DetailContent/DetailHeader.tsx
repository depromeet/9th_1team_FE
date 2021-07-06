import React, { useState } from "react";
import PrevIcon from "../../public/top-prev.svg";
import ShareIcon from "../../public/top-share.svg";
import MoreIcon from "../../public/top-more.svg";
import HeaderMore from "./HederMore";
import { HeaderWrapper } from "./DetailContent.style";

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
