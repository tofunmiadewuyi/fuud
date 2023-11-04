import React, { Component } from 'react'
import styles from './MealPage.module.css'
import favIcon from './icons/save.svg';
import favFilled from './icons/save-filled.svg';
import youtube from './icons/youtube.svg'
import IngredientItem from './IngredientItem';

class MealPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        mealUrl: this.props.meal.url,
        mealName: '',
        mealCountry: '',
        mealCategory: '',
        mealImage: '',
        mealYoutube: '',
        mealInstructions: '',
        mealIngredients: [],
        mealIsSaved: false
      }
    }

    handlePillClick = (itemName, tab) => {
      console.log('pill clicked', itemName, tab)
      this.props.passDiscoverItem(itemName, tab)
      this.props.changePage('Discover')
    }  

    getMealSelected = async (url) => {
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

            this.setState({
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
                {
                  name: meal.strIngredient8,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient8)}.png`,
                  measurement: meal.strMeasure8
                },
                {
                  name: meal.strIngredient9,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient9)}.png`,
                  measurement: meal.strMeasure9 
                },
                {
                  name: meal.strIngredient10,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient10)}.png`,
                  measurement: meal.strMeasure10
                },
                {
                  name: meal.strIngredient11,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient11)}.png`,
                  measurement: meal.strMeasure11
                },
                {
                  name: meal.strIngredient12,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient12)}.png`,
                  measurement: meal.strMeasure12 
                },
                {
                  name: meal.strIngredient13,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient13)}.png`,
                  measurement: meal.strMeasure13 
                },
                {
                  name: meal.strIngredient14,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient14)}.png`,
                  measurement: meal.strMeasure14 
                },
                {
                  name: meal.strIngredient15,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient15)}.png`,
                  measurement: meal.strMeasure15 
                },
                {
                  name: meal.strIngredient16,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient16)}.png`,
                  measurement: meal.strMeasure16 
                },
                {
                  name: meal.strIngredient17,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient17)}.png`,
                  measurement: meal.strMeasure17
                },
                {
                  name: meal.strIngredient18,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient18)}.png`,
                  measurement: meal.strMeasure18
                },
                {
                  name: meal.strIngredient19,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient19)}.png`,
                  measurement: meal.strMeasure19
                },
                {
                  name: meal.strIngredient20,
                  image: `www.themealdb.com/images/ingredients/${encodeURIComponent(meal.strIngredient20)}.png`,
                  measurement: meal.strMeasure20
                },
              ]
            })
          }
        })
        .then(() => {
          this.getSavedInfo()
        })
        .catch(err => {
          console.log('there was an error fetching')
        })

    }

    getSavedInfo = () => {
      const savedItems = JSON.parse(localStorage.getItem('saved'))
      const meal = {
        image: `url("${this.state.mealImage}")`,
        name: this.state.mealName,
        desc: '',
        area: this.state.mealCountry,
        category: this.state.mealCategory,
      }
      const isItemSaved = savedItems.some(item => JSON.stringify(item) === JSON.stringify(meal))
      if (isItemSaved) {
        this.setState({
          mealIsSaved: true
        })
      }
    }

    handleSaveClick = (event) => {
      event.stopPropagation();
      const meal = {
        image: `url("${this.state.mealImage}")`,
        name: this.state.mealName,
        desc: '',
        area: this.state.mealCountry,
        category: this.state.mealCategory,
      }
      if (!this.state.mealIsSaved) {
        this.props.handleSaveClick(meal, 'add')
        this.setState({
          mealIsSaved: true
        })
        console.log('meal saved')
      } else {
        this.props.handleSaveClick(meal, 'remove')
        this.setState({
          mealIsSaved: false
        })
        console.log('meal removed')
      }
    }


    componentDidMount() {
        this.getMealSelected(this.state.mealUrl);

    }


    
  render() {
    

    const backgroundImage = {
        backgroundImage: `url(${this.state.mealImage})`,
        backgroundSize: 'cover',
      };

    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.breadcrumbs}>
            <span className={styles['breadcrumbs-home']} onClick={this.props.toDashboard}>
              Home
              </span> / {this.state.mealName}
            </div>
          <h2 className={styles.h2}>{this.state.mealName}</h2>
        </div>
        <div className={styles.mealDetail}>
            <div className={styles.mealImage} style={backgroundImage}>
                <div className={styles.mealTint}>
                    <div className={styles.mealPills}>
                        <div className={styles.mealPill} onClick={() => this.handlePillClick(this.state.mealCountry, 'Countries')}>
                          {this.state.mealCountry}
                        </div>
                        <div className={styles.mealPill} onClick={() => this.handlePillClick(this.state.mealCategory, 'Categories')}>
                          {this.state.mealCategory}
                        </div>
                    </div>
                </div>
                <div className={styles.fav} onClick={this.handleSaveClick}>
                    <img src={this.state.mealIsSaved ? favFilled : favIcon} alt="favorites-icon" />
                </div>
            </div>
            <div className={styles.ingredients}>
                <h3 className={styles.h3}>Ingredients</h3>
                <div className={styles.ingredientContent}>
                    {this.state.mealIngredients.map((ingredient, index) => {
                      if (ingredient.name !== '' && ingredient.name != null) {
                        return <IngredientItem key={index} name={ingredient.name} image={ingredient.image} measurement={ingredient.measurement}/>
                      }
                    })}
                </div>
            </div>
        </div>
        <div className={styles.mealInstructions}>
            <div className={styles.youtube}>
                <img src={youtube}/>
                <a href={this.state.mealYoutube} target='_blank'>
                  <p>Watch tutorial on Youtube.</p>
                </a>   
            </div>
            <div className={styles.instructions}>
                <h3 className={styles.h3}>Instructions</h3>
                <p className={styles.instructionparagraph}>
                    {this.state.mealInstructions}
                </p>
            </div>
        </div>
      </div>
    )
  }
}

export default MealPage
