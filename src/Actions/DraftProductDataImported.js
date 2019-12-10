import React from 'react'
import MarkAsDraft from './shared/MarkAsDraft'
import MarkAsReady from './shared/MarkAsReady'

export function DraftProductDataImported() {
  return (
    <>
      <MarkAsReady />
      <MarkAsDraft buttonType="naked" />
    </>
  )
}
