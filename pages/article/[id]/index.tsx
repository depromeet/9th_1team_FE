import { useRouter } from "next/router";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import DetailHeader from "components/DetailContent/DetailHeader";
import RadioBox from "components/DetailContent/RadioBox";
import Comments from "components/Comment/Comments";
import PrevGameIcon from "../../../public/game-prev.svg";
import NextGameIcon from "../../../public/game-next.svg";
import FacebookIcon from "../../../public/facebook.svg";
import TwitterIcon from "../../../public/twitter.svg";
import UrlIcon from "../../../public/url.svg";

const DetailWrapper = styled.div`
  .contents__wrapper {
    padding: 0 1.6rem;
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.4rem 0 1rem;
    p,
    span {
      font-size: 1.2rem;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  .contents p {
    font-size: 1.4rem;
    line-height: 2.45rem;
    margin-bottom: 0.5rem;
  }
  .contents span {
    font-size: 1.2rem;
    color: #868e96;
  }
  .fake__image {
    width: 2rem;
    height: 2rem;
    background-color: tomato;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .play__wrapper {
    display: flex;
    flex-direction: column;
  }
  .play-ment {
    margin: 0;
    color: #e56f53;
    line-height: 1.7rem !important;
    font-weight: 500;
  }
  .play-count {
    line-height: 1.7rem !important;
  }
  .comment-count {
    display: inline-block;
    width: 7rem;
    line-height: 3rem;
    border: 1px solid #868e96;
    border-radius: 15px;
    text-align: center;
    color: #868e96;
    font-weight: 500;
    box-sizing: border-box;
  }
  .share {
    width: 100%;
    height: 10.1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2.2rem 0;
  }
  .share p {
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
  nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.3rem;
  }
  .prev,
  .next {
    display: flex;
    font-size: 1.3rem;
    line-height: 2rem;
    align-items: center;
    span {
      font-weight: 500;
    }
  }
`;

//주소 article/a9e61383-165f-4caf-924e-1994de4a1ff2

const GET_GAME = gql`
  query {
    balanceGameLogined(id: "a9e61383-165f-4caf-924e-1994de4a1ff2") {
      id
      userId
      description
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_GAME);

  console.log(id, data);

  return (
    <>
      <h1>Post: {id}</h1>
      {data && (
        <>
          <DetailWrapper>
            {console.log(data)}
            <h1>{data.id}</h1>
            <DetailHeader />
            <div className="contents__wrapper">
              <RadioBox />
              <div className="status">
                <div className="left">
                  <div className="fake__image"></div>
                  <div className="play__wrapper">
                    <p className="play-ment">따끈따끈한 밸런스 게임</p>
                    <span className="play-count">참여 2333</span>
                  </div>
                </div>
                <span className="comment-count">의견 145</span>
              </div>
              <div className="contents">
                <p>{data.description}</p>
                <span className="author">made by 김정현</span>
                <span>•</span>
                <span className="pub-date">1일 전</span>
              </div>
              <div className="share">
                <p>친구들에게 공유해서 의견을 들어볼까요?</p>
                <div className="icon__wrapper">
                  <FacebookIcon className="share-icon" />
                  <TwitterIcon className="share-icon" />
                  <UrlIcon className="share-icon" />
                </div>
              </div>
              <nav>
                <div className="prev">
                  <PrevGameIcon />
                  <span>이전 게임</span>
                </div>
                <div className="next">
                  <span>다음 게임</span>
                  <NextGameIcon />
                </div>
              </nav>
            </div>
            <Comments comments={data.comments} />
          </DetailWrapper>
        </>
      )}
    </>
  );
};

export default Post;