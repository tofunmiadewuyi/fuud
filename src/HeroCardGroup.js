import React from 'react'
import './App.css';
import HeroCard from './HeroCard';

function HeroCardGroup() {
  return (
    <div className='image-group'>
        <div className="left-image">
          <HeroCard 
          title="Chicken"
          body="Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
          image={`url("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")`}/>
        </div>
        <div className="center-image">
          <HeroCard 
          title="Beef"
          body="Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
          image={`url("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")`}/>
        </div>
        <div className="right-image">
          <HeroCard 
          title="Chicken"
          body="Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
          image={`url("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")`}/>
        </div>
      </div>
  )
}

export default HeroCardGroup
