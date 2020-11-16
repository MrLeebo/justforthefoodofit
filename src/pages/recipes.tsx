import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

type Props = {
  data: any
}

export default function Recipes({ data }: Props) {
  return (
    <Layout>
      <SEO
        title="Recent recipes"
        description={data.site.siteMetadata.description}
      />
      <h2>Recent recipes</h2>
      <PostList posts={data.recipes} />
    </Layout>
  )
}

export const query = graphql`
  query recipesQuery {
    site {
      siteMetadata {
        description
      }
    }

    recipes: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/src/content/recipes/" } }
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`
