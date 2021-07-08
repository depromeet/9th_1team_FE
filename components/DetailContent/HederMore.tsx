import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { clipboardCopy } from "utils/common";
import { MoreMenu } from './DetailContent.style'

interface IsMineProps {
  isMine: boolean;
  isOpen: boolean;
  postId?: string;
}

const REMOVE_BALANCE_GAME = gql`
  mutation removeBalanceGame($id: String!) {
    removeBalanceGame(id: $id)
  }
`;

const HeaderMore: React.FC<IsMineProps> = ({
  isMine = true,
  isOpen,
  postId,
}) => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/article/` + postId;

  const [mRemoveBalanceGame] = useMutation(REMOVE_BALANCE_GAME);
  const handleRemove = async () => {
    await mRemoveBalanceGame({
      variables: {
        id: postId,
      },
    });
    router.replace("/");
  };

  if (!isMine) {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a onClick={() => clipboardCopy(url)}>URL복사하기</a>
        </li>
        {/* <li>
          <a>신고</a>
        </li> */}
      </MoreMenu>
    );
  } else {
    return (
      <MoreMenu isOpen={isOpen}>
        <li>
          <a onClick={() => clipboardCopy(url)}>URL복사하기</a>
        </li>
        {/* <li>
          <a>수정하기</a>
        </li> */}
        <li>
          <a onClick={handleRemove}>삭제</a>
        </li>
      </MoreMenu>
    );
  }
};

export default HeaderMore;
