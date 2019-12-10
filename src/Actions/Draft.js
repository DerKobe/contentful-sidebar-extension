import React from 'react'
import EnrichButton from './shared/EnrichButton'
import MarkAsReady from './shared/MarkAsReady'

export function Draft() {
  return (
    <>
      <MarkAsReady />
      <EnrichButton buttonType="naked" />
    </>
  )
}
