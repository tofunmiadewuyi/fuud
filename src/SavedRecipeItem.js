import React from 'react'
import styles from './SavedRecipes.module.css'
import removeIcon from './icons/remove.svg'

function SavedRecipeItem(props) {

    const backgroundImage = {
        backgroundImage: props.recipe.image,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }

    function deleteItem(event) {
        event.stopPropagation();
        props.deleteRecipe(props.recipe)
    }

    function openMealDetails() {
        props.openMealDetails(props.recipe)
    }

  return (
    <>
      <div className={styles['recipe-item']} onClick={openMealDetails}>
            <div className={styles['recipe-item-image']} style={backgroundImage}/>
            <div className={styles['recipe-item-content']}>
                <div className={styles['recipe-details']}>
                    <p>{props.recipe.name}</p>
                    <div className={styles.pillGroup}>
                    <div className={styles.pill}>{props.recipe.area}</div>
                    <div className={styles.pill}>{props.recipe.category}</div>
                    </div>
                </div>
                <div className={styles['recipe-delete-icon']} onClick={deleteItem}><img src={removeIcon} alt='remove-icon'/></div>
            </div>
        </div>
    </>
  )
}

export default SavedRecipeItem
