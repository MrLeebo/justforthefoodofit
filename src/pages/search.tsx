import React from "react"
import { Index } from "elasticlunr"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/post-list"
import Prose from "../components/prose"

export default function Search({ data, location }) {
  const query = new URLSearchParams(location.search).get("q")
  const index = React.useMemo(() => Index.load(data.search.index), [
    data.search.index,
  ])
  const results = index
    .search(query, { expand: true })
    .map(({ ref }: any) => ({ node: index.documentStore.getDoc(ref) }))

  console.log({ query, results })
  return (
    <Layout>
      <Prose>
        <h1>Query results for "{query}"</h1>
        <hr />
      </Prose>

      <div className="mt-3">
        {results.length > 0 ? (
          <PostList posts={{ edges: results }} showType />
        ) : (
          <p className="text-xl text-gray-700">No results found</p>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query searchQuery {
    search: siteSearchIndex {
      index
    }
  }
`
