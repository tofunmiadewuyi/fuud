import styles from "./Dashboard.module.css"
import React, { Component } from 'react'

class DiscoverItem extends Component {
  render() {
    return (
      <div className={styles['discover-item']}>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default DiscoverItem
