import React,  { useState,  useEffect, Suspense } from 'react'
import { fetchProductData } from '../helpers/fetchData'
import ErrorBoundary from './errorBoundary'
import LoadingComponent from './productLoadingComponent'
import ErrorComponent from './errorComponent'
import LocationChanger from './locationChanger'

const initialLocation = 'MAN'
const initialProductData = fetchProductData(initialLocation)

const SuspenseDemo = () => {
  const [productData, setProductData] = useState(initialProductData)
  const [location, setLocation] = useState(initialLocation)

  useEffect(() => {
    setProductData(fetchProductData(location))
  }, [location])

  return [
    <LocationChanger key='lc' location={location} handleClick={setLocation} />,
    <Suspense key='p' fallback={<LoadingComponent />} >
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Products products={productData} />
      </ErrorBoundary>
    </Suspense>
  ]
}

const Products = ({ products }) => {
  return products.read().map(product => {
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

export default SuspenseDemo
