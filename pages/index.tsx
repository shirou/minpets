import type { NextPage } from "next";
import Head from "next/head";
import { Text, Flex, FlexItem } from "@patternfly/react-core";

import { DefaultLayout } from "@layouts/default";

const Home: NextPage = () => {
  const fileTree = [""];

  return (
    <DefaultLayout>
      <Text>hogehoge</Text>
    </DefaultLayout>
  );
};

export default Home;
