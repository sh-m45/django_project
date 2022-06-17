import axios from 'axios';
import React, { Component } from 'react'
import prodectedRoute from './../libs/protectedRoute';
class Display extends Component {
  render() {
    return (
      <div className="pt-5 text-white">     
        <h1>display</h1>
      </div>
    )
  }
}

export default prodectedRoute(Display)