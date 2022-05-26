import { useRouter } from 'next/router';
import Head from 'next/head'

import { DefaultLayout } from '@layouts/default'
import { getSnippetsBySlug, getAllSnippets } from '@utils/files'
import { Search } from '@components/SearchTest';


type Props = {
    post: {
      date: string;
      title: string;
      content: string;
    }
  }

const Snippet = ({ post }: Props) => {
  const router = useRouter()

    return (<DefaultLayout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
            </Head>
            <Search />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </DefaultLayout>)
}

export default Snippet

type Params = {
    params: {
      slug: string[]
    }
  }

export const getStaticProps = async ({ params }: Params) => {
    // 第二引数に渡した配列の要素をkeyとしたオブジェクトが返される(上記で解説)
    // date, titleにはfront-matterの内容が、contentにはmarkdownのコードの中身がvalueとなる
    const snippet = getSnippetsBySlug(params.slug, [
      'date',
      'title',
      'content',
    ])
    const content = snippet.content as string || '';
  
    return {
      props: {
        post: {
          ...snippet,  // front-matterのmeta情報(date, title)
          content  // markdownのcontents
        }
      }
    }
  }

export const getStaticPaths = async () => {
    const snippets = getAllSnippets()
    return {
      paths: snippets.map((snippet) => {
        return {
          params: {
            slug: snippet
          }
        }
      }),
      fallback: false
    }
  }