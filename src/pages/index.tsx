import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <article className="prose lg:prose-xl">
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/how-to-boil-an-egg">How to boil an egg</Link> <br />
        <Link to="/boiled-egg/">Boiled Egg recipe</Link>
      </article>
    </Layout>
  )
}
