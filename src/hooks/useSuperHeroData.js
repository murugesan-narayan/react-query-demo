import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

//queryKey will be passed by useQuery hook. it will have the whole key array. eg. ['super-hero', heroId]
const fetchSuperHero = ({ queryKey }) =>
  axios.get(`http://localhost:5555/superheroes/${queryKey[1]}`)

const cacheConfig = {
  cacheTime: 300000, // 5 mins  - The duration until inactive queries will be removed from the cache.
  //staleTime: 60000, // 30 secs - The duration until a query transitions from fresh to stale
  refetchOnMount: true, //every time will fecth on Mount
  refetchOnWindowFocus: true, //when the window is focused, it will fetch.
  //refetchInterval: 5000, // interval for every refetch of data, when window in focus.
  //refetchIntervalInBackground: true, // interval for every refetch of data, even without w.focus
}

export const useSuperHeroData = (heroId, options = {}) => {
  const queryClient = useQueryClient()

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    ...cacheConfig,
    ...options,
    //sets intial data incase if it is availble in the UI until it fetch from server.
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((h) => h.id === parseInt(heroId))
      console.log('inital data: ', hero)
      return hero ? { data: hero } : undefined
    },
  })
}
