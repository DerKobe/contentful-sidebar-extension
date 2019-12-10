import React from 'react'
import T from 'prop-types'
import { Button, IconButton } from '@contentful/forma-36-react-components'
import { WORKFLOW_HARDWARE__READY } from '../../workflowStatuses'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'Produkt bereit für QS / Freigabe'

export default function MarkAsReady({ buttonType }) {
  return (
    <ActionsContext.Consumer>
      {({ dialog, setWorkflowStatus }) => (
        <div className={styles.actionWrapper}>
          <Button
            buttonType={buttonType}
            onClick={() => setWorkflowStatus(WORKFLOW_HARDWARE__READY)}
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
      )}
    </ActionsContext.Consumer>
  )
}

MarkAsReady.propTypes = {
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
}

const hint = 'Setze den Workflow Status für dieses Produkt bitte auf "Freigabe ausstehend" sobald alle Produktinformationen und Medien final eingeplegt wurden. '
