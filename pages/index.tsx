import type { NextPage } from "next";
import { Text, Flex, FlexItem } from "@patternfly/react-core";

import { DefaultLayout } from "@layouts/default";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Flex>
        <Text>Minpets</Text>
      </Flex>
    </DefaultLayout>
  );
};

export default Home;
