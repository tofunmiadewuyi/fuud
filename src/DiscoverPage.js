import React, { Component } from 'react'
import styles from './DiscoverPage.module.css'
import DiscoverPageItem from './DiscoverPageItem'

class DiscoverPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         discoverBy: '',
         currentTab: '',
         currentItem: '',
         mealOTDImage: `url(${process.env.PUBLIC_URL}/images/dessertimage.png)`
         
      }
    }

    componentDidMount() {
      this.fetchData()
    }

    fetchData() {
      const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      try{
        fetch(url)
          .then(res => {
            if (!res.ok) {
              throw new Error('Network issues')
            }
            return res.json()
          })
          .then(data => {
            this.setState({
              discoverResults: data.meals
            })

            console.log(data.meals[1])

           
          })
          .catch(error => {
            console.error('From 7:', error)
          }) 
      }
      catch(error) {
        console.error('From 7, Sync error:', error)
      }
    }
    
  render() {

    const mealOTDImage = {
      background: this.state.mealOTDImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.breadcrumbs}>Home / Discover by Categories</div>
          <h2 className={styles.h2}>Beef</h2>
        </div>
        <div className={styles.content}>
            <div className={styles.itemMealOTD}>
              <h3 className={styles.h3}>Beef meal of the day</h3>
              <div className={styles.itemMealOTDImage} style={mealOTDImage}>
               <div className={styles.tint}>
                  <p>Meal name</p>
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
      </div>
    )
  }
}

export default DiscoverPage
