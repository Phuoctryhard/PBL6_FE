import { AdminRolesAPI, AdminPermissionsAPI } from '../../Api/admin'
import { SearchNormal, AddCircle, ArrowDown2 } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { Dropdown, Popconfirm, message, Modal, Tooltip, ConfigProvider, Select } from 'antd'
import { CloseCircleOutlined, DashOutlined } from '@ant-design/icons'
import AdminTable from '../AdminTable'
import BreadCrumbs from '../AdminBreadCrumbs'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
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
const AdminManageRole = () => {
  const { setIsLogin } = useAdminMainLayoutFunction()
  const token = localStorage.getItem('accesstoken')
  const [status, setStatus] = useState(null)
  const [messageResult, setMessageResult] = useState('')

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  //#region filter data
  const [searchValue, setSearchValue] = useState('')
  //#endregion

  //#region Table data

  const columns = [
    {
      title: '#',
      dataIndex: 'role_id',
      key: 'role_id',
      showSorterTooltip: {
        title: '',
        placement: 'topLeft',
        trigger: ['hover']
      },
      sorter: (a, b) => a.role_id - b.role_id,
      width: '10%'
    },
    {
      title: 'Name',
      dataIndex: 'role_name',
      key: 'role_name',
      showSorterTooltip: {
        title: 'Name',
        placement: 'topLeft',
        trigger: ['hover']
      },
      sorter: (a, b) => a.role_name - b.role_name,
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'role_description',
      key: 'role_description',
      sorter: (a, b) => a.role_description - b.role_description,
      showSorterTooltip: {
        title: 'Description',
        placement: 'topLeft',
        trigger: ['hover']
      },
      ellipsis: true,
      render: (text, record) => {
        return (
          <Tooltip title={record.role_description} placement='topLeft' color='#1D242E' trigger={['hover']}>
            <span>{record.role_description}</span>
          </Tooltip>
        )
      }
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
                key: '4',
                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModalAddPermission(true)
                      getRoleByID(record.role_id)
                    }}
                  >
                    <AddCircle size='15' color='blue' /> <span>Add permission</span>
                  </button>
                )
              },
              {
                key: '5',

                label: (
                  <button
                    type='button'
                    className='flex items-center gap-x-2 justify-start w-full'
                    onClick={() => {
                      setOpenModalRemovePermission(true)
                      getRoleByID(record.role_id)
                    }}
                  >
                    <CloseCircleOutlined size={17} className='text-red-600' /> <span>Remove permission</span>
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

  //Table data
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8
    }
  })

  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(true)
    const params = {
      pagination,
      filters,
      sortOrder: sorter ? sorter.order : undefined,
      sortField: sorter ? sorter.field : undefined
    }
    setTableParams(params)
    setLoading(false)
  }

  const fetchAllRoles = async () => {
    try {
      setLoading(true)
      const res = await AdminRolesAPI.getAllRoles(token)
      if (!res) throw new Error('Roles has no data or fetch all roles failed')
      const data = res.data
      const tableData = data
        .filter((item) => item.role_id !== 3)
        .map((item) => ({
          ...item,
          key: item.role_id
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      setData(tableData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: tableData.length
        }
      })
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    } finally {
      setLoading(false)
    }
  }

  const searchRoles = () => {
    try {
      const filteredData = data.filter((item) => {
        return (
          item.role_name.toLowerCase().includes(searchValue.toLowerCase()) || item.role_id.toString() === searchValue
        )
      })
      setFilterData(filteredData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: filteredData.length
        }
      })
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  useEffect(() => {
    fetchAllPermissions()
    fetchAllRoles()
  }, [])

  useEffect(() => {
    if (data) {
      searchRoles()
    }
  }, [
    data,
    searchValue,
    tableParams.pagination?.current,
    tableParams?.sortOrder,
    tableParams?.sortField,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters)
  ])
  //#endregion

  //Permission data
  const [permissionData, setPermissionData] = useState([])
  const [permissionSelected, setPermissionSelected] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)

  const fetchAllPermissions = async () => {
    try {
      const res = await AdminPermissionsAPI.getAllPermissions(token)
      if (!res) throw new Error('Fetch all permissions failed')
      setPermissionData(res.data)
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const getRoleByID = async (role_id) => {
    try {
      const res = await AdminRolesAPI.getRoleByID(role_id, token)
      if (!res) throw new Error('Get role by ID failed')
      const data = res.data
      const permissionOfRole = data.permissions
      const permissionOfRolesID = permissionOfRole.map((p) => p.permission_id)
      const permissionDataNotInRole = permissionData.filter((p) => !permissionOfRolesID.includes(p.permission_id))
      const permissionInRoleData = permissionData.filter((p) => permissionOfRolesID.includes(p.permission_id))
      const selectData = permissionDataNotInRole.map((p) => {
        let permissionName
        try {
          const val = p.permission_name.split('_').join(' ')
          permissionName = val.charAt(0).toUpperCase() + val.slice(1)
        } catch (err) {
          permissionName = p.permission_name
        }
        return {
          value: p.permission_id,
          label: permissionName
        }
      })
      const permissionsInRoleSelectData = permissionInRoleData.map((p) => {
        let permissionName
        try {
          const val = p.permission_name.split('_').join(' ')
          permissionName = val.charAt(0).toUpperCase() + val.slice(1)
        } catch (err) {
          permissionName = p.permission_name
        }
        return {
          value: p.permission_id,
          label: permissionName
        }
      })
      setSelectedRole(role_id)
      setPermissionNotInRoleData(selectData)
      setPermissionInRoleData(permissionsInRoleSelectData)
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  //#region handle add permission to role
  const [errorAddPermission, setErrorAddPermission] = useState('')
  const [permissionDataNotInRole, setPermissionNotInRoleData] = useState([])
  const [openModalAddPermission, setOpenModalAddPermission] = useState(false)

  const handleAddPermission = async (e) => {
    try {
      e.preventDefault()
      if (!permissionSelected || permissionSelected.length === 0) {
        setErrorAddPermission('Permission is required')
        return
      }

      if (!selectedRole) {
        setErrorAddPermission('Role ID is required')
        return
      }

      const data = { permission_ids: permissionSelected }
      const res = await AdminRolesAPI.addPermissionToRole(selectedRole, data, token)
      if (!res) throw new Error('Add permission to role failed')
      setStatus(200)
      setMessageResult(
        res?.message ? res.message : res?.messages ? res.messages.join('. ') : 'Add permission to role successfully'
      )
      handleCancelAddPermission()
      fetchAllRoles()
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const handleCancelAddPermission = () => {
    setOpenModalAddPermission(false)
    setPermissionSelected(null)
    setErrorAddPermission('')
    setPermissionNotInRoleData([])
  }
  //#endregion

  //#region handle remove permission from role
  const [errorRemovePermission, setErrorRemovePermission] = useState('')
  const [permissionInRoleData, setPermissionInRoleData] = useState([])
  const [openModalRemovePermission, setOpenModalRemovePermission] = useState(false)

  const handleRemovePermission = async (e) => {
    try {
      e.preventDefault()
      if (!permissionSelected || permissionSelected.length === 0) {
        setErrorRemovePermission('Permission is required')
        return
      }

      if (!selectedRole) {
        setErrorRemovePermission('Role ID is required')
        return
      }

      const data = { permission_ids: permissionSelected }
      const res = await AdminRolesAPI.removePermissionFromRole(selectedRole, data, token)
      if (!res) throw new Error('Remove permission from role failed')
      setStatus(200)
      setMessageResult(
        res?.message
          ? res.message
          : res?.messages
            ? res.messages.join('. ')
            : 'Remove permission from role successfully'
      )
      handleCancelRemovePermission()
      fetchAllRoles()
    } catch (err) {
      if (err.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(err.message)
    }
  }

  const handleCancelRemovePermission = () => {
    setOpenModalRemovePermission(false)
    setPermissionSelected(null)
    setErrorRemovePermission('')
    setPermissionInRoleData([])
  }

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
      <header className='flex justify-between animate-slideDown'>
        <div className='flex flex-col gap-1'>
          <BreadCrumbs items={[{ title: `Roles (${filterData?.length})` }]} />
          <p>List of roles available in the system</p>
        </div>
      </header>
      <Modal
        title='Add permission to role'
        centered
        open={openModalAddPermission}
        width={400}
        footer={false}
        destroyOnClose
        onCancel={handleCancelAddPermission}
      >
        <div className='mt-7 relative'>
          <form action='' method='POST' onSubmit={handleAddPermission} autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='permission_id' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Permission(Choose 1 upto 5 permissions)
                </label>
                <Tooltip
                  title={errorAddPermission}
                  open={errorAddPermission !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      maxCount={5}
                      mode='multiple'
                      id='permission_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      onClick={() => {
                        setErrorAddPermission('')
                      }}
                      placeholder='Select a permission'
                      placement='bottomLeft'
                      options={permissionDataNotInRole}
                      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      className='w-[100%] mt-2 min-h-10'
                      onChange={(value) => {
                        if (value !== '' && value !== null && value !== undefined) {
                          setPermissionSelected(value)
                          setPermissionNotInRoleData(permissionDataNotInRole.filter((p) => !value.includes(p.value)))
                        }
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
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancelAddPermission}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        title='Remove permission from role'
        centered
        open={openModalRemovePermission}
        width={400}
        footer={false}
        destroyOnClose
        onCancel={handleCancelRemovePermission}
      >
        <div className='mt-7 relative'>
          <form action='' method='POST' onSubmit={handleRemovePermission} autoComplete='off'>
            <div className='AddCategoryForm__row'>
              <div className='AddCategoryForm__group AddCategoryForm__WidthFull'>
                <label htmlFor='permission_id' className='AddCategoryForm__label'>
                  <span className='text-[red]'>* </span>Permission(Choose 1 upto 5 permissions)
                </label>
                <Tooltip
                  title={errorRemovePermission}
                  open={errorRemovePermission !== ''}
                  placement='bottomLeft'
                  align={{
                    offset: [60, -8]
                  }}
                >
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      maxCount={5}
                      mode='multiple'
                      id='permission_id'
                      suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                      allowClear
                      showSearch
                      onClick={() => {
                        setErrorRemovePermission('')
                      }}
                      placeholder='Select a permission'
                      placement='bottomLeft'
                      options={permissionInRoleData}
                      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      className='w-[100%] mt-2 min-h-10'
                      onChange={(value) => {
                        if (value !== '' && value !== null && value !== undefined) {
                          setPermissionSelected(value)
                          setPermissionInRoleData(permissionInRoleData.filter((p) => !value.includes(p.value)))
                        }
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
                <button type='button' className='AddCategoryForm__cancelBtn' onClick={handleCancelAddPermission}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div className='p-5 my-4 bg-[#ffffff] border-[1px] border-solid border-[#e8ebed] rounded-xl animate-slideUp'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center w-[340px] justify-between text-[14px] rounded-[4px] relative'>
            <input
              type='text'
              placeholder='Search for roles'
              className='focus:border-[#1D242E] border-[1px] border-solid border-[#e8ebed] bg-[#fafafa] outline-none bg-transparent w-[100%] py-[15px] px-[15px] rounded-[4px]'
              value={searchValue}
              autoFocus
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
            <button onClick={() => {}}>
              <SearchNormal size='20' className='absolute top-[50%] right-0 transform -translate-y-1/2 mr-3' />
            </button>
          </div>
        </div>
        <div className='pt-4'>
          <AdminTable
            columns={columns}
            rowKey='role_id'
            data={filterData}
            tableParams={tableParams}
            tableStyles={{ width: '1200px', minHeight: '350px', maxHeight: '450px', backgroundColor: '#ffffff' }}
            scroll={{ y: '300px' }}
            loading={loading}
            handleTableChange={handleTableChange}
            pageSizeOptionsParent={['8', '10', '20', '50']}
            paginationTable={{
              position: ['none'],
              ...tableParams.pagination
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default AdminManageRole
