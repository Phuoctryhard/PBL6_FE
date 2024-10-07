export const getAccessToken = () => {
  //const token = localStorage.getItem('token')
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbHVjaWZlcm5zei5jb21cL1BCTDZfUGhhcm1hY2l0eVwvUEJMNi1CRVwvcHVibGljXC9hcGlcL3VzZXJcL2xvZ2luIiwiaWF0IjoxNzI4MzA4NTU5LCJleHAiOjE3MjgzMTIxNTksIm5iZiI6MTcyODMwODU1OSwianRpIjoiZlJxWmhXd1JmekEzbGlKbyIsInN1YiI6MTAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.TmOPL9TqPaYxet68scMiTDy47uybDN1lug1TC-Lmm7o'

  return token ? `Bearer ${token}` : ''
}
