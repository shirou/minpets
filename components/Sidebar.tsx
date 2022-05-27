import { useTheme, css, Row, Spacer, Text, Container } from "@nextui-org/react";
import { BsBrightnessHigh, BsGithub } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import Tree from "@naisutech/react-tree";

type Props = {
  fileTree: string[];
};

export const Sidebar = (props: Props) => {
  const { theme } = useTheme();


  const data = [
    {
      "id": "go",
      "parentId": null,
      "label": "Go",
    },
    {
      "id": "go-main",
      "parentId": "go",
      "label": "My child node"
    },
    {
      "id": "python",
      "parentId": null,
      "label": "My child node"
    }

  ];
  return (
    <nav
      className="sidebar"
      style={{ width: "150px", border: "1px", height: "100%", position: "absolute" }}
    >
      <Container
        direction="column"
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
          <Text
            css={{
              color: theme!.colors.primary.value,
              fontSize: "$md",
              padding: "$2 $4",
            }}
          >
            Minpets
          </Text>
          
          <Tree nodes={data}  />
      </Container>
    </nav>
  );
};
