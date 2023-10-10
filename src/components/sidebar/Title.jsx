import { getName } from '@tauri-apps/api/app'
import { Component, useState } from 'react'
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { name: null }

    this.getAppName = async () => {
      const name = await getName()
      this.setState({ name })
    }
  }
  componentDidMount() {
    this.getAppName()
  }

  render () {
    const { name } = this.state
    return (
      <a href='/' className='flex items-center pl-2.5 mb-5 text-xl font-semibold dark:text-white'>
        <span className="self-center whitespace-nowrap" {...this.props}>{name}</span>
      </a>
    )
  }
}
