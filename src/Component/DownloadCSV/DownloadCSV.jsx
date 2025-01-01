import { Export } from 'iconsax-react'
import { CSVLink } from 'react-csv'
import { useEffect, useState } from 'react'
import { message } from 'antd'
const DownloadCSV = ({ data, columns, filename }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  const [error, setError] = useState(false)
  const [headers, setHeaders] = useState([])
  const [body, setBody] = useState([])
  useEffect(() => {
    try {
      if (!data || !columns || !filename) {
        setError(true)
        setStatus(400)
        setMessageResult('Data or columns or filename is required')
        throw new Error('Data or columns or filename is required')
      }

      if (typeof filename !== 'string') {
        setError(true)
        setStatus(400)
        setMessageResult('Filename must be a string')
        throw new Error('Filename must be a string')
      }

      if (!Array.isArray(columns)) {
        setError(true)
        setStatus(400)
        setMessageResult('columns is not an array')
        throw new Error('columns is not an array')
      }

      const processedHeaders = columns
        .filter((c) => c.key !== 'action')
        .map((column) => {
          return { label: column.title || column.label, key: column.key }
        })

      setBody(data)
      setHeaders(processedHeaders)
      setError(false)
    } catch (err) {}
  }, [data, columns, filename])

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <button className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'>
      {contextHolder}
      {error ? (
        'Export CSV'
      ) : (
        <CSVLink data={body} headers={headers} filename={`${filename}.csv`} className='text-white'>
          Export CSV
        </CSVLink>
      )}
      <Export size='20' />
    </button>
  )
}

export default DownloadCSV
