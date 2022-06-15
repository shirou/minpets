import { ReactNode } from "react";

import { Header } from "@components/Header";
import { Sidebar as SideMenu } from "@components/Sidebar";
import Footer from "@components/Footer";
import { Sidebar, SidebarContent, SidebarPanel } from "@patternfly/react-core";

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <Sidebar hasGutter>
      <SidebarPanel width={{ default: "width_25", sm: "width_25" }}>
        <SideMenu />
      </SidebarPanel>
      <SidebarContent>
        <Header />
        <main>{children}</main>
      </SidebarContent>
    </Sidebar>
  );
}
