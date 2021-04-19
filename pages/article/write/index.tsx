import { useState } from "react";
import Modal from "react-modal";
import { SketchPicker } from "react-color";

Modal.setAppElement("#__next");

const Write = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [balanceId, setBalanceId] = useState("");
  const [color, setColor] = useState({});

  const onClose = () => {
    setIsOpenModal(false);
    setBalanceId("");
  };

  const onOpenBalance = (balanceId: string) => () => {
    setIsOpenModal(true);
    setBalanceId(balanceId);
  };

  const handleChangeComplete = (color) => {
    setColor(color);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onClose}>
        <div>선택지 {balanceId}</div>
        <div>
          <input placeholder="내용을 입력해주세요" />
          <input placeholder="내용을 입력해주세요" />
        </div>
        <div>
          <button>서브 텍스트 추가하기</button>
          <button onClick={() => setIsOpenColor(true)}>텍스트 색상 변경</button>
          <button>사진 추가</button>
        </div>
      </Modal>
      <Modal isOpen={isOpenColor}>
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
