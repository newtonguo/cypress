import cs from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react'
import React, { Component } from 'react'

import { indent } from '../lib/util'

import Test from '../test/test'
import Collapsible from '../collapsible/collapsible'

const SuiteHeader = observer(({ model }) => (
  <span className='runnable-title'>{model.title}</span>
))

const Suite = observer(({ model }) => {
  if (!model.shouldRender) return null

  return (
    <Collapsible
      header={<SuiteHeader model={model} />}
      headerClass='runnable-wrapper'
      headerStyle={{ paddingLeft: indent(model.level) }}
      contentClass='runnables-region'
      isOpen={true}
    >
      <ul className='runnables'>
        {_.map(model.children, (runnable) => <Runnable key={runnable.id} model={runnable} />)}
      </ul>
    </Collapsible>
  )
})

@observer
class Runnable extends Component {
  constructor (props) {
    super(props)

    this.state = { isHovering: false }
  }

  render () {
    const { model } = this.props

    return (
      <li
        className={cs(`${model.type} runnable runnable-${model.state}`, {
          hover: this.state.isHovering,
        })}
        onMouseOver={this._hover(true)}
        onMouseOut={this._hover(false)}
      >
      {model.type === 'test' ? <Test model={model} /> : <Suite model={model} />}
    </li>
    )
  }

  _hover = (shouldHover) => (e) => {
    e.stopPropagation()
    this.setState({ isHovering: shouldHover })
  }
}

export default Runnable
