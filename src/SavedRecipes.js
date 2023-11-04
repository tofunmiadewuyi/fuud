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

    console.log(savedRecipes.recipes)


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h3>Saved Recipes</h3>
        <p>({savedRecipes.recipes.length})</p>
      </div>
      <div className={styles.body}>
        {savedRecipes.recipes.map(recipe => {
            return <SavedRecipeItem key={recipe.name} recipe ={recipe} deleteRecipe={deleteRecipe} openMealDetails={props.openMealDetails}/>
        })}
      </div>
    </div>
  )
}

export default SavedRecipes
