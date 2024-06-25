import React from 'react'

const CarouselSlide = (props) => {
    const {id, slideTitle, slideDescription, slideBg} = props
  return (
        <div className="slideWrap" key={id} style={{ backgroundImage: `url(${slideBg})` }}>
            <div className="textWrap">
                <h2>{slideTitle}</h2>
                <p>{slideDescription}</p>
            </div>
        </div>
  )
}

export default CarouselSlide