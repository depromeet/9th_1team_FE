import styled from "styled-components";

const RadioWrapper = styled.div`
  width: 100%;

  .radio-box {
    position: relative;
    margin: 10px;
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .radio-btn {
      position: absolute;
      display: inline-block;
      right: 10px;
      top: 10px;
      width: 15px;
      height: 15px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked + .radio-btn:before {
      content: "";
      position: absolute;
      right: 0px;
      top: 0px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #fff;
    }
  }
  .first {
    background-color: green;
  }
  .second {
    background-color: blueviolet;
  }
`;

const RadioBox: React.FC = () => {
  return (
    <RadioWrapper>
      <div className="radio-box first">
        <h2>카레맛 똥</h2>
        <p>미슐랭 5스타급 맛 보장</p>
        <input name="balance" type="radio" id="choice-1" />
        <label className="radio-btn" htmlFor="choice-1"></label>
      </div>
      <div className="radio-box second">
        <h2>똥맛 카레</h2>
        <p>단, 재료는 최상급. 유기농 채소와 소고기 듬뿍</p>
        <input name="balance" type="radio" id="choice-2" />
        <label className="radio-btn" htmlFor="choice-2"></label>
      </div>
    </RadioWrapper>
  );
};

export default RadioBox;
