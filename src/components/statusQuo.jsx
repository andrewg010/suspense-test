import React from 'react'
import User from './user'
import ErrorComponent from './errorComponent'
import LoadingComponent from './productLoadingComponent'
import LocationChanger from './locationChanger'

class StatusQuoExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: 'MAN'
    }

    this.setLocation = this.setLocation.bind(this)
  }

  setLocation (location) {
    this.setState({ location })
  }

  render () {
    const { location } = this.state
    return [
      <User key='user' />,
      <LocationChanger key='1' location={location} handleClick={this.setLocation} />,
      <Products key='products' location={location} />
    ]
  }
}

class Products extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      products: [],
      fetching: true,
      error: false
    }

    this.fetchProducts = this.fetchProducts.bind(this)
  }

  componentDidMount () {
    this.fetchProducts()
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) this.fetchProducts()
  }

  fetchProducts () {
    const { location } = this.props
    this.setState( {fetching: true} )
    fetch(`https://product-feed.dock-yard.io/location-products?product=carpark&agent=WY992&location=${location}&date_from%5Bdays%5D=20&date_to%5Bdays%5D=28`)
      .then(res => res.json())
      .then(res => {
        this.setState({ products: res.products, fetching: false })
      })
    .catch(e => {
      this.setState({ error: true })
    })
  }

  render () {
    const { error, fetching, products } = this.state
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
}

export default StatusQuoExample
