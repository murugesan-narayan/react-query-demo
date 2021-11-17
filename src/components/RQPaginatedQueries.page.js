import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const fetchColors = (pageNumber) =>
  axios.get(`http://localhost:5555/colors?_limit=2&_page=${pageNumber}`)

export const RQPaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  )
  const colors = data?.data
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
      <div>
        <button
          onClick={() => setPageNumber((p) => p - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber((p) => p + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
      {colors.map((c) => (
        <div key={c.id}>{`${c.id}  ${c.label}`}</div>
      ))}
    </div>
  )
}
