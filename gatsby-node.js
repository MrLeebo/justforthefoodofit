const { Hash } = require("crypto")
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const slugify = require(`slugify`)
const Inflector = require("inflected")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const RecipeTemplate = path.resolve("./src/templates/recipe.tsx")
  const ArticleTemplate = path.resolve("./src/templates/article.tsx")
  const ProductTemplate = path.resolve("./src/templates/product.tsx")
  const TagTemplate = path.resolve("./src/templates/tag.tsx")

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

      products: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/products/" } }
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

      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          tag: fieldValue
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
      context: { id: node.id },
    })

    data.products.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: ProductTemplate,
        context: { id: node.id },
      })
    })

    data.tags.group.forEach(({ tag }) => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: TagTemplate,
        context: { tag },
      })
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MarkdownRemark: {
      contentType: {
        type: "String",
        resolve: source => {
          const match = source.fileAbsolutePath.match(/\/src\/content\/(\w+)\//)
          return match && Inflector.singularize(match[1])
        },
      },
    },
  })
}
