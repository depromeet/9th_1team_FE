import styled from "styled-components";

const MoreMenu = styled.ul<{ isOpen: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 140px;
  position: absolute;
  right: 0;
  z-index: 2;
  background-color: #fff;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  margin-right: 1.6rem;

  li {
  }
  li a {
    display: inline-block;
    width: 100%;
    padding: 15px 0 15px 16px;
    font-size: 1.3rem;
    border-bottom: 1px solid #e9ecef;
    box-sizing: border-box;
  }
  li:last-child a {
    border-bottom: none;
  }
`;

interface IsMineProps {
  isMine: boolean;
  isOpen: boolean;
}

const HeaderMore: React.FC<IsMineProps> = ({ isMine, isOpen }) => {
  if (!isMine) {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a>URL복사하기</a>
        </li>
        <li>
          <a>신고</a>
        </li>
      </MoreMenu>
    );
  } else {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a>URL복사하기</a>
        </li>
        <li>
          <a>수정하기</a>
        </li>
        <li>
          <a>삭제</a>
        </li>
      </MoreMenu>
    );
  }
};

export default HeaderMore;
