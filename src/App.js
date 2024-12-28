import Footer from './Component/Footer'
import Header from './Component/AdminHeader'
import useRouterElement from './useRouterElement/useRouterElement'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './until'
import { AuthContext } from './context/app.context'
function App() {
  let element = useRouterElement()
  const { reset } = useContext(AuthContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
  }, [reset])
  return <div className=''>{element}</div>
}

export default App
