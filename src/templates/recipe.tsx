import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Recipe({ data }) {
  const {
    recipe: { frontmatter, html },
  } = data

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article className="prose lg:prose-xl">
        <h1>{frontmatter.title}</h1>
        <h2>Recipe</h2>
        <span>Published: {frontmatter.date}</span>

        <h4>Ingredients</h4>
        <div className="grid grid-cols-2">
          {frontmatter.ingredients.map((ingredient, i) => (
            <div key={i}>{ingredient}</div>
          ))}
        </div>

        <h4>Utensils</h4>
        <div className="grid grid-cols-2">
          {frontmatter.utensils.map((utensil, i) => (
            <div key={i}>{utensil}</div>
          ))}
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    recipe: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date
        ingredients
        utensils
      }
      html
    }
  }
`
