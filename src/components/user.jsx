import React from 'react'

class User extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: false,
      fetching: true
    }

    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount () {
    this.fetchUser()
  }

  fetchUser () {
    fetchUserDetails().then(res => {
      this.setState({ user: res, fetching: false })
    })
  }

  render () {
    const { fetching, user } = this.state
    return (
      <div className='panel panel-info'>
        <h2 className='panel-body'>
          Welcome back
          { fetching && <span> <img alt='' src='30.gif' /></span> }
          { user && <span>, {user.user}! <small>({user.email})</small></span> }
        </h2>
      </div>
    )
  }
}

export default User

const fetchUserDetails = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ user: 'Example user', email: 'example@exampleuser.com' }), 3000)
  })
}
