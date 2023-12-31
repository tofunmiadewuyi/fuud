import React from 'react'
import styles from "./HeroCard.module.css"

function HeroCard(props) {

    var cardType = ''

    const cardStyle = {
        backgroundImage: props.image,
        backgroundColor: "rgba(9, 14, 1, 0.50)",
        backgroundSize: "cover"
    }

    function setPositionEffect() {
      cardType = props.position + 'card'
    }
    setPositionEffect()

  return (
    <div className="card-container">
      <div className={`${styles.card} ${styles[cardType]}`} style={cardStyle}>
        <div className={styles.content}>
            <h3 className={styles.h3}>{props.title}</h3>
            <p className={styles.p}>{props.body}</p>
            <span/> <span/>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
