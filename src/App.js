import Footer from './Component/Footer'
import Header from './Component/AdminHeader'
import useRouterElement from './useRouterElement/useRouterElement'

function App() {
  let element = useRouterElement()
  return <div className=''>{element}</div>
}

export default App
