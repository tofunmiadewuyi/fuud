import React from 'react'
import "./HeroCard.css"

function HeroCard(props) {

    const cardStyle = {
        backgroundImage: props.image,
        // backgroundImage: 'url("./images/beefimage.png")',
        backgroundColor: "red",
        backgroundSize: "cover"
    }

  return (
    <div className="card-container">
      <div className="card" style={cardStyle}>
        <div className="content">
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
