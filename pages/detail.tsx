// article > [id].tsx로 변경해야함
import styled from "styled-components";
import Comments from "../components/Comment/Comments";
import DetailHeader from "../components/DetailContent/DetailHeader";
import RadioBox from "../components/DetailContent/RadioBox";

const DetailWrapper = styled.div`
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .fake__image {
    width: 20px;
    height: 20px;
    background-color: tomato;
    border-radius: 50%;
  }
  .play__wrapper {
  }
  .play__ment {
    margin: 0;
  }
  .comment__count {
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #868e96;
    border-radius: 15px;
  }
  .share {
    width: 100%;
    height: 101px;
    background-color: #f8f9fa;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .share p {
    margin: 0;
  }
  .icon__wrapper {
    display: flex;
    justify-content: center;
  }
  .fake__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: blue;
  }
`;

const Detail = () => {
  return (
    <>
      <DetailHeader />
      <DetailWrapper>
        <RadioBox />
        <div className="contents__wrapper">
          <div className="status">
            <div className="left">
              <div className="fake__image"></div>
              <div className="play__wrapper">
                <p className="play__ment">따끈따끈한 밸런스 게임</p>
                <span className="play__count">참여 2333</span>
              </div>
            </div>
            <span className="comment__count">의견 145개</span>
          </div>
          <div className="contents">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              asperiores animi nemo, ex officia eos, voluptate, provident sed
              dolorem nisi magnam assumenda quisquam cumque enim! Vel aspernatur
              distinctio voluptates laudantium earum perferendis minima
              obcaecati nesciunt eligendi tempora officia nemo dolor rem aut
              adipisci, voluptatibus unde odit, a libero quas ea?
            </p>
            <span className="author">made by 김정현</span>
            <span>&middot;</span>
            <span className="pub-date">1일 전</span>
          </div>
          <div className="share">
            <p>친구들에게 공유해서 의견을 들어볼까요?</p>
            <div className="icon__wrapper">
              <div className="fake__icon"></div>
              <div className="fake__icon"></div>
              <div className="fake__icon"></div>
            </div>
          </div>
          <div>
            <div>a 이전 게임</div>
            <div>b 다음 게임</div>
          </div>
        </div>
        <Comments />
      </DetailWrapper>
    </>
  );
};

export default Detail;
