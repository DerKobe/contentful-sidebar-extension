import React, { Component } from 'react'
import T from 'prop-types'
import deepDiff from 'deep-diff'
import {
  WORKFLOW_HARDWARE__NEW,
  WORKFLOW_HARDWARE__DRAFT,
  WORKFLOW_HARDWARE__DRAFT_PRODUCT_DATA_CALL_IN_PROGRESS,
  WORKFLOW_HARDWARE__DRAFT_PRODUCT_DATA_CALL_FAILED,
  WORKFLOW_HARDWARE__DRAFT_MISSING_PRODUCT_DATA_REPORTED,
  WORKFLOW_HARDWARE__DRAFT_PRODUCT_DATA_AVAILABLE,
  WORKFLOW_HARDWARE__DRAFT_PRODUCT_DATA_IMPORTED,
  WORKFLOW_HARDWARE__READY,
  WORKFLOW_HARDWARE__ACTIVE,
  WORKFLOW_HARDWARE__CHANGED,
  WORKFLOW_HARDWARE__INACTIVE,
} from './workflowStatuses'

export default class Workflow extends Component {
  static propTypes = {
    extension: T.object,
  };

  constructor(props) {
    super(props)

    this.state = {
      workflow: props.extension.entry.fields.workflow.getValue(),
    }

    const fields = Object.keys(props.extension.entry.fields).filter((field) => field !== 'workflow')
    this.firstUpdate = fields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
    this.oldValue = fields.reduce((acc, field) => ({ ...acc, [field]: undefined }), {})
  }

  componentDidMount() {
    const { extension } = this.props

    this.props.extension.window.startAutoResizer()

    this.detachWorkflowChangeHandler = extension.entry.fields.workflow.onValueChanged((workflow) => {
      // WORKAROUND for Contentful SDK-Bug #211442
      // if (workflow === 'Changed (Freigabe ausstehendChanged (Freigabe ausstehend)') {
      //   this.setWorkflowStatus(WORKFLOW_HARDWARE__CHANGED)
      // } else {
      //   this.setState({ workflow })
      // }
      this.setState({ workflow })
    })

    // handle every field change except "workflow" and trigger handleProductChanged (but never on the first change)
    this.detachValueChangeHandler = (
      Object
        .keys(extension.entry.fields)
        .filter((field) => field !== 'workflow')
        .map((field) => (
          extension.entry.fields[field].onValueChanged((newValue) => {
            if (this.firstUpdate[field] && deepDiff(this.oldValue[field], newValue)) {
              this.handleProductChanged(field, newValue)
            }
            this.firstUpdate[field] = true
            this.oldValue[field] = newValue
          })
        ))
    )
  }

  componentWillUnmount() {
    this.props.extension.window.stopAutoResizer()
    this.detachWorkflowChangeHandler()
    this.detachValueChangeHandler.forEach((handler) => handler())
  }

  handleProductChanged = (field, value) => {
    const { workflow } = this.state

    if (workflow === WORKFLOW_HARDWARE__ACTIVE) {
      this.setWorkflowStatus(WORKFLOW_HARDWARE__CHANGED)
    }

    if ([WORKFLOW_HARDWARE__NEW, WORKFLOW_HARDWARE__READY].includes(workflow)) {
      this.setWorkflowStatus(WORKFLOW_HARDWARE__DRAFT)
    }
  }

  setWorkflowStatus = (status) => {
    const { entry } = this.props.extension
    this.setState({ apiCallInProgress: true }, async () => {
      entry.fields.workflow.setValue(status)
      this.setState({ apiCallInProgress: false })
    })
  }

  render() {
    return (
      <div>{this.state.workflow}</div>
    )
  }
}
