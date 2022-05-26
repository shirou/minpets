import { ReactNode } from "react";

import { useTheme, css, Container, Spacer, Text } from "@nextui-org/react";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import Footer from "@components/Footer";

interface Props {
  fileTree: string[];
  children: ReactNode;
}

export function DefaultLayout({ fileTree, children }: Props) {
  return (
    <Container
      fluid
      css={{
        paddingLeft: "calc(0.5 * var(--nextui-space-sm))",
        paddingRight: "calc(0.5 * var(--nextui-space-sm))",
      }}
    >
      <Sidebar fileTree={fileTree} />
      <Container css={{marginLeft: "150px"}}>
        <Header />
        <main>{children}</main>
      </Container>
      <Footer />
    </Container>
  );
}
