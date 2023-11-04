import React from 'react'
import styles from './MealPage.module.css'

function IngredientItem(props) {
  return (
    <div className={styles.ingredientItem}>
        <img className={styles.ingredientImage} src={`https://${props.image}`} alt=''/>
        <p>{props.measurement} {props.name}</p>
    </div>
  )
}

export default IngredientItem
