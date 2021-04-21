import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { SketchPicker } from "react-color";

Modal.setAppElement("#__next");

const Write = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenColor, setIsOpenColorModal] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [balanceId, setBalanceId] = useState("");
  const [color, setColor] = useState({});
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");
  const [BallanceDataA, setBallanceDataA] = useState(null);
  const [BallanceDataB, setBallanceDataB] = useState(null);

  const onClose = () => {
    setIsOpenModal(false);
    setBalanceId("");
  };

  const onColorClose = () => {
    setIsOpenColorModal(false);
    setColor("");
  };

  const onOpenBalance = (balanceId: string) => () => {
    setIsOpenModal(true);
    setBalanceId(balanceId);
  };

  const handleChangeComplete = (color: string) => {
    setColor(color);
  };

  const onAddSubText = () => {
    setIsOpenSubText(true);
  };

  const onRemoveSubText = () => {
    setIsOpenSubText(false);
  };

  const onText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubText = (e: ChangeEvent<HTMLInputElement>) => {
    setSubText(e.target.value);
  };

  const onSuccess = () => {};

  return (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onClose}>
        <div>선택지 {balanceId}</div>
        <div>
          <input
            placeholder="내용을 입력해주세요"
            value={text}
            onChange={onText}
          />
          {isOpenSubText && (
            <input
              placeholder="서브 텍스트 내용을 입력해주세요"
              value={subText}
              onChange={onSubText}
            />
          )}
        </div>
        <div>
          {!isOpenSubText ? (
            <button onClick={onAddSubText}>서브 텍스트 추가하기</button>
          ) : (
            <button onClick={onRemoveSubText}>서브 텍스트 삭제</button>
          )}
          <button onClick={() => setIsOpenColorModal(true)}>
            텍스트 색상 변경
          </button>
          <input type="file" />
        </div>
        <div>
          <button onClick={onSuccess}>완료</button>
        </div>
      </Modal>
      <Modal isOpen={isOpenColor} onRequestClose={onColorClose}>
        <SketchPicker
          color={color.hex}
          onChangeComplete={handleChangeComplete}
        />
      </Modal>
      <div>
        <div>밸런스 게임 만들기</div>
        <div>
          <div>선택지</div>
          <button onClick={onOpenBalance("A")}>선택지 등록</button>
          <div>vs</div>
          <button onClick={onOpenBalance("B")}>선택지 등록</button>
        </div>
        <div>
          <div>내용</div>
          <div>
            <input type="text" placeholder="제목을 입력해주세요!" />
          </div>
        </div>
        <div>
          <div>키워드</div>
          <div>
            <input type="text" placeholder="#음식 #희망 #로또" />
          </div>
        </div>
        <div>
          <button>등록하기</button>
        </div>
      </div>
    </>
  );
};

export default Write;
