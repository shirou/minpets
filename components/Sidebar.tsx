import { useCallback } from "react";
import { useRouter } from "next/router";

import { BiMenu } from "react-icons/bi";
import { TreeView, TreeViewDataItem, Divider } from "@patternfly/react-core";
import { Text } from "@patternfly/react-core";
import { Stack, StackItem } from "@patternfly/react-core";

import { useTree } from "@utils/fetcher";

type Props = {};

const myThemes = {
  customLight: {
    accentBg: "#2d3439",
    accentText: "#999",
    bg: "#2d3439",
    hoverBg: "#505a63",
    hoverText: "#fafafa",
    icon: "gold",
    indicator: "gold",
    selectedBg: "#3f464e",
    selectedText: "#fafafa",
    separator: "gold",
    text: "#fafafa",
    textSize: "xsmall",
  },
};

export const Sidebar = (props: Props) => {
  const router = useRouter();
  const { tree, isLoading, isError } = useTree();

  const onSelect = useCallback(
    (e: React.MouseEvent, item: TreeViewDataItem) => {
      if (item.children) {
        // not a leaf
        return;
      }
      if (item.id) {
        router.push(item.id);
      }
    },
    [router]
  );

  return (
    <Stack>
      <Text>Minpets</Text>
      <Divider />
      {tree ? (
        <TreeView
          data={tree}
          hasGuides={true}
          variant="compactNoBackground"
          onSelect={onSelect}
        />
      ) : null}
    </Stack>
  );
};
