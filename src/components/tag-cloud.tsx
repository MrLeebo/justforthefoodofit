import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

type TagGroup = {
  tag: string
}

export default function TagCloud() {
  const { tags } = useStaticQuery(graphql`
    query tagCloudQuery {
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  const sortedTags = [...tags.group].sort((a, b) => b.totalCount - a.totalCount)

  return (
    <div className="mx-auto md:max-w-md lg:max-w-lg">
      <div className="flex flex-wrap justify-center space-x-2 rounded bg-blue-200 p-1">
        {sortedTags.map(({ tag }: TagGroup) => (
          <Link
            key={tag}
            to={`/tags/${slugify(tag)}`}
            className="tag-link"
            activeClassName="active"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}
