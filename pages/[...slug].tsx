import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import {
  CardHeader,
  ClipboardCopyButton,
  Flex,
  Badge,
  Text,
} from "@patternfly/react-core";
import { Card, CardTitle, CardBody, CardActions } from "@patternfly/react-core";

import { DefaultLayout } from "@layouts/default";
import { getSnippetsBySlug, getAllSnippets, Snippet } from "@utils/files";

type Props = {
  snippet: Snippet;
};

const createTags = (tags: string[]) => {
  return (
    <Flex spaceItems={{ default: "spaceItemsXs" }}>
      {tags.map((tag) => {
        return <Badge key={tag}>{tag}</Badge>;
      })}
    </Flex>
  );
};

function Snippet({ snippet }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, [snippet]);

  const clipboardCopyFunc = (event: React.MouseEvent, text: string) => {
    if (!event.currentTarget.parentElement) {
      return;
    }

    const clipboard = event.currentTarget.parentElement;
    const el = document.createElement("textarea");
    el.value = text.toString();
    clipboard.appendChild(el);
    el.select();
    document.execCommand("copy");
    clipboard.removeChild(el);
  };

  const onClick = (event: React.MouseEvent, text: string) => {
    clipboardCopyFunc(event, text);
    setCopied(true);
  };

  const tags = createTags(snippet.tags);

  return (
    <DefaultLayout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article>
          <Head>
            <title>{snippet.title}</title>
          </Head>

          <Card>
            <CardHeader>
              <CardTitle>
                <Text>{snippet.title}</Text>

                {tags}
              </CardTitle>
              <CardActions>
                <ClipboardCopyButton
                  id="copy-button"
                  textId="code-content"
                  aria-label="Copy to clipboard"
                  onClick={(e) => onClick(e, snippet.content)}
                  exitDelay={600}
                  maxWidth="110px"
                  variant="plain"
                >
                  {copied
                    ? "Successfully copied to clipboard!"
                    : "Copy to clipboard"}
                </ClipboardCopyButton>
              </CardActions>
            </CardHeader>

            <CardBody>
              <pre>
                <code>{snippet.code}</code>
              </pre>
            </CardBody>
          </Card>
        </article>
      )}
    </DefaultLayout>
  );
}

export default Snippet;

type Params = {
  params: {
    slug: string[];
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const snippet = getSnippetsBySlug(params.slug);
  const content = snippet.content || "";

  return {
    props: {
      snippet: {
        ...snippet,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const { paths } = getAllSnippets();
  return {
    paths: paths.map((path) => ({
      params: {
        slug: path,
      },
    })),
    fallback: false,
  };
};
