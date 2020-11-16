import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Prose({ children }: Props): JSX.Element {
  return (
    <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      {children}
    </article>
  )
}
