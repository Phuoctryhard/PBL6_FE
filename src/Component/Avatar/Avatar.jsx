import React from 'react'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Tooltip } from 'antd'
const Avatar1 = () => (
  <div className='flex items-center justify-center h-full gap-x-2'>
    <Avatar.Group>
      <Tooltip title='Ant User' placement='top'>
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
    </Avatar.Group>
  </div>
)

export default Avatar1
// <div className='w-10'>Ngo Phuoc</div>
