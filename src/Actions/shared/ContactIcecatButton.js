/* eslint-disable jsx-a11y/anchor-has-content */
import React, { createRef } from 'react'
import T from 'prop-types'
import { IconButton, Button } from '@contentful/forma-36-react-components'
import styles from '../actions.module.scss'
import { WORKFLOW_HARDWARE__DRAFT_MISSING_PRODUCT_DATA_REPORTED } from '../../workflowStatuses'
import { ActionsContext } from '../../Workflow'
import icecatEmailLinkHrefGenerator from '../../services/icecatEmailLinkHrefGenerator'

const ref = createRef()

const label = 'Fehlende Produktdaten melden'

export default function ContactIcecatButton({ buttonType }) {
  return (
    <ActionsContext.Consumer>
      {({ setWorkflowStatus, dialog, entry }) => {
        const productName = entry.fields.label.getValue()
        const ean = entry.fields.ean.getValue()
        const brand = entry.fields.brand.getValue()
        const manufacturerArticleNo = entry.fields.manufacturerArticleNo.getValue()

        const triggerEmail = () => {
          setWorkflowStatus(WORKFLOW_HARDWARE__DRAFT_MISSING_PRODUCT_DATA_REPORTED)
          ref.current.click()
        }

        return (
          <div>
            <div className={styles.actionWrapper}>
              <Button
                buttonType={buttonType}
                onClick={triggerEmail}
                children={label}
              />
              <a
                ref={ref}
                href={icecatEmailLinkHrefGenerator(productName, ean, brand, manufacturerArticleNo)}
              />
              <IconButton
                buttonType="muted"
                className={styles.actionInfoButton}
                iconProps={{ icon: 'HelpCircle' }}
                label="mehr Informationen"
                onClick={() => dialog(`Erklärung zu "${label}"`, 'Lorem Ipsum')}
              />
            </div>
          </div>
        )
      }}
    </ActionsContext.Consumer>
  )
}

ContactIcecatButton.propTypes = {
  buttonType: T.oneOf(['muted', 'primary', 'naked', 'positive', 'negative']),
}
