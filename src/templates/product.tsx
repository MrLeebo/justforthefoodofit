import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Prose from "../components/prose"
import TagList from "../components/tag-list"
import SEO from "../components/seo"

type Props = {
  data: any
}

export default function Product({ data }: Props) {
  const {
    product: { frontmatter, html },
  } = data

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.photo}
      />

      <figure className="float-right max-w-md my-4">
        <img src={frontmatter.photo} alt="" />
        <figcaption>{frontmatter.caption}</figcaption>
      </figure>

      <Prose>
        <h1>{frontmatter.title}</h1>
        <div>
          Filed under <TagList tags={frontmatter.tags} /> by Bonnie Vail
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </Layout>
  )
}

export const query = graphql`
  query productQuery($id: String!) {
    product: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        photo
        caption
        tags
      }
      html
    }
  }
`
