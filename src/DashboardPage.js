import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import OTD from './OTD';
import randomIcon from './icons/randomize.svg';
import favIcon from './icons/save.svg';
import favFilled from './icons/save-filled.svg';
import DiscoverItem from './DiscoverItem';
import Tabs from './Tabs';


function DashboardPage(props) {
  const [randomMeal, setRandomMeal] = useState({image: '', name: '', desc: '',});
  const [mealOTD, setMealOTD] = useState({});
  const [categoryOTD, setCategoryOTD] = useState({});
  const [currentTab, setCurrentTab] = useState('Categories');
  const [discoverData, setDiscoverData] = useState([]);
  const [randomMealIsSaved, setRandomMealIsSaved] = useState(false)


  useEffect(() => {
    fetchRandom();
    fetchCategories();
    getCategoryOTD();
    getMealOTD();

  }, []);

  const getMealOTD = () => {
    const mealOTD = localStorage.getItem('mealOTD')

    if (mealOTD !== null) {
      const parsedMealOTD = JSON.parse(mealOTD)
      const timeStamp = new Date(parsedMealOTD.timestamp)
      const today = new Date();
      const isSameDay =
      timeStamp.getMonth() === today.getMonth() &&
      timeStamp.getDate() === today.getDate()

      if (isSameDay) {
        setMealOTD({
          name: parsedMealOTD.meal.strMeal,
          mealImage: parsedMealOTD.meal.strMealThumb,
        })
      } else {
        fetchMealOTD()
      }
    } else {
      fetchMealOTD()
    }
  };

  const fetchMealOTD = () => {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not okay man.');
          }
          return res.json();
        })
        .then((data) => {
          const meal = data.meals[0];
          setMealOTD({
            name: meal.strMeal,
            mealImage: meal.strMealThumb,
          });

          const dataToSave = {
            meal: meal,
            timestamp: new Date().toISOString()
          }
          localStorage.setItem('mealOTD', JSON.stringify(dataToSave) );
        });

    } catch (error) {
      console.error('From 7', error);
    }
  }

  const getCategoryOTD = () => {
    const categoryOTD = localStorage.getItem('categoryOTD')

    if(categoryOTD !== null) {
      const parsedCategoryOTD = JSON.parse(categoryOTD)
      const timeStamp = new Date(parsedCategoryOTD.timestamp)
      const today = new Date();
      const isSameDay =
      timeStamp.getMonth() === today.getMonth() &&
      timeStamp.getDate() === today.getDate()

      if (isSameDay) {
        setCategoryOTD({
          categoryName: parsedCategoryOTD.category.strCategory,
          categoryImage: parsedCategoryOTD.category.strCategoryThumb,
        })
      } else {
        fetchCategoryOTD()
      }
      
    } else {
      fetchCategoryOTD()
    }
  };

  const fetchCategoryOTD = () => {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not okay man.');
          }
          return res.json();
        })
        .then((data) => {
          const min = 0;
          const max = data.categories.length;
          const randomCategoryIndex = Math.floor(Math.random() * (max - min));
          const category = data.categories[randomCategoryIndex];
          setCategoryOTD({
            categoryName: category.strCategory,
            categoryImage: category.strCategoryThumb,
          });
          const dataToSave = {
            category: category,
            timestamp: new Date().toISOString()
          }
          localStorage.setItem('categoryOTD', JSON.stringify(dataToSave) );
        });
    } catch (error) {
      console.error('From 7', error);
    }
  }

  const fetchTabItems = (category) => {
    if (category === 'Categories') {
      fetchCategories();
    } else if (category === 'Countries') {
      fetchCountries();
    } else if (category === 'Ingredients') {
      fetchIngredients();
    } else {
      alert('what have you cooked');
    }
  };

  const fetchRandom = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not okay man.');
          }
          return res.json();
        })
        .then((data) => {
          const meal = data.meals[0];
          setRandomMeal({
            image: `url("${meal.strMealThumb}")`,
            name: meal.strMeal,
            desc: '',
            area: meal.strArea,
            category: meal.strCategory,
          });
          setRandomMealIsSaved(false)
        })
        .catch((error) => {
          console.error('From-Tofs, An error occurred:', error);
        });
    } catch (error) {
      console.error('From-Tofs, Synchronous error', error);
    }
  };

  const fetchCategories = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not okay man.');
          }
          return res.json();
        })
        .then((data) => {
          setDiscoverData(data.meals);
        })
        .catch((error) => {
          console.error('From 7, An error occurred', error);
        });
    } catch (error) {
      console.error('From 7, Synchronous error', error);
    }
  };

  const fetchCountries = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not okay man.');
        }
        return res.json();
      })
      .then((data) => {
        setDiscoverData(data.meals);
      });
  };

  const fetchIngredients = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not okay man.');
          }
          return res.json();
        })
        .then((data) => {
          setDiscoverData(data.meals);
        })
        .catch((error) => {
          console.error('From 7, An error occurred:', error);
        });
    } catch (error) {
      console.error('From 7, Synchronous error:', error);
    }
  };

  function handleDiscoverClick(itemName, tab) {
    console.log(itemName, tab)
    
    props.passDiscoverItem(itemName, tab)
    props.changePage('Discover')

  }

  function handleRandomMealClick() {
    props.openMealDetails(randomMeal)
  }

  function handleMealOTDClick() {
    console.log(mealOTD)
    props.openMealDetails(mealOTD)
  }

  const handleRandomButtonClick = () => {
    fetchRandom();
  };

  const handleRandomSaveClick = (event) => {
    event.stopPropagation();
    if (!randomMealIsSaved) {
      props.handleSaveClick(randomMeal, 'add')
      setRandomMealIsSaved(true)
      console.log('meal saved')
    } else {
      props.handleSaveClick(randomMeal, 'remove')
      setRandomMealIsSaved(false)
      console.log('meal removed')
    }
  }

  const changeTab = (changeTo) => {
    setCurrentTab(changeTo);
    fetchTabItems(changeTo);
  };

  const backgroundImage = {
    backgroundImage: `${randomMeal.image}`,
    backgroundSize: 'cover',
  };

  return (
    <div className={styles.page}>
      <div className={styles.random}>
        <div className={styles['random-header']}>
          <div className={styles['random-header-text']}>
            <h3>Feeling adventurous?</h3>
            <p>Find a random meal to make.</p>
          </div>
          <button onClick={handleRandomButtonClick}>
            Randomize
            <img src={randomIcon} alt="randomize icon" />
          </button>
        </div>
        <div className={styles.randomMealImage} style={backgroundImage} onClick={handleRandomMealClick}>
          <div className={styles.randomMealTint}>
            <h3 className={styles.h3}>{randomMeal.name}</h3>
            <p>{randomMeal.desc}</p>
            <div className={styles.randomMealPills}>
              <div className={styles.randomMealPill}>{randomMeal.area}</div>
              <div className={styles.randomMealPill}>{randomMeal.category}</div>
            </div>
          </div>
          <div className={styles.fav} onClick={handleRandomSaveClick}>
            <img src={randomMealIsSaved ? favFilled : favIcon} alt="favorites-icon" />
          </div>
        </div>
      </div>
      <div className={styles.OTD}>
        <OTD type="Meal" 
          bgcolor="#38CFBB" 
          name={mealOTD.name} 
          image={mealOTD.mealImage} 
          click={handleMealOTDClick} />
        <OTD type="Category" 
          bgcolor="#A8CF38" 
          name={categoryOTD.categoryName}
          click={() => handleDiscoverClick(categoryOTD.categoryName, 'Categories')} />
      </div>
      <div className={styles.discover}>
        <div className={styles['discover-header']}>
          <h3>Discover meals</h3>
          <div>
            <Tabs current={currentTab} changeTab={changeTab} />
          </div>
        </div>
        <div className={styles['discover-body']}>
          <p>{discoverData != null ? discoverData.length : 'Loading'} results</p>
          <div className={styles['discover-items']}>
            {discoverData != null ? (
              discoverData.map((item, index) => {
                return <DiscoverItem onclick={() => 
                  handleDiscoverClick(item.strCategory || item.strArea || item.strIngredient, currentTab)} 
                  key={index} 
                  name={item.strCategory || item.strArea || item.strIngredient} />;
              })
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
