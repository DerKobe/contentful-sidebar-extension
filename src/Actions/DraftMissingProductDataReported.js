import React from 'react'
import { Paragraph } from '@contentful/forma-36-react-components'
import MarkAsDraft from './shared/MarkAsDraft'

export function DraftMissingProductDataReported() {
  return (
    <>
      <Paragraph style={{ marginBottom: 20 }}>
        Icecat wurde benachrichtig. Das System findet eigenständig heraus, wenn Produktdaten zur Verfügung stehen und
        markiert das Produkt entsprechend mit "Iceact bereit für Import".
      </Paragraph>

      <MarkAsDraft buttonType="naked" />
    </>
  )
}
