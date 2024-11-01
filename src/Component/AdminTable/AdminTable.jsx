import { Table, ConfigProvider, Pagination } from 'antd'
import { useEffect } from 'react'
const AdminTable = ({
  columns,
  rowKey,
  data,
  tableParams,
  tableStyles,
  scroll,
  loading,
  handleTableChange = null,
  pageSizeOptionsParent,
  paginationTable = false,
  tableLayout = undefined
}) => {
  const CustomPagination = ({ total, current, pageSize, onChange, pageSizeOptions }) => (
    <div className='flex justify-between items-center mt-3'>
      <span className='inline-block text-[14px]'>
        Showing {current - 1 < 1 ? 1 : (current - 1) * pageSize + 1} to{' '}
        {current * pageSize <= total ? current * pageSize : total} of {total} entries
      </span>
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
        pageSizeOptions={pageSizeOptions || ['10', '20', '50', '100']}
      />
    </div>
  )

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: '#f5f5f5',
              headerSplitColor: 'transparent',
              headerBg: '#f5f5f5',
              sortField: '#f5f5f5',
              sortOrder: '#f5f5f5',
              borderColor: '#e8ebed'
            }
          }
        }}
      >
        <Table
          size='small'
          scrollToFirstRowOnChange
          columns={columns}
          rowKey={(record) => record[rowKey]}
          dataSource={data}
          pagination={paginationTable}
          loading={loading}
          onChange={handleTableChange}
          scroll={scroll}
          style={tableStyles}
          tableLayout={tableLayout}
        />
      </ConfigProvider>
      {paginationTable && (
        <CustomPagination
          total={tableParams.pagination.total}
          current={tableParams.pagination.current}
          pageSize={tableParams.pagination.pageSize}
          pageSizeOptions={pageSizeOptionsParent}
          onChange={(page, pageSize) => {
            handleTableChange(
              {
                ...tableParams.pagination,
                current: page,
                pageSize
              },
              tableParams.filters,
              tableParams.sortOrder
            )
          }}
        />
      )}
    </>
  )
}

export default AdminTable
