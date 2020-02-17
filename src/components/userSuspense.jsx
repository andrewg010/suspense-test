import React from 'react'
//<SuspenseList> revealOrder='forwards'

export default ({ userDetails }) => {
  const { user, email } = userDetails.read()
  return (
    <div className='panel panel-info'>
      <h2 className='panel-body'>
        Welcome back
        <span>, {user}! <small>({email})</small></span>
      </h2>
    </div>
  )
}

const UserFallback = () => {
  return (
    <div className='panel panel-info'>
      <h2 className='panel-body'>
        Welcome back
        <span> <img src='30.gif' /></span>
      </h2>
    </div>
  )
}

export { UserFallback }
