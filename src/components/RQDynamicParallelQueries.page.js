import axios from 'axios'
import React from 'react'
import { useQueries } from 'react-query'

const fetchSuperHero = (id) =>
  axios.get(`http://localhost:5555/superheroes/${id}`)

export const RQDynamicParallelQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    })
  )
  const heroes = queryResults?.map((r) => r.data?.data).filter((d) => d)
  //console.log(heroes)
  return (
    <div>
      <h2>RQ Dynamic Parallel Queries Page</h2>
      <h3>Heroes</h3>
      {heroes && heroes.map((hero) => <div key={hero.id}>{hero.name}</div>)}
    </div>
  )
}
