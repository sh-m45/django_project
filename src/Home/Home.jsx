import React, { Component } from 'react'
import protectedRoute from "../libs/protectedRoute"
import axios from 'axios'
class Home extends Component {
  state =
    {

    }
  render() {
    return (
      <>
       <h1 className="text-white">Home</h1> 
      </>
    )
  }
}

export default protectedRoute(Home);