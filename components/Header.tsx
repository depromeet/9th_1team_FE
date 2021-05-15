import { useRouter } from "next/router";
import styled from "styled-components";
import MakeButton from "public/makeBtn.svg";

const Header = () => {
  const pathname = useRouter().pathname;

  return (
    <Container>
      <div className="first-icon">{pathname === "/feed" && <MakeButton />}</div>
      <div className="second-icon">
        {pathname === "/feed" && <span className="second-icon__my">MY</span>}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 5.2rem;
  position: fixed;
  background-color: white;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .first-icon {
    position: absolute;
    right: 6.175rem;
  }
  .second-icon {
    position: absolute;
    right: 1.59rem;
    &__my {
      font-size: 1.7rem;
      font-weight: 800;
    }
  }
`;

export default Header;
