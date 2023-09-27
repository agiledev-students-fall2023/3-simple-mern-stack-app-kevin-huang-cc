import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that shows the "About Us" section, retrieving content from the backend.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutUsData, setAboutUsData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches the "About Us" data from the back-end server.
   */
  const fetchAboutUsData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        setAboutUsData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    fetchAboutUsData()
  }, [])

  return (
    <>
      
      {error && <p className="AboutUs-error">{error}</p>}
      
      {!loaded && <img src={loadingIcon} alt="loading" />}
      
      {loaded && aboutUsData && (
        <div className="AboutUs-content">
          <p>{aboutUsData.message}</p>
          <img src={aboutUsData.imageUrl} alt="About Me" />
        </div>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
