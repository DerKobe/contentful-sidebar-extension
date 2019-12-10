import React from 'react'
import ContactIcecatButton from './shared/ContactIcecatButton'
import MarkAsDraft from './shared/MarkAsDraft'

export function DraftProductDataCallFailed() {
  return (
    <>
      <ContactIcecatButton />
      <MarkAsDraft buttonType="naked" />
    </>
  )
}
