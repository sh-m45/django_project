import axios from 'axios';
import React, { Component } from 'react'
import protectedRoute from '../libs/protectedRoute';
class Profile extends Component {
  render() {
    return (
      <div className="pt-5 text-white">     
        <h1>display</h1>
      </div>
    )
  }
}

export default protectedRoute(Profile)