import React, { Component } from 'react'
import Deactivate from './shared/Deactivate'
import Republish from './shared/Republish'

export class Changed extends Component {
  state = {
    clickedAction: null,
  }

  handleClick = (clickedAction) => () => {
    this.setState({ clickedAction })
  }

  render() {
    const { clickedAction } = this.state
    return (
      <>
        <Republish
          handleClick={this.handleClick('rebublish')}
          enableLoadingSpinner={clickedAction === 'rebublish'}
        />
        <Deactivate
          handleClick={this.handleClick('deactivate')}
          enableLoadingSpinner={clickedAction === 'deactivate'}
        />
      </>
    )
  }
}
