import React, { useEffect, useState } from 'react'
import styles from './SavedRecipes.module.css'
import SavedRecipeItem from './SavedRecipeItem'

function SavedRecipes(props) {

    const [savedRecipes, setSavedRecipes] = useState({recipes: JSON.parse(localStorage.getItem('saved'))})

    useEffect(() => {

    })

    const deleteRecipe = (item) => {
       const newArray = savedRecipes.recipes.filter(recipe => recipe.name !== item.name)
       
       localStorage.setItem('saved', JSON.stringify(newArray))
       setSavedRecipes({
        recipes: newArray
       })
    }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs} onClick={props.toDashboard}>Home</div>
        <div className={styles['header-title']}>
          <h3>Saved Recipes</h3>
          <p>({savedRecipes.recipes ? savedRecipes.recipes.length : '0'})</p>
        </div>
      </div>
      <div className={styles.body}>
        { savedRecipes.recipes ? 
        savedRecipes.recipes.map(recipe => {
            return <SavedRecipeItem key={recipe.name} recipe ={recipe} deleteRecipe={deleteRecipe} openMealDetails={props.openMealDetails}/>
        })
      : "No saved recipes yet."}
      </div>
    </div>
  )
}

export default SavedRecipes
