import React from "react"
import Post from "./post"

type Props = {
  posts: {
    edges: Array<any>
  }
  showType?: boolean
}

export default function PostList({ posts, showType }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.edges.map(({ node }) => (
        <Post key={node.id} node={node} showType={showType} />
      ))}
    </div>
  )
}
