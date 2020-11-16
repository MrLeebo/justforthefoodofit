import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Prose from "../components/prose"
import TagList from "../components/tag-list"

type Props = {
  data: any
}

export default function Article({ data }: Props) {
  const {
    article: { frontmatter, html, timeToRead },
  } = data

  const publishDate = new Date(frontmatter.date).toLocaleDateString()

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.photo}
      />

      <Prose>
        <h1>{frontmatter.title}</h1>
        <span>
          Filed under <TagList tags={frontmatter.tags} /> by Bonnie Vail on{" "}
          {publishDate}
        </span>
        <br />
        <span>Time to Read: {timeToRead}min</span>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </Layout>
  )
}

export const query = graphql`
  query articleQuery($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date
        photo
        tags
      }
      html
      timeToRead
    }
  }
`
