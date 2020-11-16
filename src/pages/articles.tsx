import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

type Props = {
  data: any
}

export default function Articles({ data }: Props) {
  return (
    <Layout>
      <SEO
        title="Recent articles"
        description={data.site.siteMetadata.description}
      />
      <h2>Recent articles</h2>
      <PostList posts={data.articles} />
    </Layout>
  )
}

export const query = graphql`
  query articlesQuery {
    site {
      siteMetadata {
        description
      }
    }

    articles: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/content/articles/" } }
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`
