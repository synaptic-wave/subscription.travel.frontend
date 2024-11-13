import { CartAddedModal } from '@/components/CartAddedModal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RoomsCart } from '@/components/RoomsCart'
import { cartActions } from '@/store/cart/cart.slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

const deleteRatePaths = ['/book', '/pre-book', '/payment']

export function MainLayout() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.cart.rooms)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!deleteRatePaths.includes(pathname)) {
      dispatch(cartActions.clearDeletableRatePlanCodes())
    }
  }, [pathname])

  return (
    <>
      <Outlet />
      <Footer />
      {(pathname.includes('/hotel-details') || pathname.includes('search')) &&
        rooms.length > 0 && <RoomsCart />}
      <CartAddedModal />
    </>
  )
}
