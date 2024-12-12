import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
const Avatar1 = ({ user_avatar }) => (
  <div className='flex items-center justify-center h-full gap-x-2'>
    {user_avatar ? (
      <img src={user_avatar} alt='' className='w-[35px] h-[35px] rounded-full object-cover' />
    ) : (
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
    )}
  </div>
)
export default Avatar1
// <div className='w-10'>Ngo Phuoc</div>
