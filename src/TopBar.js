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
import SearchResultItem from './SearchResultItem';

const TopBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user') || 'User');
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const [isSearchTrayOpen, setIsSearchTrayOpen] = useState(false)
  const [searchUrl, setSearchUrl] = useState()
  const [searchResults, setSearchResults] = useState([])
  const menuRef = useRef(null);
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();

  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setIsSearchTrayOpen(false)
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

  const handleLogout = () => {
    localStorage.clear();
    goToLanding()
  }

  const handleSearch = (value) => {
    console.log(value)
    if (value !== '' && value) {
      setSearchUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(value.trim())}`);
      fetchResults()
    }

  }

  const openModal = () => {
    props.handleModal()
    setIsMenuOpen(false)
  }

  const fetchResults = () => {
    fetch(searchUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error('From 7, Network request could not be completed')
      }
      if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }
      return res.json()
    })
    .then(data => {
      setSearchResults(data.meals)
    })
    .catch(err => {
      console.error('From 7', err)
    })
  }

  useEffect(() => {
    if (searchValue !== undefined) {
      handleSearch(searchValue)
    }
    localStorage.setItem('searchValue', searchValue);

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [searchValue]);

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
        <input 
          className={styles.searchbar} 
          value={searchValue}
          onFocus={() => setIsSearchTrayOpen(true)}
          onChange={e => setSearchValue(e.target.value)}
          type="text" 
          placeholder="Search for a meal" />
          { isSearchTrayOpen ? 
            <div className={styles['search-results-container']} ref={searchResultsRef}>
            {searchResults !== null && searchResults.length > 0 ? 
            searchResults.map(result => {
            return <SearchResultItem key={result.idMeal} result={result} openMealDetails={props.openMealDetails}/>
            })
            : <p style={{opacity: 0.5, textAlign: 'center', margin: 'auto auto'}}>Type to search</p>}
            </div> : <></>}
      </div>
      <div ref={menuRef}>
        {isMenuOpen ? (
          <div className={styles.menu}>
            <div className={styles.menuOption} onClick={openSavedRecipes}>
              <img src={saved} alt="saved-icon" />
              Saved recipes
            </div>
            <div className={styles.menuOption} onClick={openModal}>
              <img src={about} alt="about-icon" />
              About
            </div>
            <span className={styles.divider}></span>
            <div className={styles.menuOption} onClick={handleLogout}>
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
