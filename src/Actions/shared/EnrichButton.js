import React from 'react'
import T from 'prop-types'
import { Button, IconButton, Note } from '@contentful/forma-36-react-components'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'Icecat-Daten abrufen'

export default function EnrichButton({ buttonType, apiCallInProgressOverride }) {
  return (
    <ActionsContext.Consumer>
      {({ apiCallInProgress, dialog, enrichProduct }) => (
        <>
          <div className={styles.actionWrapper}>
            <Button
              buttonType={buttonType}
              loading={apiCallInProgress || apiCallInProgressOverride}
              disabled={apiCallInProgress || apiCallInProgressOverride}
              onClick={enrichProduct}
              children={label}
            />
            <IconButton
              buttonType="muted"
              className={styles.actionInfoButton}
              iconProps={{ icon: 'HelpCircle' }}
              label="mehr Informationen"
              onClick={() => dialog(`Erklärung zu "${label}"`, hint)}
            />
          </div>

          {apiCallInProgress && (
            <Note>Die Abfrage der Produktdaten benötigt einige Zeit.</Note>
          )}
        </>
      )}
    </ActionsContext.Consumer>
  )
}

EnrichButton.propTypes = {
  apiCallInProgressOverride: T.bool,
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
}

const hint = 'Per Klick auf diesen Button wird dieses Produkt in der Icecat Datenbank gesucht. Werden Produktdaten gefunden, importieren wir sie automatisch.'
