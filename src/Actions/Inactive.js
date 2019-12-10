import React from 'react'
import MarkAsDraft from './shared/MarkAsDraft'
import Publish from './shared/Publish'

export function Inactive() {
  return (
    <>
      <Publish />
      <MarkAsDraft buttonType="naked" />
    </>
  )
}
