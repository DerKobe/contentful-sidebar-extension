import React from 'react'
import EnrichButton from './shared/EnrichButton'

export function DraftProductDataCallInProgress() {
  return (
    <EnrichButton buttonType="naked" apiCallInProgressOverride />
  )
}
