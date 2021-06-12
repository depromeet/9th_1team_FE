import styled from "styled-components";

const MoreMenu = styled.ul<{ isOpen: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 12.7rem;
  position: absolute;
  right: 0;
  z-index: 2;
  background-color: #fff;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  li {
  }
  li a {
    display: inline-block;
    width: 100%;
    padding: 1.5rem 0 1.5rem 1.6rem;
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
  onDelete: () => void;
  onModify: () => void;
}

const CommentMore: React.FC<IsMineProps> = ({
  isMine,
  isOpen,
  onDelete,
  onModify,
}) => {
  if (!isMine) {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a>신고</a>
        </li>
      </MoreMenu>
    );
  } else {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a onClick={onModify}>수정하기</a>
        </li>
        <li>
          <a onClick={onDelete}>삭제</a>
        </li>
      </MoreMenu>
    );
  }
};

export default CommentMore;
