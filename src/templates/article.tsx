import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Article({ data }) {
  const {
    article: { frontmatter, html, timeToRead },
  } = data

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article className="prose lg:prose-xl">
        <h1>{frontmatter.title}</h1>
        <span>Published: {frontmatter.date}</span>
        <span>Time to Read: {timeToRead}</span>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date
      }
      html
      timeToRead
    }
  }
`
