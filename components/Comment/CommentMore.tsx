import { MoreMenu } from './Comment.style'

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
