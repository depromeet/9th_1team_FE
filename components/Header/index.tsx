import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import CommonHeader from "./CommonHeader";
import HomeHeader from "./HomeHeader";

export interface HeaderProps {
  title?: string;
  onClickBack?: () => void;
}

const Header: React.FC<PropsWithChildren<HeaderProps>> = ({
  title = "",
  onClickBack,
  children,
}) => {
  const pathname = useRouter().pathname;
  if (pathname === "/") return <HomeHeader />;
  else
    return (
      <CommonHeader
        title={title}
        onClickBack={onClickBack}
        children={children}
      />
    );
};

export default Header;
