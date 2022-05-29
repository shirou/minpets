import { Split, SplitItem } from "@patternfly/react-core";

import { BsBrightnessHigh, BsGithub } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

import { Search } from "@components/Search";

export const Header = () => {
  return (
    <header>
      <div>
        <Split hasGutter style={{ boxSizing: "border-box" }}>
          <SplitItem isFilled style={{ maxWidth: "50%" }}>
            <Search />
          </SplitItem>
          <SplitItem>
            <BsGithub size={30} />
          </SplitItem>
        </Split>
      </div>
    </header>
  );
};
