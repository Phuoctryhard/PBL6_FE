import { BreadCrumbs, AdminTable } from '../'
import { message, Dropdown, Popconfirm, Modal, Select, Tooltip, Spin, ConfigProvider } from 'antd'
import { DeleteOutlined, DashOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { SearchNormal, Eye, Edit, AddCircle, ArrowDown2 } from 'iconsax-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/app.context'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'
import { Add } from 'iconsax-react'
import { CloseOutlined } from '@ant-design/icons'
import { AdminDiseaseApi, CategoriesAPI } from '../../Api/admin'
import './Illness.css'

const filterTheme = {
  token: {
    colorTextQuaternary: '#1D242E',
    colorTextPlaceholder: '#9da4b0',
    fontFamily: 'Poppins, sans-serif',
    controlOutline: 'none',
    colorBorder: '#e8ebed',
    borderRadius: '4px',
    colorPrimary: '#008f99'
  },
  components: {
    DatePicker: {
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E'
    },
    TreeSelect: {
      nodeHoverBg: 'rgb(0, 143, 153, 0.3)',
      nodeSelectedBg: 'rgb(0, 143, 153, 0.3)'
    }
  }
}

const Illness = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }

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

  const handleResponse = async (response, defaultErrorText = 'Error fetch') => {
    if (!response.ok) {
      const content_type = response.headers.get('content-type')
      if (content_type && content_type.includes('application/json')) {
        const res = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        } else {
          setMessageResult(res.messages.join('. '))
          setStatus(response.status)
        }
      } else {
        setStatus(response.status)
        setMessageResult(response.statusText ? response.statusText : defaultErrorText)
      }
      return false
    }
    return true
  }

  //#region Filter data
  const [searchValue, setSearchValue] = useState('')
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
  //#endregion

  //#region Table data
  const columns = [
    {
      title: '#',
      dataIndex: 'disease_id',
      key: 'disease_id',
      sorter: (a, b) => a.disease_id - b.disease_id,
      sortIcon: ({ sortOrder }) => null,
      width: '40%',
      ellipsis: true
    },
    {
      title: 'Name',
      dataIndex: 'disease_name',
      key: 'disease_name',
      sorter: (a, b) => a.disease_name.localeCompare(b.disease_name),
      sortIcon: ({ sortOrder }) => null,
      ellipsis: true,
      render: (text, record) => <span>{text}</span>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Dropdown
          trigger={['click']}
          placement='bottomRight'
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      viewDisease(record.disease_id)
                      setOpenModal(true)
                    }}
                  >
                    <Eye className='text-[green]' size={15} />
                    <span>View</span>
                  </button>
                )
              },
              {
                key: '2',
                label: (
                  <Popconfirm
                    align={{ offset: [20, 20] }}
                    placement='bottomRight'
                    title={`Delete record ${record.disease_id}`}
                    description='Are you sure to delete this record?'
                    onConfirm={() => {
                      handleDeleteDisease(record.disease_id, 1)
                    }}
                    okText='Delete'
                    cancelText='Cancel'
                  >
                    <button
                      type='button'
                      className='flex items-center gap-x-2 justify-start w-full'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DeleteOutlined className='text-[14px] text-[red]' />
                      <span>Delete or Restore</span>
                    </button>
                  </Popconfirm>
                )
              },
              {
                key: '4',
                label: (
                  <Link
                    className='flex items-center gap-x-2 justify-start w-full'
                    to={`/admin/disease/update/${record.disease_id}`}
                  >
                    <Edit className='text-[#bc9143]' size={15} />
                    <span>Edit</span>
                  </Link>
                )
              },
              {
                key: '5',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModalCategory(true)
                      setDiseaseSelected(record.disease_id)
                    }}
                  >
                    <AddCircle className='text-[blue]' size={15} />
                    <span>Add to category</span>
                  </button>
                )
              },
              {
                key: '6',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      try {
                        const fetchCategory = async (id) => {
                          const response = await AdminDiseaseApi.getCategoryByDiseaseID(id, token)
                          const isResponseOK = await handleResponse(response, 'Error fetch category disease')
                          if (!isResponseOK) {
                            return
                          }
                          const res = await response.json()
                          const category = res.data.map((d) => ({
                            key: d.category_id,
                            value: d.category_id,
                            label: d.category_name
                          }))
                          if (category) {
                            setSelectCategoryDeleteData(category)
                          }
                        }
                        fetchCategory(record.disease_id)
                        setOpenModalDeleteCategory(true)
                        setDiseaseSelected(record.disease_id)
                      } catch (e) {
                        setStatus(400)
                        setMessageResult(`Error delete disease from category: ${e.message}`)
                      }
                    }}
                  >
                    <CloseCircleOutlined className='text-[red] text-sm' />
                    <span>Delete from category</span>
                  </button>
                )
              }
            ]
          }}
          className='flex justify-center bg-[#fafafa] items-center px-2 rounded-md w-[50px] h-[40px] border-[1px] border-solid border-[#e8ebed]'
        >
          <button type='button' className='flex items-center'>
            <DashOutlined className='text-[15px]' />
          </button>
        </Dropdown>
      )
    }
  ]

  const [data, setData] = useState([])
  const [diseases, setDiseases] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })

  const handleTableChange = (pagination, filters, sorter) => {
    const params = {
      pagination,
      filters,
      sortOrder: sorter ? sorter.order : undefined,
      sortField: sorter ? sorter.field : undefined
    }
    setTableParams(params)
  }

  const searchDisease = () => {
    const search = searchValue.toLowerCase()
    const result = data.filter((item) => item.disease_name.toLowerCase().includes(search))
    const tableData = result
    setFilterData(tableData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.length
      }
    })
  }

  const fetchAllDisease = async () => {
    setLoading(true)
    try {
      const response = await AdminDiseaseApi.getAllDisease(token)
      if (!response.ok) {
        const content_type = response.headers.get('content-type')
        if (content_type && content_type.includes('application/json')) {
          const res = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setMessageResult(res.message)
            setStatus(response.status)
          }
        } else {
          setStatus(response.status)
          setMessageResult(response.statusText ? response.statusText : 'Error fetch all disease')
        }
        return
      } else {
        const res = await response.json()
        const resData = res.data.data
        const tableData = resData.map((item) => ({
          ...item,
          key: item.disease_id
        }))
        setData(tableData)
        setFilterData(tableData)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: resData.length
          }
        })
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const fetchAllCategoryDisease = async () => {
    try {
      const response = await CategoriesAPI.getAllCategories(token)
      const isResponseOK = await handleResponse(response, 'Error fetch all category disease')
      if (!isResponseOK) {
        return
      } else {
        const res = await response.json()
        const resData = res.data
        const category = resData.filter((d) => d.parent_type === 'disease')
        const selectData = category.map((d) => ({
          key: d.category_id,
          value: d.category_id,
          label: d.category_name
        }))
        setCategories(selectData)
      }
    } catch (error) {
      setStatus(400)
      setMessageResult(`Error fetch all category disease: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchAllDisease()
    fetchAllCategoryDisease()
    fetchSelectData()
  }, [])

  useEffect(() => {
    if (data) {
      searchDisease()
    }
  }, [
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])
  //#endregion

  //#region modal view
  //Modal setting
  const [openModal, setOpenModal] = useState(false)

  //Modal data

  const [diseaseName, setDiseaseName] = useState('')
  const [editorHTML, setEditorHTML] = useState('')
  const [generalOverview, setGeneralOverview] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [cause, setCause] = useState('')
  const [riskSubjects, setRiskSubjects] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [prevention, setPrevention] = useState('')
  const [treatmentMethod, setTreatmentMethod] = useState('')

  const handleCancelPreview = () => {
    setEditorHTML('')
    setGeneralOverview('')
    setSymptoms('')
    setPrevention('')
    setTreatmentMethod('')
    setDiagnosis('')
    setRiskSubjects('')
    setOpenModal(false)
  }

  useEffect(() => {
    const wrappedGeneralOverview = `<div class="flex flex-col"> ${generalOverview} </div>`
    const wrappedSymptoms = `<div class="section"> ${symptoms} </div>`
    const wrappedCause = `<div class="section"> ${cause} </div>`
    const wrappedRiskSubjects = `<div class="section"> ${riskSubjects} </div>`
    const wrappedDiagnosis = `<div class="section"> ${diagnosis} </div>`
    const wrappedPrevention = `<div class="section"> ${prevention} </div>`
    const wrappedTreatmentMethod = `<div class="section"> ${treatmentMethod} </div>`

    const combinedHtml = `
      ${wrappedGeneralOverview}
      ${wrappedSymptoms}
      ${wrappedCause}
      ${wrappedRiskSubjects}
      ${wrappedDiagnosis}
      ${wrappedPrevention}
      ${wrappedTreatmentMethod}
    `
    setEditorHTML(combinedHtml)
  }, [generalOverview, symptoms, cause, riskSubjects, diagnosis, prevention, treatmentMethod])

  const fetchDiseaseByID = async (id) => {
    try {
      const response = await AdminDiseaseApi.getDiseaseById(id)
      if (!response.ok) {
        const content_type = response.headers.get('content-type')
        if (content_type && content_type.includes('application/json')) {
          const res = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setMessageResult(res.messages)
            setStatus(400)
          }
        } else {
          setStatus(response.status)
          setMessageResult(response.statusText ? response.statusText : 'Error fetch disease by ID')
        }
        return
      } else {
        const res = await response.json()
        const resData = res.data
        return resData
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(`Error fetch disease by ID: ${e.message}`)
    }
  }

  const fetchCategoryDiseaseByID = async (id) => {
    try {
      const response = await AdminDiseaseApi.getCategoryDiseaseByID(id)
      const isResponseOK = await handleResponse(response, 'Error fetch disease by category')
      if (!isResponseOK) {
        return
      } else {
        const res = await response.json()
        const resData = res.data
        return resData
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(`Error fetch disease by category: ${e.message}`)
    }
  }

  useEffect(() => {
    if (selectedCategory) {
      const fetchCategoryDisease = async (id) => {
        const diseases = await fetchCategoryDiseaseByID(id)
        if (diseases) {
          const tableData = diseases.map((item) => ({
            ...item,
            key: item.disease_id
          }))
          setData(tableData)
          setFilterData(tableData)
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: diseases.length
            }
          })
        }
      }
      fetchCategoryDisease(selectedCategory)
    } else {
      fetchAllDisease()
    }
  }, [selectedCategory])

  useEffect(() => {
    if (data) {
      searchDisease()
    }
  }, [data])

  const viewDisease = (id) => {
    const fetchDisease = async (id) => {
      const disease = await fetchDiseaseByID(id)
      if (disease) {
        setDiseaseName(disease.disease_name)
        setGeneralOverview(disease.general_overview)
        setSymptoms(disease.symptoms)
        setCause(disease.cause)
        setRiskSubjects(disease.risk_subjects)
        setDiagnosis(disease.diagnosis)
        setPrevention(disease.prevention)
        setTreatmentMethod(disease.treatment_method)
      }
    }
    fetchDisease(id)
  }

  const handleDeleteDisease = async (id, data) => {
    try {
      const response = await AdminDiseaseApi.deleteDisease(id, token, data)
      if (!response.ok) {
        const content_type = response.headers.get('content-type')
        if (content_type && content_type.includes('application/json')) {
          const res = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setMessageResult(res.messages)
            setStatus(response.status)
          }
        } else if (response.status === 404) {
          setStatus(response.status)
          setMessageResult('Request not found')
        } else {
          setStatus(response.status)
          setMessageResult(response.statusText ? response.statusText : 'Error delete disease')
        }
        return
      } else {
        const res = await response.json()
        setMessageResult(res.messages)
        setStatus(response.status)
        fetchAllDisease()
      }
    } catch (error) {
      setStatus(400)
      setMessageResult(`Error delete disease: ${error.message}`)
    }
  }

  const handleDeleteDiseaseFromCategory = async (e) => {
    e.preventDefault()
    try {
      if (!categorySelected) {
        setErrorCategory('Please select category')
        return
      }
      const formData = new FormData()
      console.log(categorySelected)
      formData.append('category_disease_id', categorySelected)
      const response = await AdminDiseaseApi.deleteDiseaseFromCategory(formData, token)
      const isResponseOK = await handleResponse(response, 'Error delete disease from category')
      if (!isResponseOK) {
        return
      } else {
        const res = await response.json()
        setStatus(response.status)
        setMessageResult(res.messages.join('. '))
        fetchAllDisease()
      }
    } catch (error) {
      setStatus(400)
      setMessageResult(`Error delete disease from category: ${error.message}`)
    }
  }

  //#endregion

  //#region Modal Add to category
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [categorySelected, setCategorySelected] = useState()
  const [errorCategory, setErrorCategory] = useState('')
  const [diseaseSelected, setDiseaseSelected] = useState()
  const [selectData, setSelectData] = useState([])

  const fetchSelectData = async () => {
    try {
      const response = await CategoriesAPI.getAllCategories(token)
      if (!response.ok) {
        const content_type = response.headers.get('content-type')
        if (content_type && content_type.includes('application/json')) {
          const res = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setMessageResult(res.messages)
            setStatus(response.status)
          }
        } else {
          setStatus(response.status)
          setMessageResult(response.statusText ? response.statusText : 'Error fetch tree data category')
        }
        return
      } else {
        const res = await response.json()
        const resData = res.data
        const diseaseCategory = resData.filter((d) => d.parent_type === 'disease')
        const selectData = diseaseCategory.map((d) => ({
          key: d.category_id,
          value: d.category_id,
          label: d.category_name
        }))
        setSelectData(selectData)
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(`Error fetch tree data: ${e.message}`)
    }
  }

  const handleCancel = () => {
    setOpenModalCategory(false)
    setCategorySelected(null)
    setDiseaseSelected(null)
    setErrorCategory('')
  }

  const handleValidate = () => {
    if (!categorySelected) {
      setErrorCategory('Please select category')
      return false
    }
    return true
  }

  const handleAddDiseaseToCategory = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    if (!handleValidate()) {
      setSubmitLoading(false)
      return
    }
    try {
      const formData = new FormData()
      formData.append('category_id', categorySelected)
      formData.append('disease_id', diseaseSelected)
      const response = await AdminDiseaseApi.addDiseaseToCategory(formData, token)
      if (!response.ok) {
        const content_type = response.headers.get('content-type')
        if (content_type && content_type.includes('application/json')) {
          const res = await response.json()
          if (response.status === 401) {
            handleUnauthorized()
          } else {
            setMessageResult(res.messages)
            setStatus(response.status)
          }
        } else {
          setStatus(response.status)
          setMessageResult(response.statusText ? response.statusText : 'Error add disease to category')
        }
        return
      } else {
        setStatus(200)
        setMessageResult('Add disease to category successfully')
        handleCancel()
      }
    } catch (e) {
      setStatus(400)
      setMessageResult(`Error add disease to category: ${e.message}`)
    } finally {
      setSubmitLoading(false)
    }
  }
  //#endregion

  //#region Modal delete disease from category
  const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false)
  const [selectCategoryDeleteData, setSelectCategoryDeleteData] = useState([])

  const handleCancelDeleteCategory = () => {
    setOpenModalDeleteCategory(false)
    setCategorySelected(null)
    setDiseaseSelected(null)
  }
  //#endregion

  //#region status and message result of fetch api call
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      openMessage('success', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    } else if (status >= 400) {
      openMessage('error', messageResult, 3)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])
  //#endregion

  return (
    <section className='w-full'>
      {contextHolder}
      <header className='animate-slideDown flex justify-between'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs
            items={[
              { title: `Diseases` },
              {
                title: `List of diseases (${filterData?.length})`
              }
            ]}
          />
          <p>Summary of common diseases</p>
        </div>
        <Link
          to='/admin/disease/add'
          className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
        >
          Add new
          <Add size='20' />
        </Link>
      </header>
      <Modal
        title='Add to category'
        centered
        open={openModalCategory}
        width={400}
        footer={false}
        destroyOnClose
        onCancel={handleCancel}
      >
        <div className='mt-7 relative'>
          <form action='' method='POST' onSubmit={handleAddDiseaseToCategory} autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_id' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Category
                </label>
                <Tooltip
                  title={errorCategory}
                  open={errorCategory !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      id='category_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      onClick={() => {
                        setErrorCategory('')
                      }}
                      placeholder='Select a category'
                      placement='bottomLeft'
                      options={selectData}
                      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      className='w-[100%] h-10'
                      onChange={(value) => {
                        setCategorySelected(value === undefined ? undefined : value)
                      }}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__groupButton'>
                <button type='submit' className='AddCategoryForm__submitBtn'>
                  Save
                </button>
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
      <Modal
        title='Delete disease from category'
        centered
        open={openModalDeleteCategory}
        width={400}
        footer={false}
        destroyOnClose
        onCancel={handleCancelDeleteCategory}
      >
        <div className='mt-7 relative'>
          <form action='' method='POST' onSubmit={handleDeleteDiseaseFromCategory} autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='category_id' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Category
                </label>
                <Tooltip
                  title={errorCategory}
                  open={errorCategory !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      id='category_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      onClick={() => {
                        setErrorCategory('')
                      }}
                      placeholder='Select a category'
                      placement='bottomLeft'
                      options={selectCategoryDeleteData}
                      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      className='w-[100%] h-10'
                      onChange={(value) => {
                        setCategorySelected(value === undefined ? undefined : value)
                      }}
                    />
                  </ConfigProvider>
                </Tooltip>
              </div>
            </div>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__groupButton'>
                <button type='submit' className='AddCategoryForm__submitBtn'>
                  Save
                </button>
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancelDeleteCategory}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <Modal title='' centered open={openModal} width={'100vw'} footer={false} closeIcon={null} destroyOnClose>
        <div className='w-full flex flex-col gap-3'>
          <h1 className='text-black text-2xl font-semibold mx-auto'>Preview Disease</h1>
          <div
            className='ql-editor flex flex-col gap-4 w-full'
            dangerouslySetInnerHTML={{
              __html: editorHTML
            }}
          ></div>
          <button
            type='button'
            onClick={handleCancelPreview}
            className='p-2 w-16 h-16 rounded-[50%] bg-[#66b5a2] sticky bottom-8 animate-bounce ml-auto'
          >
            <CloseOutlined className='text-white text-2xl' />
          </button>
        </div>
      </Modal>
      <div className='p-5 my-6 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='flex items-center w-[350px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for disease'
              className='border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px] focus:border-[#1D242E]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button
              onClick={() => {
                fetchAllDisease()
              }}
            >
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
          <div>
            <ConfigProvider theme={filterTheme}>
              <Select
                suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                allowClear
                showSearch
                placeholder='Select category'
                placement='bottomLeft'
                options={categories}
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                className='h-12 w-[250px]'
                onChange={(value) => {
                  console.log(value)
                  setSelectedCategory(value === undefined ? undefined : value)
                }}
              />
            </ConfigProvider>
          </div>
        </div>
        <AdminTable
          columns={columns}
          rowKey={'disease_id'}
          data={filterData}
          loading={loading}
          handleTableChange={handleTableChange}
          tableParams={tableParams}
          tableStyles={{
            width: '1200px',
            minHeight: '320px',
            backgroundColor: '#ffffff'
          }}
          scroll={{
            y: '280px'
          }}
          paginationTable={{
            position: ['none'],
            ...tableParams.pagination
          }}
          pageSizeOptionsParent={['8', '10', '15', '20']}
        />
      </div>
    </section>
  )
}

export default Illness
