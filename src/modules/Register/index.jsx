import { Checkbox } from '@/components/Checkbox'
import { Button, Dialog, HFInput, HFSelect, Select } from '@/components/index'
import ArrowTopIcon from '@/assets/icons/arrow-top.svg?react'
import CheckIcon from '@/assets/icons/check.svg?react'
import warningGif from '@/assets/gifs/warning.gif'
import {
  useOAuthRegister,
  useRegister,
  useSendVerificationEmail
} from '@/services/auth.service'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import GoogleIcon from '@/assets/icons/google.svg?react'
import KakaoIcon from '@/assets/icons/kakao.svg?react'
import KakaoLogin from 'react-kakao-login'
import { useGoogleLogin } from '@react-oauth/google'
import { authActions } from '@/store/auth/auth.slice'
import { useDispatch } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@/components/Header'
import { nationalities } from '@/consts/nationality'
import { TermsAndConditionsDialog } from '@/components/Footer/TermsAndConditionsDialog'

const token = '5451078c4d7668b0f60acf3c9d97b15f'

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validationSchema = yup.object({
  user_email: yup
    .string()
    .matches(emailRegex, '잘못된 이메일 형식입니다')
    .required('이 필드는 필수입니다'),
  user_first_name: yup.string().required('이 필드는 필수입니다'),
  user_last_name: yup.string().required('이 필드는 필수입니다'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
      '비밀번호는 8자 이상, 숫자 1개, 문자 1개, 특수문자 1개 이상이어야 합니다.'
    )
    .required('이 필드는 필수입니다'),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      '입력하신 비밀번호가 다릅니다. 다시 확인해 주세요.'
    )
    .required('이 필드는 필수입니다')
  // terms_and_condition: yup
  //   .boolean()
  //   .required('당신은 약관에 동의해야만합니다')
  //   .oneOf([true], '당신은 약관에 동의해야만합니다')
})

export function Register() {
  const dispatch = useDispatch()
  const [openTerms, setOpenTerms] = useState()
  const onClose = () => {
    setOpenTerms(null)
  }

  const onOpen = (value) => {
    setOpenTerms(value)
  }

  const resolver = yupResolver(validationSchema)
  const {
    mutate,
    data,
    isLoading: isLoadingLogin
  } = useRegister({
    queryProps: {
      onError: (err) => {
        if (err?.data?.message === 'ALREADY_EXIST_EMAIL')
          setOpenEmailExist(true)
        else toast.error(err?.data?.message)
      }
    }
  })
  const navigate = useNavigate()
  const [terms, setTerms] = useState({
    isService: false,
    isPrivacy: false
  })
  const [isOpenTerms, setIsOpenTerms] = useState(true)
  const { mutate: mutateOAuth, isLoading: isLoadingOAuth } = useOAuthRegister({
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
  const [isOpen, setIsOpen] = useState(false)
  const [openEmailExist, setOpenEmailExist] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isDirty, isValid },
    watch,
    setValue,
    setError
  } = useForm({
    resolver,
    mode: 'onChange',
    defaultValues: {
      user_nationality: {
        name: '대한민국',
        value: 'KR'
        // image: krImage
      }
    }
  })
  const onAcceptTermsByKey = (value, key) => {
    setTerms({
      ...terms,
      [key]: value
    })
  }

  const onAcceptTerms = (value) => {
    setTerms({
      isService: value,
      isPrivacy: value
    })
  }

  const { isLoading } = useSendVerificationEmail({
    headers: { Authorization: `Bearer ${data?.tokens?.access?.token}` },
    queryParams: {
      enabled: !!data?.tokens?.access?.token,
      onSuccess: () => {
        setIsOpen(true)
      },
      onError: (err) => {
        toast.error(err?.data?.message)
      }
    }
  })

  const onNavigateToEmailVerify = () => {
    navigate('/email-verification', {
      state: {
        email: data._user.user_email,
        token: data.tokens.access.token
      }
    })
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSubmit = (data) => {
    const values = { ...data }
    delete values.confirm_password
    // delete values.terms_and_condition
    mutate({
      ...values,
      user_language: navigator.language.includes('ko') ? 'KR' : 'EN',
      user_nationality: data.user_nationality.value,
      user_oauth_type: 'email'
    })
  }

  const googleRegister = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      mutateOAuth({
        token: credentialResponse.access_token,
        user_oauth_type: 'google'
      })
    },
    onError: (err) => {
      console.log('Login Failed')
    }
  })

  return (
    <>
      <Header />

      <div className='w-full px-4 sm:px-0 sm:w-[375px] mx-auto sm:py-[40px] py-[20px] flex-col'>
        <p className='text-xl mb-[5px] sm:text-2xl font-medium text-left sm:mb-[10px]'>
          회원가입
        </p>
        <p className='text-sm text-[#ff3838] mb-[30px] sm:mb-[40px]'>
          (주의: 본 회원 가입 정보는 컬쳐랜드 트래블의 운영사인 시냅틱웨이브의
          책임하에 운영 및 관리됩니다.)
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFInput
            name='user_email'
            control={control}
            placeholder='이메일을 입력해 주세요'
            label='계정 이메일'
          />
          <HFInput
            name='password'
            control={control}
            placeholder='비밀번호를 입력해 주세요'
            className='mt-5'
            label='비밀번호 (영문, 숫자 각 1개 이상을 반드시 포함한 8자 이상. 특수문자 가능)'
            type='password'
          />
          <HFInput
            name='confirm_password'
            control={control}
            placeholder='비밀번호를 다시 입력해 주세요'
            className='mt-5'
            label='비밀번호 확인'
            type='password'
          />
          <HFInput
            name='user_first_name'
            placeholder='예) Hong'
            className='mt-5'
            label='성 (영문사용)'
            control={control}
          />
          <HFInput
            placeholder='예) Gildong'
            className='mt-5'
            name='user_last_name'
            label='이름 (영문사용)'
            control={control}
          />
          <HFSelect
            label='국적 선택'
            className='mt-5'
            name='user_nationality'
            control={control}
            options={nationalities}
            getOptionLabel={(opt) => opt.name}
            // leftIcon={
            //   <img
            //     src={watch('user_nationality').image}
            //     className='w-[24px] h-[24px] rounded-full object-cover'
            //   />
            // }
          />
          <div className='flex items-center justify-between p-[15px] bg-[#F2F6FF] rounded-[10px] mt-[30px]'>
            <div className='flex items-center gap-1 text-sm font-[500]'>
              <Checkbox
                onChange={onAcceptTerms}
                isChecked={terms.isPrivacy && terms.isService}
              />
              약관에 모두 동의합니다.
            </div>
            <span
              onClick={() => setIsOpenTerms((prev) => !prev)}
              className={classNames(!isOpenTerms ? 'rotate-180' : 'rotate-0')}
            >
              <ArrowTopIcon />
            </span>
          </div>
          {isOpenTerms && (
            <div className='p-[18px]'>
              <div className='flex items-center gap-1'>
                <Checkbox
                  onChange={(value) => onAcceptTermsByKey(value, 'isService')}
                  isChecked={terms.isService}
                />
                <p
                  className='text-[13px] underline cursor-pointer'
                  onClick={() => onOpen('service')}
                >
                  서비스 이용약관 (필수)
                </p>
              </div>
              <div className='flex items-center gap-1 mt-4'>
                <Checkbox
                  onChange={(value) => onAcceptTermsByKey(value, 'isPrivacy')}
                  isChecked={terms.isPrivacy}
                />
                <p
                  onClick={() => onOpen('privacy')}
                  className='text-[13px] underline cursor-pointer'
                >
                  개인정보 보호 정책 (필수)
                </p>
              </div>
            </div>
          )}
          {/* <p className='text-xs text-[#ff0000]'>
            {errors['terms_and_condition']?.message}
          </p> */}
          <Button
            className='mt-[15px] sm:mt-[30px] w-full'
            isLoading={isLoading || isLoadingLogin}
            type='submit'
            disabled={
              !isDirty || !isValid || !terms.isPrivacy || !terms.isService
            }
          >
            회원가입
          </Button>
        </form>
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
            <p className='text-[13px] text-[#5C5F79] mt-[30px] sm:mt-[60px] mb-[10px]'>
              간편 회원가입
            </p>
            <div className='flex flex-col gap-[14px]'>
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
                        카카오톡 계정으로 회원가입
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
        isOpen={isOpen}
        withCloseButton={false}
        onClose={closeModal}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <CheckIcon />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            회원가입 완료
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            {watch('user_email')} 계정으로 인증번호를 발송했습니다 이메일 인증을
            완료해 주세요
          </p>
          <div className='grid grid-cols-2 mt-[68px] w-full gap-2'>
            <Button
              onClick={() => navigate('/')}
              type='button'
              variant='secondary'
              className='w-full'
            >
              홈으로 가기
            </Button>
            <Button
              onClick={onNavigateToEmailVerify}
              type='button'
              className='w-full'
            >
              이메일 인증
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={openEmailExist}
        withCloseButton={false}
        onClose={() => setOpenEmailExist(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            이미 가입된 메일입니다.
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            입력하신 이메일은 이미 가입된 메일입니다.
            <br />
            비밀번호 찾기를 통해서 로그인해주세요!
          </p>
          <div className='grid grid-cols-2 mt-[68px] w-full gap-2'>
            <Button
              onClick={() => setOpenEmailExist(false)}
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

      <TermsAndConditionsDialog
        src={openTerms}
        isOpen={!!openTerms}
        onClose={onClose}
      />
    </>
  )
}
