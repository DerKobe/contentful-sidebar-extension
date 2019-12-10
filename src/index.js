import React from 'react'
import ReactDOM from 'react-dom'
import Workflow from './Workflow'

window.contentfulExtension.init((extension) => {
  ReactDOM.render(
    <Workflow extension={extension} />,
    document.getElementById('root')
  )
})
