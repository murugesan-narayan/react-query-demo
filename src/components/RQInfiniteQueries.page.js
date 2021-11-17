import axios from 'axios'
import React from 'react'
import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'

const fetchColors = ({ pageParam }) =>
  axios.get(`http://localhost:5555/colors?_limit=2&_page=${pageParam}`)

export const RQInfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) =>
      pages.length < 4 ? pages.length + 1 : undefined,
  })
  const colorPages = data?.pages
  //console.log(colors)
  //console.log('calling.....')
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div>
      <h2>RQ Dependent Queries Page</h2>
      <h3>Colors</h3>
      {colorPages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.data.map((c) => (
              <div key={c.id}>
                {c.id}. {c.label}
              </div>
            ))}
          </Fragment>
        )
      })}

      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}
