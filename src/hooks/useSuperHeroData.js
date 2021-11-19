import { useMutation, useQuery, useQueryClient } from 'react-query'
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

const addSuperHero = (hero) => {
  return axios.post('http://localhost:5555/superheroes', hero)
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // this will be handy if we need to fetch data for other queries
    //    onSuccess: () => queryClient.invalidateQueries('super-heroes'),

    // we can also update query data without fetching
    // if mutation data/response is enough.
    // onSuccess: (data) =>
    //   queryClient.setQueryData('super-heroes', (oldData) => {
    //     //console.log({ data, oldData })
    //     //console.log([...oldData.data, data.data])
    //     //return oldData
    //     return { ...oldData, data: [...oldData.data, data.data] }
    //   }),

    /**Optimistic Update Start */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        }
      })
      return { previousHeroData }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    },
    /**Optimistic Update End */
  })
}
