import React from "react";
import "./UserHeader.scss";
import { useMediaQuery } from "react-responsive";
import UserHeaderDesktop from "./UserHeaderDesktop";
import UserHeaderMoblie from "./UserHeaderMoblie";
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
export default function UserHeader() {
  return (
    <div>
      <Desktop>
        <UserHeaderDesktop />
      </Desktop>
      <Tablet>
        <UserHeaderMoblie />
      </Tablet>
      <Mobile>
        <UserHeaderMoblie />
      </Mobile>
    </div>
  );
}
