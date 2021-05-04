import styled from "styled-components";
import Comment from "public/comment.svg";
import Share from "public/share.svg";
import More from "public/more.svg";

const FeedPost = () => {
  return (
    <Container>
      <div
        className="option-box"
        style={{ background: "#E66F53", color: "white" }}
      >
        추성훈 선수한테 맞고 이국종 교수한테 수술받기
      </div>
      <div className="option-box" style={{ background: "#FFD569" }}>
        이국종 교수한테 맞고 추성훈 선수한테 수술받기
      </div>

      <div className="content">
        <div className="content__title">
          굳세게 을 인생을같이 공백포함 20자...
        </div>
        <div className="content__state">
          <div>참여 1034 • 의견 145</div>
          <div>1일전</div>
        </div>
        <div className="content__buttons">
          <div className="content__buttons__button">
            <Comment />
          </div>
          <div className="content__buttons__button">
            <Share />
          </div>
          <div className="content__buttons__button">
            <More />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 37.9rem;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  margin-bottom: 2.5rem;
  .option-box {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 0 1.6rem;
    height: 12.7rem;
    font-size: 2rem;
    font-weight: 800;
    line-height: 2.6rem;
  }
  .content {
    padding: 1.5rem;
    color: #606060;
    &__title {
      color: #222222;
      font-size: 1.5rem;
    }
    &__state {
      display: flex;
      margin-top: 1.2rem;
      font-size: 1.2rem;
      justify-content: space-between;
    }
    &__buttons {
      padding: 1.5rem 0;
      margin-top: 1.3rem;
      border: 0 solid #e9ecef;
      border-top-width: 0.1rem;
      display: flex;
      font-size: 1.2rem;
      &__button {
        display: flex;
        align-items: center;
        :first-child {
          ::after {
            content: "의견 쓰기";
            margin-left: 0.5rem;
            margin-top: 0.5rem;
          }
        }
        :nth-child(2) {
          margin-left: 1.4rem;
          ::after {
            content: "공유하기";
            margin-left: 0.5rem;
            margin-top: 0.5rem;
          }
        }
        :last-child {
          margin-left: auto;
        }
      }
    }
  }
`;

export default FeedPost;
