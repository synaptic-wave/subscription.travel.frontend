import { useEffect } from 'react'

export function Test() {
  const openWindow = () => {
    // URL you want to open
    const url = 'http://localhost:5173/payment'

    // Window features (optional)
    const features =
      'width=800,height=600,left=200,top=200,resizable=yes,scrollbars=yes'

    window.open(url, '_blank', features)
  }

  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return
      }
      console.log('Data received from new window:', event.data)
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  return <a onClick={openWindow}>New Page</a>
}
