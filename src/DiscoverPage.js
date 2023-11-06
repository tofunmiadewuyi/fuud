import React, { Component } from 'react'
import styles from './DiscoverPage.module.css'
import DiscoverPageItem from './DiscoverPageItem'

class DiscoverPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         discoverBy: this.props.discoverItem.tabName,
         currentItem: this.props.discoverItem.itemName,
         discoverMealOTD: {
            name: 'Suggested',
            image: ``
         },
         filterBy: '',
         url: this.props.discoverItem.url,
         resultNumber: 0
      }
    }

    componentDidMount() {
      this.fetchData()
    }


    fetchData() {
      try{
        fetch(this.state.url)
          .then(res => {
            if (!res.ok) {
              throw new Error('Network issues')
            }
            return res.json()
          })
          .then(data => {
            this.setState({
              discoverResults: data.meals,
              resultNumber: data.meals.length
            })
            // this.getMealOTD()
            return data.meals
          })
          .then((data) => {
            this.getMealOTD(data)
          })
          .catch(error => {
            console.error('From 7:', error)
          }) 
      }
      catch(error) {
        console.error('From 7, Sync error:', error)
      }

    }

    getMealOTD(data) {

          const min = 0;
          const max = data.length
          const randomCategoryIndex = Math.floor(Math.random() * (max - min) )
          const meal = data[randomCategoryIndex]

          this.setState({
            discoverMealOTD: {name: meal.strMeal, image: `url(${meal.strMealThumb})`}
          })

    }
    
    
  render() {

    const mealOTDImage = {
      backgroundImage: this.state.discoverMealOTD.image,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
      
    }
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.breadcrumbs}>
            <span onClick={this.props.toDashboard}>
              Home
              </span> / Discover by {this.state.discoverBy}
            </div>
          <h2 className={styles.h2}> {this.state.currentItem} <span className={styles.numberOfResults}>({this.state.resultNumber} result{this.state.resultNumber > 1 ?<span>s</span> : ''})</span></h2>
        </div>
        <div className={styles.content}>
            <div className={styles.itemSuggested}>
              <h3 className={styles.h3}>Suggested for you</h3>
              <div className={styles.itemSuggestedImage} style={mealOTDImage} onClick={() => this.props.openMealDetails(this.state.discoverMealOTD)}>
               <div className={styles.tint}>
                  <p>{this.state.discoverMealOTD.name}</p>
               </div>
              </div>
            </div>
            <div className={styles.itemResults}>
              { this.state.discoverResults != null ? 
                  this.state.discoverResults.map(item => {
                  return <DiscoverPageItem key={item.idMeal} name={item.strMeal} image={item.strMealThumb} openMealDetails={this.props.openMealDetails}/>
                  })  : "Loading..."
              }
            </div>
        </div>
      </div>
    )
  }
}

export default DiscoverPage
