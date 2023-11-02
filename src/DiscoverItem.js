import styles from "./App.module.css"
import React, { Component } from 'react'

class DiscoverItem extends Component {
  render() {
    return (
      <div className={styles['discover-item']} onClick={this.props.onclick}>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default DiscoverItem

//this is the disover item thats part of the lists in the discover section of the dashboard