import React from 'react'
import styles from './TopBar.module.css';

function SearchResultItem(props) {


    function handleClick(event) {
        event.stopPropagation();
        props.openMealDetails({name: props.result.strMeal})
    }

  return (
    <div className={styles['search-result-item']} onClick={handleClick}>
      {props.result.strMeal}
    </div>
  )
}

export default SearchResultItem
