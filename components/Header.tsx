import { useTheme, css, Row, Spacer, Text } from "@nextui-org/react";
import { BsBrightnessHigh, BsGithub } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

import { Search } from "@components/Search";

export const Header = () => {
  const { theme } = useTheme();

  return (
    <header>
      <nav
        className="navigation"
        style={{ height: "60px", border: "1px", position: "sticky" }}
      >
        <Row
          justify="space-between"
          fluid
          css={{
            border: "1px",
            position: "relative",
            boxShadow: "0 1px 1px 0px rgba(9, 9, 9, 0.23)",
            background: "transparent none repeat scroll 0% 0%",
            alignItems: "center",
          }}
        >
          <Search />
          <Row
            justify="flex-end"
            align="flex-end"
            gap={1}
            css={{ width: "20%" }}
          >
            <BsGithub size={20} />
          </Row>
        </Row>
      </nav>
    </header>
  );
};
