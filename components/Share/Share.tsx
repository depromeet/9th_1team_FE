import React from "react";
import styled from "styled-components";
import FacebookIcon from "../../public/facebook.svg";
import TwitterIcon from "../../public/twitter.svg";
import UrlIcon from "../../public/url.svg";

const ShareWrapper = styled.div`
  width: 100%;
  height: 10.1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2.2rem 0;

  p {
    font-size: 1.3rem;
    font-weight: 500;
    color: #868e96;
  }
  .icon__wrapper {
    display: flex;
    justify-content: center;
  }
  .share-icon {
    margin: 0.5rem 0.2rem 0 0.2rem;
  }
`;

const Share = () => {
  return (
    <ShareWrapper>
      <p>친구들에게 공유해서 의견을 들어볼까요?</p>
      <div className="icon__wrapper">
        <FacebookIcon className="share-icon" />
        <TwitterIcon className="share-icon" />
        <UrlIcon className="share-icon" />
      </div>
    </ShareWrapper>
  );
};

export default Share;
