import React from 'react'
import MarkAsDraft from './shared/MarkAsDraft'
import Publish from './shared/Publish'

export function Ready() {
  return (
    <>
      <Publish />
      <MarkAsDraft buttonType="naked" />
    </>
  )
}
