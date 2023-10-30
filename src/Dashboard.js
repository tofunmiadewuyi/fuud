import React, { Component } from 'react'
import styles from "./Dashboard.module.css"
import OTD from './OTD'
import randomIcon from './icons/randomize.svg'
import favIcon from './icons/save.svg'
import DiscoverItem from './DiscoverItem'
import Tabs from './Tabs'

class Dashboard extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         user: '',
         randomMeal: {
            image: `url("${process.env.PUBLIC_URL}/images/chickenimage.png")`,
            name: 'Chicken',
            desc: 'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets'
         },
         mealOTD: '',
         categoryOTD: '',
         currentTab: 'Categories',
      }
    }

    componentDidMount() {
        this.fetchRandom()
        this.fetchCategories()
    }

    handleRandomButtonClick = () => {
        this.fetchRandom()
    }

    async fetchRandom() {
        const url = "https://www.themealdb.com/api/json/v1/1/random.php"

        fetch(url)
        .then((res) => {
            if(!res.ok) {
                throw new Error('Network response was not okay man.')
            }
            return res.json()
        })
        .then((data) => {
            const meal = data.meals[0]
            this.setState({
                randomMeal:  {
                    image: `url("${meal.strMealThumb}")`,
                    name: meal.strMeal,
                    desc: '',
                    area: meal.strArea,
                    category: meal.strCategory,
                }
            })
            console.log(data.meals[0].strMealThumb)
        })
    }

    async fetchCategories() {
        const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        fetch(url)
        .then((res) => {
            if(!res.ok) {
                throw new Error('Network response was not okay man.')
            }
            return res.json()
        })
        .then((data) => {
            // console.log(data.meals)
            this.setState({
                discoverData: data.meals
            })
        })
    }
    
  render() {
    const backgroundImage = {
        backgroundImage: `${this.state.randomMeal.image}`,
        backgroundSize: "cover"
    }
    return (
      <div className={styles.page}>
        <div className={styles.random}>
            <div className={styles['random-header']}>
                <div className={styles['random-header-text']}>
                    <h3>Feeling adventurous?</h3>
                    <p>Find a random meal to make.</p>
                </div>
                <button onClick={this.handleRandomButtonClick}>
                    Randomize
                   <img src={randomIcon} alt='randomize icon'/> 
                </button>
            </div>
            <div className={styles.randomMealImage} style={backgroundImage}>
                <div className={styles.randomMealTint}>
                    <h3 className={styles.h3}>{this.state.randomMeal.name}</h3>
                    <p>{this.state.randomMeal.desc}</p>
                    <div className={styles.randomMealPills}>
                        <div className={styles.randomMealPill}>{this.state.randomMeal.area}</div>
                        <div className={styles.randomMealPill}>{this.state.randomMeal.category}</div>
                    </div>
                </div>
                <div className={styles.fav}>
                    <img src={favIcon} alt='favorites-icon'/>
                </div>
            </div>
        </div>
        <div className={styles.OTD}>
            <OTD type='Meal' bgcolor='#38CFBB' item='Dessert'
                image={`url("${process.env.PUBLIC_URL}/images/dessertimage.png")`}/>
            <OTD type='Category' bgcolor='#A8CF38' item='Lamb'
                image={`url("${process.env.PUBLIC_URL}/images/lambimage.png")`}/>
        </div>
        <div className={styles.discover}>
            <div className={styles['discover-header']}>
                <h3>Discover meals</h3>
                <div>
                    <Tabs current={this.state.currentTab}/>
                </div>
            </div>
            <div className={styles['discover-body']}>
                <p>{this.state.discoverData != null ? this.state.discoverData.length : 'Loading'} results</p>
                <div className={styles['discover-items']}>
                    { this.state.discoverData != null ? 
                    this.state.discoverData.map((item) => {
                       return <DiscoverItem key={item.strCategory} name={item.strCategory}/>
                    })
                     : <p></p>}
                </div>
            </div>
        </div>
       
      </div>
    )
  }
}

export default Dashboard
