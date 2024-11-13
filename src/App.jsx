import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store'
import Router from './router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import 'moment/dist/locale/ko'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ScrollToTop from 'react-scroll-to-top'
import ArrowTopIcon from '@/assets/icons/scroll-to-top.svg?react'
import { FavouriteModal } from './components/FavouriteModal'
import '../node_modules/nprogress/nprogress.css'
import nProgress from 'nprogress'
import mt from 'moment-timezone'
import { initGA } from './utils/ga'
import { ServerUpdateModal } from './components'
import '@/assets/fonts/fonts.css'

nProgress.configure({ showSpinner: false })
initGA()

function App() {
  moment.locale('ko')
  // mt.tz.setDefault('Asia/Seoul')

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <Router />
            </GoogleOAuthProvider>
            <Tooltip
              place='bottom'
              className='tooltip-dark-container'
              id='dark-tooltip'
              noArrow
            />
            <FavouriteModal />
            <ServerUpdateModal />
          </BrowserRouter>

          <ScrollToTop component={<ArrowTopIcon />} smooth />
          <ToastContainer theme='colored' />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
