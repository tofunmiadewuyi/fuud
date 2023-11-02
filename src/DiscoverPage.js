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
            name: 'Beeffsss',
            image: `url(${process.env.PUBLIC_URL}/images/dessertimage.png)`
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

      console.log(this.state.url)

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

            this.getMealOTD()

          })
          .catch(error => {
            console.error('From 7:', error)
          }) 
      }
      catch(error) {
        console.error('From 7, Sync error:', error)
      }

    }

    getMealOTD() {
      if (this.state.discoverResults != null) {
          const results = this.state.discoverResults
          const min = 0;
          const max = results.length
    
          const randomCategoryIndex = Math.floor(Math.random() * (max - min) )
          const meal = results[randomCategoryIndex]
    
          this.setState({
            discoverMealOTD: {
              name: meal.strMeal,
              image: `url(${meal.strMealThumb})`
            }
          })


          console.log("new state image has been set:" + this.state.discoverMealOTD.image)
      }
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
              <div className={styles.itemSuggestedImage} style={mealOTDImage}>
               <div className={styles.tint}>
                  <p>{this.state.discoverMealOTD.name}</p>
               </div>
              </div>
            </div>
            <div className={styles.itemResults}>
              { this.state.discoverResults != null ? 
                  this.state.discoverResults.map(item => {
                  return <DiscoverPageItem key={item.idMeal} name={item.strMeal} image={item.strMealThumb}/>
                  })  : "Loading..."
              }
            </div>
        </div>
        <>{console.log(this.state.discoverBy, this.state.currentItem)}</>
      </div>
    )
  }
}

export default DiscoverPage
