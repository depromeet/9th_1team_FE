import React from "react";
import styled from "styled-components";
import FacebookIcon from "../../public/facebook.svg";
import TwitterIcon from "../../public/twitter.svg";
import UrlIcon from "../../public/url.svg";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

interface ShareProps {
  url: string;
  text: string;
}

const Share: React.FC<ShareProps> = ({ url, text }) => {
  return (
    <ShareWrapper>
      <p>친구들에게 공유해서 의견을 들어볼까요?</p>
      <div className="icon__wrapper">
        <FacebookShareButton url={url} quote={text}>
          <FacebookIcon className="share-icon" />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={text}>
          <TwitterIcon className="share-icon" />
        </TwitterShareButton>
        <CopyToClipboard
          text={url}
          onCopy={() => window.confirm("링크가 복사되었습니다.")}
        >
          <UrlIcon className="share-icon" />
        </CopyToClipboard>
      </div>
    </ShareWrapper>
  );
};

export default Share;
