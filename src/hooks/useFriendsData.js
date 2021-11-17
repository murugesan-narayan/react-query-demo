import { useQuery } from 'react-query'
import axios from 'axios'

const fetchFriends = () => axios.get('http://localhost:5555/friends')

const cacheConfig = {
  //  cacheTime: 300000, // 5 mins  - The duration until inactive queries will be removed from the cache.
  //staleTime: 60000, // 30 secs - The duration until a query transitions from fresh to stale
  //refetchOnMount: true, //every time will fecth on Mount
  //refetchOnWindowFocus: true, //when the window is focused, it will fetch.
  //refetchInterval: 5000, // interval for every refetch of data, when window in focus.
  //refetchIntervalInBackground: true, // interval for every refetch of data, even without w.focus
  select: (data) => {
    //data transformation
    //this method' return value will be returned as data variable value in useQuery call.
    const friends = data?.data
    return friends
  },
}

export const useFriendsData = (options = {}) => {
  return useQuery('friends', fetchFriends, {
    ...cacheConfig,
    ...options,
  })
}
