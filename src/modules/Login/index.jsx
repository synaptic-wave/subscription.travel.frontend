import { Button, Dialog, HFInput, Input } from '@/components/index'
import GoogleIcon from '@/assets/icons/google.svg?react'
import KakaoIcon from '@/assets/icons/kakao.svg?react'
import { useGoogleLogin } from '@react-oauth/google'
import KakaoLogin from 'react-kakao-login'
import warningGif from '@/assets/gifs/warning.gif'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  useLogin,
  useOAuthLogin,
  useOAuthRegister
} from '@/services/auth.service'
import * as yup from 'yup'
import { authActions } from '@/store/auth/auth.slice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@/components/Header'
const token = '5451078c4d7668b0f60acf3c9d97b15f'

const validationSchema = yup.object({
  user_email: yup.string().required('이 필드는 필수입니다'),
  password: yup.string().required('이 필드는 필수입니다')
})

export function Login() {
  const resolver = yupResolver(validationSchema)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [openUserNotExist, setOpenUserNotExist] = useState(false)
  const [openEmailNotFound, setOpenEmailNotFound] = useState(false)
  const [openPasswordWrong, setOpenPasswordWrong] = useState(false)
  const [openOAuthEmailNotFound, setOpenOAuthEmailNotFound] = useState(false)

  const { isLoading: isLoadingOAuth, mutate: mutateOAuth } = useOAuthLogin({
    queryParams: {
      onSuccess: (res) => {
        dispatch(authActions.login(res))
        navigate('/')
      },
      onError: (error) => {
        if (error.data.message === 'USER_NOT_FOUND')
          setOpenOAuthEmailNotFound(true)
        // toast.error(error?.data?.message)
      }
    }
  })

  const { mutate: mutateOAuthRegister, isLoading: isLoadingOAuthRegister } =
    useOAuthRegister({
      queryParams: {
        onSuccess: (res) => {
          dispatch(authActions.login(res))
          navigate('/')
        },
        onError: (err) => {
          if (err.data.message === 'ALREADY_EXIST_EMAIL') navigate('/login')
          toast.error(err?.data?.message)
        }
      }
    })

  const { control, handleSubmit, setValue, setFocus } = useForm({ resolver })

  const { mutate, isLoading } = useLogin()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      mutateOAuth({
        token: credentialResponse.access_token,
        user_oauth_type: 'google'
      })
    }
  })

  const googleRegister = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      mutateOAuthRegister({
        token: credentialResponse.access_token,
        user_oauth_type: 'google'
      })
    },
    onError: (err) => {
      console.log('Login Failed')
    }
  })

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSubmit = (data) => {
    mutate(
      {
        ...data
      },
      {
        onSuccess: (res) => {
          dispatch(authActions.login(res))
          navigate('/')
        },
        onError: (err) => {
          if (err.data.message === 'EMAIL_VERIFICATION_FAILED') setIsOpen(true)
          else if (err.data.message === 'USER_NOT_FOUND')
            setOpenUserNotExist(true)
          else if (err.data.message === 'EMAIL_NOT_FOUND')
            setOpenEmailNotFound(true)
          else if (err.data.message === 'BAD_CREDENTIALS')
            setOpenPasswordWrong(true)
          else toast.error(err?.data?.message)
        }
      }
    )
  }

  return (
    <>
      <Header />
      <div className='w-full px-4 py-[20px] sm:px-0 sm:w-[375px] mx-auto sm:py-[40px] flex-col'>
        <p className='text-xl sm:text-2xl font-medium text-left sm:mb-[40px] mb-[30px]'>
          로그인
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFInput
            name='user_email'
            control={control}
            placeholder='이메일을 입력해 주세요'
            label='이메일'
            id='email'
          />
          <HFInput
            name='password'
            control={control}
            placeholder='비밀번호를 입력해 주세요'
            className='mt-5'
            label='비밀번호'
            type='password'
            id='password'
          />

          <Button
            isLoading={isLoading}
            type='submit'
            id='submit-btn'
            className='mt-[30px] w-full flex justify-center'
          >
            로그인
          </Button>
        </form>
        <div className='flex items-center justify-center mt-[24px] gap-[20px]'>
          <button
            onClick={() => navigate('/find-password')}
            type='button'
            className='text-primary-600 text-sm'
          >
            비밀번호 찾기
          </button>
          <button
            type='button'
            className='text-primary-600 text-sm'
            onClick={() => navigate('/register')}
          >
            회원가입
          </button>
        </div>
        {isLoadingOAuth ? (
          <div className='flex justify-center py-[50px]'>
            <Oval
              visible={true}
              height='30'
              width='30'
              ariaLabel='color-ring-loading'
              color='#2D40FF'
              strokeWidth={5}
              secondaryColor='#9ca3af'
            />
          </div>
        ) : (
          <>
            <p className='text-[13px] text-[#5C5F79] mt-[32px] mb-[10px]'>
              간편 로그인
            </p>
            <div className='flex flex-col gap-[14px]'>
              <button
                onClick={googleLogin}
                type='button'
                className='flex items-center border border-gray-100 border-solid rounded-[10px] py-[14px] px-[16px] w-full'
              >
                <GoogleIcon />
                <p className='w-full text-[15px] text-center'>
                  구글 계정으로 로그인
                </p>
              </button>
              <KakaoLogin
                token={token}
                onSuccess={(res) => {
                  mutateOAuth({
                    token: res.response.access_token,
                    user_oauth_type: 'kakao'
                  })
                }}
                onFail={console.error}
                onLogout={console.info}
                render={({ onClick }) => {
                  return (
                    <button
                      type='button'
                      onClick={onClick}
                      className='flex items-center border border-gray-100 border-solid rounded-[10px] py-[14px] px-[16px] w-full'
                    >
                      <KakaoIcon />
                      <p className='w-full text-[15px] text-center'>
                        카카오톡 계정으로 로그인
                      </p>
                    </button>
                  )
                }}
              />
            </div>
          </>
        )}
      </div>

      <Dialog
        isOpen={openOAuthEmailNotFound}
        withCloseButton={false}
        onClose={() => setOpenOAuthEmailNotFound(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[55px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />

          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            간편 로그인 실패!
          </p>

          <p className='mt-[10px] sm:mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            간편 로그인 계정 정보가 확인되지 않습니다.
            <br />
            간편 회원가입을 하시거나, 계정 정보를
            <br />
            다시한번 확인해 보시기 바랍니다.
          </p>
          <p className='text-[13px] text-[#5C5F79] mt-4 sm:mt-[33px]'>
            간편 회원가입
          </p>
          {isLoadingOAuthRegister ? (
            <div className='flex justify-center py-[50px]'>
              <Oval
                visible={true}
                height='30'
                width='30'
                ariaLabel='color-ring-loading'
                color='#2D40FF'
                strokeWidth={5}
                secondaryColor='#9ca3af'
              />
            </div>
          ) : (
            <div className='flex flex-col gap-[12px] mt-[9px] w-full'>
              <button
                onClick={googleRegister}
                type='button'
                className='flex items-center border border-gray-100 border-solid rounded-[10px] py-[14px] px-[16px] w-full'
              >
                <GoogleIcon />
                <p className='w-full text-[15px] text-center'>
                  구글 계정으로 회원가입
                </p>
              </button>
              <KakaoLogin
                token={token}
                onSuccess={(res) => {
                  mutateOAuthRegister({
                    token: res.response.access_token,
                    user_oauth_type: 'kakao'
                  })
                }}
                onFail={console.error}
                onLogout={console.info}
                render={({ onClick }) => {
                  return (
                    <button
                      type='button'
                      onClick={onClick}
                      className='flex items-center border border-gray-100 border-solid rounded-[10px] py-[14px] px-[16px] w-full'
                    >
                      <KakaoIcon />
                      <p className='w-full text-[15px] text-center'>
                        카카오톡 계정으로 회원가입
                      </p>
                    </button>
                  )
                }}
              />
            </div>
          )}

          <Button
            onClick={() => setOpenOAuthEmailNotFound(false)}
            type='button'
            className='w-full mt-3'
          >
            다시 시도하기
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={openUserNotExist}
        withCloseButton={false}
        onClose={() => setOpenUserNotExist(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            사용자가 존재하지 않습니다.
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            입력하신 이메일은 아직 등록되지 않았습니다.
            <br />
            로그인해서 계정을 만들어주세요!
          </p>
          <div className='grid grid-cols-2 mt-[68px] w-full gap-2'>
            <Button
              onClick={() => setOpenUserNotExist(false)}
              type='button'
              variant='secondary'
              className='w-full'
            >
              다시입력하기
            </Button>
            <Button
              onClick={() => navigate('/find-password')}
              type='button'
              className='w-full'
            >
              비밀번호 찾기
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={openEmailNotFound}
        withCloseButton={false}
        onClose={() => setOpenEmailNotFound(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            로그인 실패!
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            입력하신 메일정보를 찾을 수 없습니다.
            <br />
            메일을 다시한번 확인해 주세요!
          </p>
          <div className='grid grid-cols-2 mt-[68px] w-full gap-2'>
            <Button
              onClick={() => setOpenEmailNotFound(false)}
              type='button'
              variant='secondary'
              className='w-full'
            >
              확인
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={isOpen}
        onClose={closeModal}
        withCloseButton={false}
        className='w-full sm:w-[400px] transform overflow-hidden rounded-[10px] bg-white py-[40px] sm:px-[60px] px-[30px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center'>
          <p className='text-lg text-center'>
            이메일 인증 후 로그인이 가능합니다
          </p>

          <div className='grid grid-cols-2 mt-[44px] w-full gap-2'>
            <Button
              onClick={closeModal}
              type='button'
              variant='secondary'
              className='w-full'
              size='sm'
            >
              닫기
            </Button>
            <Button
              onClick={() => navigate('/verify-email')}
              type='button'
              className='w-full'
              size='sm'
            >
              이메일 인증
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={openPasswordWrong}
        withCloseButton={false}
        onClose={() => setOpenPasswordWrong(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            비밀번호 불일치!
          </p>
          <p className='mt-[15px] sm:mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            입력하신 비밀번호가 일치하지 않습니다.
            <br />
            비밀번호를 다시한번 확인해 주시기 바랍니다!
          </p>
          <div className='grid grid-cols-2 mt-[30px] sm:mt-[50px] w-full gap-2'>
            <Button
              onClick={() => {
                setOpenPasswordWrong(false)
                setValue('password', '')
                // setFocus('password')
              }}
              type='button'
              variant='secondary'
              className='w-full'
            >
              다시 입력하기
            </Button>
            <Button
              onClick={() => navigate('/find-password')}
              type='button'
              className='w-full'
            >
              비밀번호찾기
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
