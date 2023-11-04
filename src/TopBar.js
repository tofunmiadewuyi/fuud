import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.css';
import logo from './icons/fuudicon.svg';
import searchIcon from './icons/search.svg';
import userIcon from './icons/usericon.svg';
import chevron from './icons/chevrondown.svg';
import saved from './icons/saved.svg';
import about from './icons/about.svg';
import logout from './icons/logout.svg';

const TopBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user') || 'User');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSavedRecipes = () => {
    props.changePage('Recipes');
    setIsMenuOpen(false);
  };

  const goToLanding = () => {
    navigate('/')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={goToLanding}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles['user-container']}>
        <div className={styles.user} onClick={handleClick}>
          <img src={userIcon} alt="user-icon" />
          <p>Hi, {user}</p>
          <img src={chevron} alt="chevron-down-icon" />
        </div>
      </div>
      <div className={styles.searchbarContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt="search-icon" />
        <input className={styles.searchbar} type="text" placeholder="Search for a meal" />
      </div>
      <div ref={menuRef}>
        {isMenuOpen ? (
          <div className={styles.menu}>
            <div className={styles.menuOption} onClick={openSavedRecipes}>
              <img src={saved} alt="saved-icon" />
              Saved recipes
            </div>
            <div className={styles.menuOption}>
              <img src={about} alt="about-icon" />
              About
            </div>
            <span className={styles.divider}></span>
            <div className={styles.menuOption} onClick={goToLanding}>
              <img src={logout} alt="logout-icon" />
              Log out
            </div>
          </div>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};

export default TopBar;
