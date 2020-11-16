import React from "react"
import Header from "./header"
import TagCloud from "./tag-cloud"
import "./layout.css"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="mb-6 space-y-2">
        <Header />
        <TagCloud />
      </div>

      <div className="container mx-auto pt-0 px-4 pb-6">
        <main>{children}</main>
      </div>
    </>
  )
}
