import type { NextPage } from "next";
import Head from "next/head";

import { DefaultLayout } from "@layouts/default";
import { Container } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const fileTree = [""];

  return (
    <DefaultLayout fileTree={fileTree}>
      <Container>hogehoge</Container>
    </DefaultLayout>
  );
};

export default Home;
