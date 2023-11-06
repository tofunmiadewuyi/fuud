import React, { Component } from 'react'
import MobileView from './MobileView'
import ErrorView from './ErrorView'

class ErrorBoundary extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hasError: true
      }
    }
    

    static getDeriveStateFromError (error) {
        return {
            hasError: true
        }
    }

    componentDidMount() {
        console.log('error boundary activated')
    }

  render() {
    if (this.state.hasError) { 
    return <ErrorView/>
    }
    return this.props.children
    }
}

export default ErrorBoundary
