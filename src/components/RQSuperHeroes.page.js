import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

const onSuccess = (data) =>
  console.log('Perform side effect after data fetching', data)

const onError = (error) =>
  console.log('Perform side effect after error in data fetching', error)

export function RQSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData({
    onSuccess,
    onError,
  })
  console.log({ isLoading, isFetching })
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {/* {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))} */}

      {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </>
  )
}
