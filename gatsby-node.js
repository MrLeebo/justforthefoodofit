/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const RecipeTemplate = path.resolve("./src/templates/recipe.tsx")
  const ArticleTemplate = path.resolve("./src/templates/article.tsx")

  const { data, errors } = await graphql(`
    {
      recipes: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/recipes/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }

      articles: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/articles/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  data.recipes.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: RecipeTemplate,
      context: {
        id: node.id,
      },
    })
  })

  data.articles.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: ArticleTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
