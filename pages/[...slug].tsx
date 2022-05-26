import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import { DefaultLayout } from "@layouts/default";
import { getSnippetsBySlug, getAllSnippets } from "@utils/files";
import { Search } from "@components/Search";

type Props = {
  post: {
    date: string;
    title: string;
    content: string;
  };
};

function Snippet({ post }: Props) {
  const router = useRouter();
  const fileTree = ["hoge"];

  useEffect(() => {
    hljs.initHighlighting();
});

  const snippet = post.content;

  return (
    <DefaultLayout fileTree={fileTree}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article>
          <Head>
            <title>{post.title}</title>
          </Head>
          <pre style={{ width: '80vw' }}>
          <code>
              {snippet}
          </code>
          </pre>
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
  // 第二引数に渡した配列の要素をkeyとしたオブジェクトが返される(上記で解説)
  // date, titleにはfront-matterの内容が、contentにはmarkdownのコードの中身がvalueとなる
  const snippet = getSnippetsBySlug(params.slug, ["date", "title", "content"]);
  const content = (snippet.content as string) || "";

  return {
    props: {
      post: {
        ...snippet, // front-matterのmeta情報(date, title)
        content, // markdownのcontents
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllSnippets();
  console.log(paths)
  return {
    paths: paths.map((path) => ({
      params: {
        slug: path,
      },
    })),
    fallback: false,
  };
};
