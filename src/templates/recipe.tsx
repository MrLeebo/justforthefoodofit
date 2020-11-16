import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"
import Prose from "../components/prose"

type Props = {
  data: any
}

export default function Recipe({ data }: Props): JSX.Element {
  const {
    recipe: { frontmatter, html },
  } = data

  const publishDate = new Date(frontmatter.date).toLocaleDateString()

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.photo}
      />

      <figure className="prose float-right w-full max-w-md my-4">
        <img src={frontmatter.photo} alt="" className="object-cover" />
        <figcaption>{frontmatter.caption}</figcaption>
      </figure>

      <Prose>
        <h1>{frontmatter.title}</h1>
        <div>
          Filed under <TagList tags={frontmatter.tags} /> by Bonnie Vail on{" "}
          {publishDate}
        </div>

        <h4>Ingredients</h4>
        <div className="grid grid-cols-2">
          {frontmatter.ingredients.map((ingredient: string, i: number) => (
            <div key={i}>{ingredient}</div>
          ))}
        </div>

        <h4>Utensils</h4>
        <div className="grid grid-cols-2">
          {frontmatter.utensils.map((utensil: string, i: number) => (
            <div key={i}>{utensil}</div>
          ))}
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </Layout>
  )
}

export const query = graphql`
  query recipeQuery($id: String!) {
    recipe: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date
        tags
        ingredients
        utensils
        photo
        caption
      }
      html
    }
  }
`
