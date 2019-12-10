import React from 'react'
import T from 'prop-types'
import { Button, IconButton } from '@contentful/forma-36-react-components'
import { WORKFLOW_HARDWARE__DRAFT } from '../../workflowStatuses'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'auf "In Bearbeitung" setzen'

export default function MarkAsDraft({ buttonType }) {
  return (
    <ActionsContext.Consumer>
      {({ apiCallInProgress, dialog, setWorkflowStatus }) => (
        <div className={styles.actionWrapper}>
          <Button
            disabled={apiCallInProgress}
            buttonType={buttonType}
            onClick={() => setWorkflowStatus(WORKFLOW_HARDWARE__DRAFT)}
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

MarkAsDraft.propTypes = {
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
}

const hint = 'Setze den Workflow Status für dieses Produkt bei Bedarf manuell zurück auf "in Bearbeitung".'
