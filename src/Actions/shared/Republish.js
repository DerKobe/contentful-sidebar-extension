import React from 'react'
import T from 'prop-types'
import { Button, IconButton } from '@contentful/forma-36-react-components'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'Aktualisieren'

export default function Republish({ buttonType, handleClick, enableLoadingSpinner }) {
  return (
    <ActionsContext.Consumer>
      {({ apiCallInProgress, dialog, publish }) => (
        <>
          <div className={styles.actionWrapper}>
            <Button
              buttonType={buttonType}
              loading={enableLoadingSpinner !== undefined ? apiCallInProgress && enableLoadingSpinner : apiCallInProgress}
              disabled={apiCallInProgress}
              onClick={() => {
                publish()
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

Republish.propTypes = {
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
  handleClick: T.func,
  enableLoadingSpinner: T.bool,
}

Republish.defaultProps = {
  buttonType: 'positive',
  handleClick: () => {},
}

const hint = 'Gib diese aktualisierte Produktversion nach erfolgreicher Qualitätssicherung (QS) manuell frei und überschreibe damit die bereits aktive Version in der Angebotslegung. '
