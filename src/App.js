import React, { useState, useEffect } from 'react';
import DashboardPage from './DashboardPage';
import DiscoverPage from './DiscoverPage';

import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import MealPage from './MealPage';
import MakerTag from './MakerTag';

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

    setMealSelected({
      url: url
    })

    changePage('Meal')

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
      <MakerTag/>
    </>
  );
}

export default App;
