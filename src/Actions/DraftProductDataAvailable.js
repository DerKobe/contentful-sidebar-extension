import React from 'react'
import EnrichButton from './shared/EnrichButton'
import MarkAsDraft from './shared/MarkAsDraft'

export function DraftProductDataAvailable() {
  return (
    <>
      <EnrichButton />
      <MarkAsDraft buttonType="naked" />
    </>
  )
}
