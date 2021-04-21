// article > [id].tsx로 변경해야함
import styled from "styled-components";
import Comments from "../components/Comments";
import RadioBox from "../components/RadioBox";

const InfoWrapper = styled.div`
  .writer,
  .date {
    font-size: 12px;
    color: #838383;
  }
  .writer {
    position: relative;
    margin-right: 14px;
  }
  .writer:after {
    content: "";
    position: absolute;
    right: -7px;
    top: 2px;
    width: 1px;
    height: 10px;
    background-color: #c4c4c4;
  }
  .count__wrapper {
    display: inline-block;
    border: 1px solid #838383;
    border-radius: 20px;
    width: 110px;
    height: 33px;
    line-height: 33px;
    text-align: center;
  }
  .count {
    color: #222222;
    font-size: 13px;
  }
`;

const Detail = () => {
  return (
    <div>
      detail
      <InfoWrapper>
        <span className="writer">김정현</span>
        <span className="date">2021.02.01</span>
        <div className="count__wrapper">
          <span className="icon">👩🏼‍🦳</span>
          <span className="count">2403명 참여</span>
        </div>
      </InfoWrapper>
      <RadioBox />
      <Comments />
    </div>
  );
};

export default Detail;
