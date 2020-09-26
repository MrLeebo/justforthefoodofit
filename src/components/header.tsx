import { Link } from "gatsby"
import React from "react"

export default function Header({ siteTitle }) {
  return (
    <header className="bg-orange-400 mb-6">
      <div className="mx-auto container py-6 px-4">
        <h1 className="m-0">
          <Link to="/" className="text-white no-underline">
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  )
}
