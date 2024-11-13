import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/',
    title: '회원가입'
  },
  {
    to: '/',
    title: '로그인'
  },
  {
    to: '/',
    title: '찜리스트'
  },
  {
    to: '/',
    title: '장바구니'
  },
  {
    to: '/',
    title: '고객센터'
  }
]

export function Header() {
  return (
    <header className='container'>
      <div className='flex items-center py-[25px] justify-between'>
        <NavLink
          className='text-[34px] font-bold text-primary block leading-9'
          to='/'
        >
          핸디트립
        </NavLink>
        <div className='flex items-center gap-2'>
          {links.map((value, index) => (
            <>
              <NavLink className='text-sm' to={value.to}>
                {value.title}
              </NavLink>
              {links.length - 1 !== index && (
                <div className='h-[10px] w-[1px] bg-[#B7C5C8]' />
              )}
            </>
          ))}
        </div>
      </div>
    </header>
  )
}
