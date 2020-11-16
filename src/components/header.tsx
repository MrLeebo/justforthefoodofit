import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Search from "./search"

type NavBarItem = {
  label: string
  path: string
}

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }

      search: siteSearchIndex {
        index
      }

      layout: markdownRemark(
        fileAbsolutePath: { regex: "/src/content/layout.md/" }
      ) {
        frontmatter {
          logo
          summary
          navbar {
            label
            path
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

  const {
    site: { siteMetadata },
    layout: { frontmatter },
  } = data

  return (
    <header className="border-0 border-t-4 border-orange-400">
      <div className="mx-auto container">
        <div className="flex justify-between border-0 border-b-2 border-orange-200 p-2">
          <h1 className="flex m-0 items-center">
            <Link to="/" className="inline-block text-orange-600 no-underline">
              <img
                src={frontmatter.logo}
                alt={siteMetadata.title}
                className="h-16"
              />
            </Link>{" "}
            <span className="text-gray-600">{frontmatter.summary}</span>
          </h1>
          <div className="flex items-center space-x-2">
            {frontmatter.navbar.map((item: NavBarItem) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
                activeClassName="active"
              >
                {item.label}
              </Link>
            ))}
            <Search searchIndex={data.search.index} />
          </div>
          <div className="flex items-center">
            <Link
              to="/admin"
              className="inline-block text-gray-600 p-4 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
