import React from 'react'
import { Skeleton } from 'antd'
export default function Skeleton1() {
  return (
    <Skeleton
      active
      paragraph={{
        rows: 16
      }}
    />
  )
}
