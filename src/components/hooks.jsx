import React, { useState } from 'react'
import User from './user'
import ErrorComponent from './errorComponent'
import LoadingComponent from './productLoadingComponent'
import LocationChanger from './locationChanger'

const HooksExample = () => {
  const [location, setLocation] = useState('MAN')

  return [
    <User key='0' />,
    <LocationChanger key='1' location={location} handleClick={setLocation} />,
    <Products key='2' location={location} />
  ]
}

const Products = ({ location }) => {
  const [products, setProducts] = useState([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(false)

  const fetchProducts = () => {
    setFetching(true)
    fetch(`https://product-feed.dock-yard.io/location-products?product=carpark&agent=WY992&location=${location}&date_from%5Bdays%5D=20&date_to%5Bdays%5D=28`)
      .then(res => res.json())
      .then(res => {
        setFetching(false)
        setProducts(res.products)
      })
    .catch(e => {
      setError(true)
    })
  }

  if (error) return <ErrorComponent />
  if (fetching) return <LoadingComponent />
  return products.map(product => {
    return (
      <div key={product.code} className='panel panel-default'>
        <div className='panel-heading'><h2>{product.name}</h2></div>
        <div className='panel-body'>
          <p>{product.upsell_text}</p>
        </div>
      </div>
    )
  })
}

export default HooksExample
