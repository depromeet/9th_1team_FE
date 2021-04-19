import { useState } from "react";
import Modal from "react-modal";

const Write = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [balanceId, setBalanceId] = useState("");

  const onClose = () => {
    setIsOpenModal(false);
    setBalanceId("");
  };

  const onOpenBalance = (balanceId: string) => () => {
    setIsOpenModal(true);
    setBalanceId(balanceId);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onClose}>
        ??? {balanceId}
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
