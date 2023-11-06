import React from 'react'
import styles from './HeroCardGroup.module.css';
import HeroCard from './HeroCard';

function HeroCardGroup() {
  return (
    <div className={styles['image-group']}>
        <div className={styles['left-image']}>
          <HeroCard 
          position="left"
          title="Chicken"
          body="Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets."
          image={`url("${process.env.PUBLIC_URL}/images/chickenimage.jpg")`}/>
        </div>
        <div className={styles['center-image']}>
          <HeroCard 
          position="center"
          title="Beef"
          body="Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
          image={`url("${process.env.PUBLIC_URL}/images/beefimage.jpg")`}/>
        </div>
        <div className={styles['right-image']}>
          <HeroCard
          position="right"
          title="Dessert"
          body="Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or fruit, and possibly a beverage such as dessert wine or liqueur, however in the United States it may include coffee, cheeses, nuts, or other savory items regarded as a separate course elsewhere."
          image={`url("${process.env.PUBLIC_URL}/images/dessertimage.jpg")`}/>
        </div>
      </div>
  )
}

export default HeroCardGroup
