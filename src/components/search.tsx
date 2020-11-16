import React from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import Icon from "./icon-search"

type SearchState = {
  query: string
  results: Array<{
    id: string
    title: string
    tags: Array<string>
    path: string
  }>
}

type Page = {
  id: string
  title: string
  tags: Array<string>
  path: string
}

export default function Search({ searchIndex }: any) {
  const index = React.useMemo(() => Index.load(searchIndex), [searchIndex])
  const [state, dispatch] = React.useReducer(
    (previous: SearchState, query: string) => ({
      query,
      results: index
        .search(query, { expand: true })
        .map(({ ref }: any) => index.documentStore.getDoc(ref)),
    }),
    { query: "", results: [] }
  )

  return (
    <form className="relative" autoComplete="off" action="/search">
      <label htmlFor="search" className="hidden">
        Search
      </label>
      <div className="absolute top-0 left-0 mt-2 ml-2 w-6 lh-solid pointer-events-none">
        <Icon />
      </div>
      <input
        id="search"
        type="search"
        name="q"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
        value={state.query}
        onChange={e => dispatch(e.target.value)}
      />
      <div
        className={`transition duration-500 ease-in-out ${
          state.query ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bg-white shadow rounded mt-2 w-64 z-10">
          <ul className="py-1">
            {!state.query ? null : state.results.length > 0 ? (
              state.results.map((page: Page) => (
                <li
                  key={page.id}
                  className="px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                >
                  <Link to={page.path} className="block">
                    {page.title}
                    {page.tags ? `: ${page.tags.join(`, `)}` : null}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm leading-5 text-gray-700">
                No results found for query "{state.query}"
              </li>
            )}
          </ul>
        </div>
      </div>
    </form>
  )
}
