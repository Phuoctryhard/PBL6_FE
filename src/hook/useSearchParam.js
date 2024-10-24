import { useSearchParams } from 'react-router-dom'
export default function useQueryParams() {
  const [SearchParams] = useSearchParams()
  console.log(SearchParams)
  return Object.fromEntries([...SearchParams])
}
// for (const [key, value] of SearchParams) {
//   console.log(key, value)
//   object[key] = value
// }
