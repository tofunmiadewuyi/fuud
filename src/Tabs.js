import React from 'react'
import styles from "./App.module.css"

function Tabs(props) {

    const activeTab = {
        color: '#FBFFE5',
        border: '1px solid rgba(229, 241, 169, 0.15)',
        background: 'linear-gradient(0deg, rgba(229, 241, 169, 0.07) 0%, rgba(229, 241, 169, 0.07) 100%), #090E01',
      }

    const inactiveTab = {}

  return (
    <div className={styles['tab-container']}>
        <div className={styles.tab} 
             style={props.current === "Categories" ? activeTab: inactiveTab }
             onClick={() => props.changeTab("Categories")}>
              Categories
          </div>

        <div className={styles.tab} 
             style={props.current === "Countries" ? activeTab: inactiveTab }
             onClick={() => props.changeTab("Countries")}>
              Countries
          </div>

        <div className={styles.tab} 
             style={props.current === "Ingredients" ? activeTab: inactiveTab }
             onClick={() => props.changeTab("Ingredients")}>
              Ingredients
          </div>
    </div>
  )
}

export default Tabs
