import { MagnifyingGlass, Oval, Puff } from 'react-loader-spinner'

export function Loader() {
  return (
    <div className='h-[60vh] flex items-center justify-center'>
      <Oval
        visible={true}
        height='80'
        width='80'
        color='#2D40FF'
        ariaLabel='oval-loading'
        wrapperStyle={{}}
        wrapperClass=''
        secondaryColor='#A8ABBF'
        strokeWidth={3}
      />
    </div>
  )
}
