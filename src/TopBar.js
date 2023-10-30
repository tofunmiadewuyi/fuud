import React, { Component } from 'react'
import styles from './TopBar.module.css'
import logo from './icons/fuudicon.svg'
import searchIcon from './icons/search.svg'
import userIcon from './icons/usericon.svg'
import chevron from './icons/chevrondown.svg'

class TopBar extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
            <img src={logo} alt='logo'/>
        </div>
        <div className={styles.user}>
          <img src={userIcon} alt='user-icon'/>
          <p>Hi, {this.props.user}</p>
          <img src={chevron} alt='chevron-down-icon'/>
        </div>
        <div className={styles.searchbarContainer} >
            <img className={styles.searchIcon} src={searchIcon} alt='search-icon'/>
            <input className={styles.searchbar} type='text' placeholder='Search for a meal'/>
        </div>
      </div>
    )
  }
}

export default TopBar
