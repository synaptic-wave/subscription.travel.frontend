import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useGetAllTerms() {
  const [htmlContent, setHtmlContent] = useState({
    service: null,
    privacy: null,
    location: null
  })

  const getHtmlFile = async () => {
    try {
      const service = await axios.get('/html/term-service.html')
      const privacy = await axios.get('/html/policy-privacy.html')
      const location = await axios.get('/html/policy-location.html')
      setHtmlContent({
        service: service.data,
        privacy: privacy.data,
        location: location.data
      })
    } catch (e) {}
  }

  useEffect(() => {
    getHtmlFile()
  }, [])

  return {
    ...htmlContent
  }
}
