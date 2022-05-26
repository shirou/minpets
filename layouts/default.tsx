import { Container } from '@nextui-org/react';
import { ReactNode } from "react";

import { Header } from '@components/Header';
import Footer from '@components/Footer';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <Container fluid css={{paddingLeft:"calc(0.5 * var(--nextui-space-sm))", paddingRight: "calc(0.5 * var(--nextui-space-sm))"}}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
