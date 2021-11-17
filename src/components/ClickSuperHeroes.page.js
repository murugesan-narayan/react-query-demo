import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const fetchSuperHeroes = () => axios.get('http://localhost:5555/superheroes')

const cacheConfig = {
  enabled: false,
}

export function ClickSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    cacheConfig
  )
  console.log({ isLoading, isFetching })
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>Click Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  )
}
