export const getAccessToken = () => {
  const token = localStorage.getItem('accesstoken')
  return token ? `Bearer ${token}` : ''
}
export const saveAccessToken = (token) => {
  // const tokenBear = token ? `Bearer ${token}` : ''
  localStorage.setItem('accesstoken', token)
}
export const tokenBear = (token) => {
  return 'Bearer ' + token
}
