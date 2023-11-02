import React, { Component } from 'react'
import styles from './MealPage.module.css'
import favIcon from './icons/save.svg';
import IngredientItem from './IngredientItem';

class MealPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        mealName: this.props.meal.mealName,
        mealCountry: this.props.meal.mealCountry,
        mealCategory: this.props.meal.mealCategory,
        mealImage: this.props.meal.mealImage,
        mealYoutube: this.props.meal.mealYoutube,
        mealInstructions: this.props.meal.mealInstructions,
        mealIngredients: this.props.meal.mealIngredients
      }
    }

    splitText = () => {
        const text = this.state.mealInstructions

        const sentences = text.split(". ");

        sentences.forEach(sentence => {
            console.log(sentence)
        })
    }

    componentDidMount() {
        // this.splitText()
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
            <span onClick={this.props.toDashboard}>
              Home
              </span> / {this.state.mealName}
            </div>
          <h2 className={styles.h2}>{this.state.mealName}</h2>
        </div>
        <div className={styles.mealDetail}>
            <div className={styles.mealImage} style={backgroundImage}>
                <div className={styles.mealTint}>
                    <div className={styles.mealPills}>
                        <div className={styles.mealPill}>{this.state.mealCountry}</div>
                        <div className={styles.mealPill}>{this.state.mealCategory}</div>
                    </div>
                </div>
                <div className={styles.fav}>
                    <img src={favIcon} alt="favorites-icon" />
                </div>
            </div>
            <div className={styles.ingredients}>
                <h3 className={styles.h3}>Ingredients</h3>
                <div className={styles.ingredientContent}>
                    {this.state.mealIngredients.map((ingredient, index) => {
                       return <IngredientItem key={index} name={ingredient.name} image={ingredient.image}/>
                    })}
                </div>
            </div>
        </div>
        <div className={styles.mealInstructions}>
            <div className={styles.youtube}>
                <iframe
                    width="100%"
                    height="100%"
                    src={this.state.mealYoutube}
                    frameborder="0">
                    </iframe>
                <p>Watch tutorial from Youtube.</p>
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
