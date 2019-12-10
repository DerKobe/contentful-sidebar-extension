import React from 'react'
import T from 'prop-types'
import { Button, IconButton } from '@contentful/forma-36-react-components'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'Deaktivieren'

export default function Deactivate({ buttonType, handleClick, enableLoadingSpinner }) {
  return (
    <ActionsContext.Consumer>
      {({ apiCallInProgress, dialog, unpublish }) => (
        <>
          <div className={styles.actionWrapper}>
            <Button
              buttonType={buttonType}
              loading={enableLoadingSpinner !== undefined ? apiCallInProgress && enableLoadingSpinner : apiCallInProgress}
              disabled={apiCallInProgress}
              onClick={() => {
                unpublish()
                handleClick()
              }}
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
        </>
      )}
    </ActionsContext.Consumer>
  )
}

Deactivate.propTypes = {
  apiCallInProgressOverride: T.bool,
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
  handleClick: T.func,
  enableLoadingSpinner: T.bool,
}

Deactivate.defaultProps = {
  buttonType: 'negative',
  handleClick: () => {},
}

const hint = 'Deaktivere dieses Produkt nach nach Bedarf und schließe es damit für die Verarbeitung in der Angebotslegung aus. '
