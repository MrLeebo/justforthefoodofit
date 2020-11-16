import React from "react"
import { graphql, Link } from "gatsby"
import TagList from "../components/tag-list"

type Props = {
  node: {
    contentType: "article" | "recipe" | "product"
    timeToRead: Number
    frontmatter: {
      title: string
      description: string
      path: string
      photo: string
      date: string
      tags: Array<string>
    }
  }
  showType?: boolean
}

export default function Post({ node, showType }: Props) {
  const color = contentColors[node.contentType]

  return (
    <div className="block relative">
      <Link
        to={node.frontmatter.path}
        className={`block bg-cover h-64 shadow-inner ${
          node.frontmatter.photo
            ? ""
            : "bg-gradient-to-r from-blue-400 via-orange-500 to-yellow-500"
        }`}
        style={{
          backgroundImage: node.frontmatter.photo
            ? `url(${node.frontmatter.photo})`
            : undefined,
        }}
      />

      {showType && (
        <div
          className={`absolute top-0 left-0 m-3 inline-block rounded-full opacity-75 px-2 capitalize text-${color}-800 bg-${color}-200`}
        >
          {node.contentType}
        </div>
      )}

      <h2 className="text-xl font-bold my-3">
        <Link to={node.frontmatter.path} className="hover:underline">
          {node.frontmatter.title}
        </Link>
      </h2>
      <p className="text-gray-700 my-3">{node.frontmatter.description}</p>

      <div>
        <TagList tags={node.frontmatter.tags} /> &middot;{" "}
        {new Date(node.frontmatter.date).toLocaleDateString()} &middot;{" "}
        {node.timeToRead} min read
      </div>
    </div>
  )
}

const contentColors = {
  article: "blue",
  recipe: "purple",
  product: "green",
}

export const query = graphql`
  fragment Post on MarkdownRemark {
    id
    contentType
    timeToRead
    frontmatter {
      title
      date
      tags
      description
      photo
      path
    }
  }
`
