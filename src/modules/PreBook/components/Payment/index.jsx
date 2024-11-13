import { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

export function Payment({ payment, onChangeStatusId, isLoading }) {
  useEffect(() => {
    function handleReceiveMessage(event) {
      if (event.origin !== import.meta.env.VITE_BACKEND_URL) {
        return
      }
      const res = JSON.parse(decodeURIComponent(event.data))

      onChangeStatusId(res)
    }

    window.addEventListener('message', handleReceiveMessage)

    return () => {
      window.removeEventListener('message', handleReceiveMessage)
    }
  }, [])

  return (
    <div className='w-[full] h-[70vh]'>
      {isLoading ? (
        <div className='flex items-center justify-center h-full w-full'>
          <Oval
            visible={true}
            height='50'
            width='50'
            ariaLabel='color-ring-loading'
            color={'#2D40FF'}
            strokeWidth={5}
            secondaryColor={'#9ca3af'}
          />
        </div>
      ) : (
        <iframe
          style={{
            width: '100%',
            height: '100%',
            outline: 'none',
            border: 'none'
          }}
          srcDoc={payment}
        />
      )}
    </div>
  )
}
