import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5555',
})

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = 'Bearer token'
  const onSuccess = (response) => response
  const onError = (error) => {
    //catch error and log more details.
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}
