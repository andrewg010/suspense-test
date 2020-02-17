import React from 'react'

const LocationChanger = ({ location, handleClick }) => {
  const locationToSet = location === 'MAN' ? 'LGW' : 'MAN'
  
  return [
    <h3 key='0'>Showing products for {location} </h3>,
    <button key='1' className='btn btn-default mb-3' onClick={() => handleClick(locationToSet)}>Set location to {locationToSet}</button>
  ]
}

export default LocationChanger
