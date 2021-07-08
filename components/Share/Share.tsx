import React from "react";
import FacebookIcon from "public/facebook.svg";
import TwitterIcon from "public/twitter.svg";
import KakaoIcon from "public/kakao-share.svg";
import UrlIcon from "public/url.svg";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ShareWrapper } from './Share.style'

interface ShareProps {
  url: string;
  text: string;
  imgUrl?: string;
}

const Share: React.FC<ShareProps> = ({ url, text }) => {
  const onShareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `토맛토 | 오늘의 밸런스 게임`,
        description: text,
        imageUrl: "https://i.ibb.co/qYjdGHJ/tomato-social.png",
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: "밸런스 게임 참여하기",
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

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
        <KakaoIcon className="share-icon" onClick={onShareKakao} />
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
