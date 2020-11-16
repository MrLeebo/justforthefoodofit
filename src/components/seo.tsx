/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Meta = Array<{
  name?: string
  property?: string
  content: string
}>

type Props = {
  title: string
  description: string
  image?: string
  lang?: "en"
  meta?: Meta
}

export default function SEO({
  description,
  image,
  lang = "en",
  meta = [],
  title,
}: Props): JSX.Element {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const defaultMeta: Meta = [
    {
      name: "twitter:title",
      property: `og:title`,
      content: title,
    },
    {
      name: "description",
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={defaultMeta.concat(
        image
          ? [
              {
                name: "image",
                property: "og:image",
                content: image,
              },
              {
                name: "twitter:image",
                content: image,
              },
              {
                name: "twitter:card",
                content: "summary_large_image",
              },
            ]
          : [],
        meta
      )}
    />
  )
}
