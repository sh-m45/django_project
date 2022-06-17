import React, { Component } from 'react'
import protectedRoute from "../../libs/protectedRoute"
import axios from 'axios'
class Jobs extends Component {
  state =
    {

    }
  render() {
    return (
      <>
       <h1 className="text-white">Jobs</h1> 
      </>
    )
  }
}

export default protectedRoute(Jobs);