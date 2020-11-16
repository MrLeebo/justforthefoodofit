import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

type Props = {
  tags: string[]
}

export default function TagList({ tags }: Props) {
  if (!tags || tags.length === 0) return <>Untagged</>

  return (
    <>
      {tags
        .map((tag: string) => (
          <Link
            key={tag}
            className="hover:underline"
            to={`/tags/${slugify(tag)}`}
          >
            {tag}
          </Link>
        ))
        .reduce((a, b) => (
          <>
            {a}, {b}
          </>
        ))}
    </>
  )
}
