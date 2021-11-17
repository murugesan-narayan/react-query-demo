import React from 'react'
import { useFriendsData } from '../hooks/useFriendsData'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const RQParallelQueriesPage = () => {
  const { data: heroes } = useSuperHeroesData()
  console.log(heroes)
  const { data: friends } = useFriendsData()
  return (
    <div>
      <h2>RQ Parallel Queries Page</h2>
      <h3>Heroes</h3>
      <div>{heroes && heroes.map((hero) => <div key={hero}>{hero}</div>)}</div>
      <h3>Friends</h3>
      <div>
        {friends &&
          friends.map((friend) => <div key={friend.id}>{friend.name}</div>)}
      </div>
    </div>
  )
}
