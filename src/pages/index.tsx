import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Prose from "../components/prose"
import PostList from "../components/post-list"

export default function IndexPage({ data }: { data: any }) {
  const {
    index: { frontmatter, html },
    recent,
  } = data

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.photo}
      />

      <div
        className="bg-cover"
        style={{ backgroundImage: frontmatter.photo }}
      />

      <Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>

      <h2>Recent posts</h2>
      <PostList posts={recent} showType />
    </Layout>
  )
}

export const query = graphql`
  query indexQuery {
    index: markdownRemark(
      fileAbsolutePath: { regex: "/src/content/index.md/" }
    ) {
      frontmatter {
        title
        description
        photo
      }
      html
    }

    recent: allMarkdownRemark(
      limit: 9
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/src/content/(recipes|articles)/" }
      }
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`
