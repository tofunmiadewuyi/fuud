import React, { useState, useEffect } from 'react';
import DashboardPage from './DashboardPage';
import DiscoverPage from './DiscoverPage';
import TopBar from './TopBar';
import MealPage from './MealPage';
import MakerTag from './MakerTag';
import SavedRecipes from './SavedRecipes';
import MobileView from './MobileView';
import ErrorBoundary from './ErrorBoundary';
import AboutModal from './AboutModal';

function App() {
  const [isShowing, setIsShowing] = useState('Dashboard')
  const [discoverItemSelected, setDiscoverItemSelected] = useState({itemName: '', tabName: '', url: ''})
  const [mealSelected, setMealSelected] = useState()
  const [deviceAllowed, setDeviceAllowed] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [discoverItemSelected]);

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) {
      console.log('Too small')
      setDeviceAllowed(false)
    } else {
      setDeviceAllowed(true)
    }
  }

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

    setMealSelected(
       url
    )

    changePage('Meal')

  }

  const handleSaveClick = (meal, type) => {
    const savedItems = JSON.parse(localStorage.getItem('saved')) || [];
    const itemExists = savedItems.some(item => JSON.stringify(item) === JSON.stringify(meal))


    if (type === 'add' && !itemExists) {
      savedItems.push(meal)
      localStorage.setItem('saved', JSON.stringify(savedItems));
    } else if (type === 'remove' && itemExists) {
      const newArray = savedItems.filter(item => item.name !== meal.name)
      localStorage.setItem('saved', JSON.stringify(newArray));
    } else {
      console.error('From 7, there was an issue adding or removing this meal to/from the saved list')
    }

  }

  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
    }
  }


  return (
    <>
      
        {deviceAllowed ? 
        <>
          <TopBar changePage={changePage} openMealDetails={openMealDetails} handleModal={handleModal}/>
          {isModalOpen ? <AboutModal handleModal={handleModal}/> : <></>}
        { isShowing === 'Dashboard' ? 
          <DashboardPage 
          changePage={changePage} 
          passDiscoverItem={passDiscoverItem}
          openMealDetails={openMealDetails}
          handleSaveClick={handleSaveClick}/> 
          : <></>}
        { isShowing === 'Discover' & discoverItemSelected.itemName !== ''? 
          <DiscoverPage 
          discoverItem={discoverItemSelected}
          toDashboard={backtoDashboard}
          openMealDetails={openMealDetails}/> 
          : <></>}
        { isShowing === 'Meal' ?
          <MealPage 
          meal={mealSelected}
          toDashboard={backtoDashboard}
          changePage={changePage} 
          passDiscoverItem={passDiscoverItem}
          handleSaveClick={handleSaveClick}/> 
          : <></>}
          { isShowing === 'Recipes' ?
          <SavedRecipes 
          openMealDetails={openMealDetails}
          toDashboard={backtoDashboard}/>
          : <></>}
        <MakerTag/>
        </> : 
        <><MobileView/></>}
        
    </>
  );
}

export default App;
