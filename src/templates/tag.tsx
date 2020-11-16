import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Prose from "../components/prose"
import PostList from "../components/post-list"

type Props = {
  data: any
  pageContext: { tag: string }
}

export default function Tag({ data, pageContext }: Props) {
  return (
    <Layout>
      <SEO
        title={pageContext.tag}
        description={`Page results for ${pageContext.tag}`}
      />

      <Prose>
        <h1>{pageContext.tag}</h1>
        <hr />
      </Prose>

      <div className="mt-3">
        <PostList posts={data.results} showType />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query tagQuery($tag: String!) {
    results: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`
