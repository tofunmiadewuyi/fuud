import React, { useState, useEffect } from 'react';
import DashboardPage from './DashboardPage';
import DiscoverPage from './DiscoverPage';

import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import MealPage from './MealPage';

function App() {
  const [user, setUser] = useState('');
  const [isShowing, setIsShowing] = useState('Dashboard')
  const [discoverItemSelected, setDiscoverItemSelected] = useState({itemName: '', tabName: '', url: ''})
  const [mealSelected, setMealSelected] = useState()

  //getting user data from Landing
  const { state } = useLocation();
  const { userData } = state;


  useEffect(() => {
    setUser(userData.name)
  }, [userData.name, discoverItemSelected]);

  const backtoDashboard = () => {
    setIsShowing('Dashboard')
  }

  const changePage = (to) => {
    setIsShowing(to)
  }

  const passDiscoverItem = (itemName, tabName) => {

    var filterByLetter = ''

    if (tabName === 'Categories') {
      filterByLetter = 'c'
    } else if (tabName === 'Countries') {
      filterByLetter = 'a'
    } else if (tabName === 'Ingredients') {
      filterByLetter = 'i'
    } else {
      console.log('the filter letter was not set')
    }

    setDiscoverItemSelected({
      itemName: itemName,
      tabName: tabName,
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?${filterByLetter}=${itemName}`
    })

  }

  const openMealDetails = (meal) => {
    const mealName = meal.name
    const encodedMealName = encodeURIComponent(mealName)
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedMealName}`

    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network issues man')
      }
      return res.json()
    })
    .then(data => {
      if (data != null) {
        const meal = data.meals[0]
        setMealSelected({
          mealName: meal.strMeal,
          mealCountry: meal.strArea,
          mealCategory: meal.strCategory,
          mealImage: meal.strMealThumb,
          mealYoutube: meal.strYoutube,
          mealInstructions: meal.strInstructions,
          mealIngredients: [
            {
              name: meal.strIngredient1,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient1)}.png`,
              measurement: meal.strMeasure1 
            },
             {
              name: meal.strIngredient2,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient2)}.png`,
              measurement: meal.strMeasure2
            },
             {
              name: meal.strIngredient3,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient3)}.png`,
              measurement: meal.strMeasure3
            },
             {
              name: meal.strIngredient4,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient4)}.png`,
              measurement: meal.strMeasure4
            },
             {
              name: meal.strIngredient5,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient5)}.png`,
              measurement: meal.strMeasure5 
            },
             {
              name: meal.strIngredient6,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient6)}.png`,
              measurement: meal.strMeasure6 
            },
             {
              name: meal.strIngredient7,
              image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient7)}.png`,
              measurement: meal.strMeasure7 
            },
          ]
          
        })
        changePage('Meal')
      }
    })
  }


  return (
    <>
      <TopBar user={user}/>
      { isShowing === 'Dashboard' ? 
        <DashboardPage 
        changePage={changePage} 
        passDiscoverItem={passDiscoverItem}
        openMealDetails={openMealDetails}/> 
        : <></>}
      { isShowing === 'Discover' & discoverItemSelected.itemName !== ''? 
        <DiscoverPage 
        discoverItem={discoverItemSelected}
        toDashboard={backtoDashboard}/> 
        : <></>}
      { isShowing === 'Meal' ?
        <MealPage 
        meal={mealSelected}
        toDashboard={backtoDashboard}/> 
        : <></>}
    </>
  );
}

export default App;
