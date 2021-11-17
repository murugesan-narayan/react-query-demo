import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSuperHeroData } from '../hooks/useSuperHeroData'

export const RQSuperHeroPage = () => {
  const { heroId } = useParams()
  console.log('heroId', heroId)

  const { isLoading, data, isError, error, isFetching } = useSuperHeroData(
    heroId,
    {
      select: (data) => {
        //console.log(data)
        return data?.data
      },
    }
  )
  console.log({ isLoading, isFetching })
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div>
      <Link to='/clk-super-heroes/'>
        <button>Back</button>
      </Link>
      <h2>RQ Super Hero Detail</h2>
      {data && (
        <div>
          {data.id} - {data.name} - {data.alterEgo}
        </div>
      )}
    </div>
  )
}
