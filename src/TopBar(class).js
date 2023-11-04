import React, { Component } from 'react'
import styles from './TopBar.module.css'
import logo from './icons/fuudicon.svg'
import searchIcon from './icons/search.svg'
import userIcon from './icons/usericon.svg'
import chevron from './icons/chevrondown.svg'
import saved from './icons/saved.svg'
import about from './icons/about.svg'
import logout from './icons/logout.svg'

class TopBar extends Component {

  constructor(props) {
    super(props)


    this.state = {
       isMenuOpen: false,
       user: localStorage.getItem('user') || "User"
    }
    this.menuRef = React.createRef();
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
    // this.getUserData()
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
  }

  
  handleDocumentClick = (event) => {
    if (this.menuRef && !this.menuRef.current.contains(event.target)) {
      this.setState({
        isMenuOpen: false
      })
    }
  }

  handleClick = () => {
    if (!this.state.isMenuOpen) {
      this.setState({
        isMenuOpen: true
      })
    } else {
      this.setState({
        isMenuOpen: false
      })
    }
  }
  
  handleLogOut = () => {

  }

  openSavedRecipes = () => {
    this.props.changePage('Recipes')
    this.setState({
      isMenuOpen: false
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
            <img src={logo} alt='logo'/>
        </div>
        <div className={styles['user-container']}>
          <div className={styles.user} onClick={this.handleClick}>
            <img src={userIcon} alt='user-icon'/>
            <p>Hi, {this.state.user}</p>
            <img src={chevron} alt='chevron-down-icon'/>
          </div>
        </div>
        <div className={styles.searchbarContainer} >
            <img className={styles.searchIcon} src={searchIcon} alt='search-icon'/>
            <input className={styles.searchbar} type='text' placeholder='Search for a meal'/>
        </div>
        <div ref={this.menuRef}>
          { this.state.isMenuOpen ? 
            <div className={styles.menu}>
            <div className={styles.menuOption} onClick={this.openSavedRecipes}>
              <img src={saved} alt="saved-icon"/>
              Saved recipes</div>
            <div className={styles.menuOption}>
            <img src={about} alt="about-icon"/>
              About</div>
            <span className={styles.divider}></span>
            <div className={styles.menuOption} onClick={this.handleLogOut}>
            <img src={logout} alt="logout-icon"/>
              Log out</div>
          </div>
            : <span/>}
        </div>
      </div>
    )
  }
}

export default TopBar
