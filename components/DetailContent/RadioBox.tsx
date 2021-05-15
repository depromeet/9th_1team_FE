import styled from "styled-components";

const RadioWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  .radio-box {
    position: relative;
    height: 143px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .radio-btn {
      position: absolute;
      display: inline-block;
      right: 0.7rem;
      top: 0.7rem;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/circle.svg");
    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + .radio-btn:before {
      content: "";
      position: absolute;
      right: 0.7px;
      top: 0.7px;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/check-circle.svg");
    }
  }
  .first {
    background-color: #e56f53;
  }
  .second {
    background-color: #ffd569;
  }
  h2 {
    font-size: 2rem;
    font-weight: 800;
  }
`;

const RadioBox: React.FC = () => {
  return (
    <RadioWrapper>
      <div className="radio-box first">
        <h2>카레맛 똥</h2>

        <input name="balance" type="radio" id="choice-1" />
        <label className="radio-btn" htmlFor="choice-1"></label>
      </div>
      <div className="radio-box second">
        <h2>똥맛 카레</h2>

        <input name="balance" type="radio" id="choice-2" />
        <label className="radio-btn" htmlFor="choice-2"></label>
      </div>
    </RadioWrapper>
  );
};

export default RadioBox;
