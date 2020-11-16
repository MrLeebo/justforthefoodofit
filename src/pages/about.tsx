import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Prose from "../components/prose"

type Props = {
  data: {
    about: {
      html: string
      frontmatter: {
        title: string
        description: string
        photo?: string
        caption?: string
      }
    }
  }
}

export default function About({ data }: Props) {
  const { frontmatter, html } = data.about

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.photo}
      />

      {frontmatter.photo && (
        <figure className="float-right max-w-md">
          <img src={frontmatter.photo} alt="" />
          {frontmatter.caption && (
            <figcaption>{frontmatter.caption}</figcaption>
          )}
        </figure>
      )}

      <Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </Layout>
  )
}

export const query = graphql`
  query aboutQuery {
    about: markdownRemark(
      fileAbsolutePath: { regex: "/src/content/about.md/" }
    ) {
      frontmatter {
        title
        description
        photo
        caption
      }
      html
    }
  }
`
