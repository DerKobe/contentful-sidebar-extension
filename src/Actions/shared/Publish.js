import React from 'react'
import T from 'prop-types'
import { Button, IconButton } from '@contentful/forma-36-react-components'
import styles from '../actions.module.scss'
import { ActionsContext } from '../../Workflow'

const label = 'Aktivieren'

export default function Publish({ buttonType }) {
  return (
    <ActionsContext.Consumer>
      {({ apiCallInProgress, dialog, publish }) => (
        <>
          <div className={styles.actionWrapper}>
            <Button
              buttonType={buttonType}
              loading={apiCallInProgress}
              disabled={apiCallInProgress}
              onClick={publish}
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

Publish.propTypes = {
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
}

Publish.defaultProps = {
  buttonType: 'positive',
}

const hint = 'Gib dieses Produkt nach erfolgreicher Qualitätssicherung (QS) manuell frei und aktiviere es damit für die Verarbeitung in der Angebotslegung. '
