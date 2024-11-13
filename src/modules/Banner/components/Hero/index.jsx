import banner from '@/assets/images/banner_.png'
import airplane from '@/assets/images/airplane.png'

export const Hero = ({ imageUrl }) => {
  return (
    <section className='w-full sm:h-[320px] h-[165px] relative bg-[#F7F2EE]'>
      <div className='sm:max-w-[1440px] max-w-full h-full'>
        <img
          src={imageUrl?.browser}
          className='w-full h-full object-contain sm:block hidden'
        />
        <img
          src={imageUrl?.mobile}
          className='w-full h-auto object-contain sm:hidden block'
        />
        {/* <img
          src={airplane}
          className="absolute top-[140px] right-0 hidden sm:block"
        /> */}
      </div>
    </section>
  )
}
