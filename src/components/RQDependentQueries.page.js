import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchUser = (id) => axios.get(`http://localhost:5555/users/${id}`)
const fetchChannel = (id) => axios.get(`http://localhost:5555/channels/${id}`)

export const RQDependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUser(email))
  const channelId = user?.data.channelId

  const { data: channel } = useQuery(
    ['channel', channelId],
    () => fetchChannel(channelId),
    { enabled: !!channelId }
  )
  const courses = channel?.data.courses
  //console.log(user, channel)
  //console.log('calling.....')
  return (
    <div>
      <h2>RQ Dependent Queries Page</h2>
      {channelId && <div>Channel - {channelId}</div>}
      {courses && <div> Courses - {courses.join(', ')}</div>}
    </div>
  )
}
