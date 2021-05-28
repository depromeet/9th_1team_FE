import styled from "styled-components";

export const MypageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 5.2rem);
  box-sizing: border-box;

  .delete-circle {
    //opacity : 0;
    // visibility: hidden;
  }
  .edit-mode {
    .delete-circle {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const UserInfo = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 9.5rem;
  padding: 1.6rem;
  box-sizing: border-box;
`;

export const UserImageArea = styled.div``;

export const UserImage = styled.div`
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  border: 2px solid #e9ecef;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const UserName = styled.span`
  font-family: "NanumSquareRound";
  font-size: 2rem;
  font-weight: 800;
  margin: 0 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardsSection = styled.section`
  flex: 1;
  padding: 1.6rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const CardsHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    display: inline-block;
  }
`;

export const EditBtn = styled.button`
  font-size: 1.4rem;
  color: #797878;
  background-color: transparent;
  border: none;
`;

export const LogoutWrapper = styled.div`
  padding: 2.4rem;
  text-align: center;
  background-color: #f8f9fa;
`;

export const LogoutBtn = styled.button`
  color: #868e96;
  font-family: "Noto Sans KR";
  font-size: 1.4rem;
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: #868e96;
    left: 0;
    bottom: 1px;
  }
`;

export const NoticeLink = styled.a``;
