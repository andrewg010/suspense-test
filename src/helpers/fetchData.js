export const fetchProductData = location => {
  return wrapPromise(fetchAvailability(location))
}

export const fetchUserData = () => {
  return wrapPromise(fetchUserDetails())
}

const wrapPromise = promise => {
  let status = 'pending'
  let result
  let suspender = promise.then(res => {
    status = 'success'
    result = res
  },
  err => {
    status = 'error'
    result = err
  })
  return {
    read: () => {
      if (status === 'pending') throw suspender
      if (status === 'error') throw result
      return result
    }
  }
}

const fetchAvailability = location => {
  return fetch(`https://product-feed.dock-yard.io/location-products?product=carpark&agent=WY992&location=${location}&date_from%5Bdays%5D=20&date_to%5Bdays%5D=28`)
    .then(res => res.json()).then(res => res.products)
    .catch(e => console.log(e))
}

const fetchUserDetails = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ user: 'Example user', email: 'example@exampleuser.com' }), 5000)
  })
}
