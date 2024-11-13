import { Button, Dialog, HFInput, Input } from '@/components/index'
import { useLogout, useResetPassword } from '@/services/auth.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@/components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/store/auth/auth.slice'
import checkGif from '@/assets/gifs/check.gif'
import { useState } from 'react'

const validationSchema = yup.object({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
      '비밀번호는 8자 이상, 숫자 1개, 문자 1개, 특수문자 1개 이상이어야 합니다.'
    )
    .required('이 필드는 필수입니다'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치해야합니다')
    .required('이 필드는 필수입니다')
})

export function ChangePassword() {
  const resolver = yupResolver(validationSchema)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const [openSuccessModal, setOpenSuccessModal] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { control, handleSubmit } = useForm({ resolver })

  const { mutate: logout } = useLogout({
    headers: { Authorization: `Bearer ${user?.tokens?.access?.token}` }
  })

  const { mutate, isLoading } = useResetPassword({
    params: { token: searchParams.get('token') }
  })

  const onSubmit = (data) => {
    const value = { ...data }
    delete value.confirm_password
    mutate(
      {
        ...value
      },
      {
        onSuccess: () => {
          if (user?.tokens?.refresh?.token)
            logout(
              {
                refreshToken: user?.tokens?.refresh?.token
              },
              {
                onSuccess: () => {
                  dispatch(authActions.logout())
                  setOpenSuccessModal(true)
                  toast.success('비밀번호가 업데이트되었습니다')
                }
              }
            )
          else {
            dispatch(authActions.logout())
            setOpenSuccessModal(true)
            toast.success('비밀번호가 업데이트되었습니다')
          }
        }
      }
    )
  }
  return (
    <>
      <Header />
      <div className='flex items-center justify-center py-[40px] flex-col sm:px-0 px-4'>
        <p className='text-xl sm:text-2xl font-medium text-left sm:mb-[40px] mb-[27px]'>
          비밀번호 변경
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full sm:w-[375px] flex flex-col gap-4'
        >
          <Input
            disabled
            placeholder='이메일을 입력해 주세요'
            label='계정 이메일'
            value={searchParams.get('email')}
          />

          <HFInput
            name='password'
            control={control}
            placeholder='비밀번호를 입력해 주세요'
            label='비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)'
            type='password'
          />
          <HFInput
            name='confirm_password'
            control={control}
            placeholder='비밀번호를 다시 입력해 주세요'
            label='비밀번호 확인'
            type='password'
          />
          <Button
            type='submit'
            isLoading={isLoading}
            className='mt-[20px] w-full'
          >
            변경 완료
          </Button>
        </form>
      </div>

      <Dialog
        isOpen={openSuccessModal}
        withCloseButton={false}
        onClose={() => setOpenSuccessModal(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={checkGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            비밀번호 변경 완료
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            비밀번호가 변경되었습니다
            <br />
            다시 로그인해 주세요
          </p>
          <div className='grid grid-cols-2 mt-[44px] w-full gap-2'>
            <Button
              onClick={() => navigate('/')}
              type='button'
              variant='secondary'
              className='w-full'
              size='sm'
            >
              홈으로 가기
            </Button>
            <Button
              onClick={() => navigate('/login')}
              type='button'
              className='w-full'
              size='sm'
            >
              로그인
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
