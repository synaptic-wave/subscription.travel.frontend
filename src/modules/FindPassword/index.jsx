import { Button, Dialog, HFInput } from '@/components/index'
import { useForgotPassword } from '@/services/auth.service'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@/components/Header'
import warningGif from '@/assets/gifs/warning.gif'
import { useState } from 'react'
import CheckIcon from '@/assets/icons/check.svg?react'

const validationSchema = yup.object({
  user_email: yup.string().required('이 필드는 필수입니다')
})

export function FindPassword() {
  const resolver = yupResolver(validationSchema)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [openUserNotExist, setOpenUserNotExist] = useState(false)

  const { control, handleSubmit } = useForm({ resolver })
  const { mutate, isLoading } = useForgotPassword()

  const onSubmit = (data) => {
    mutate(
      {
        ...data
      },
      {
        onSuccess: () => {
          // navigate('/')
          setIsOpen(true)
          // toast.success('비밀번호를 변경할 수 있는 링크를 이메일로 보냈습니다')
        },
        onError: (err) => {
          if (err.data.message === 'USER_NOT_FOUND') setOpenUserNotExist(true)
          else toast.error(err?.data?.message)
        }
      }
    )
  }

  return (
    <>
      <Header />
      <div className='py-[20px] px-4 sm:px-0 flex items-center justify-center sm:py-[40px] flex-col min-h-[60vh]'>
        <p className='text-xl mb-[30px] sm:text-2xl font-medium text-left sm:mb-[40px]'>
          비밀번호 찾기
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:w-[375px]'>
          <HFInput
            name='user_email'
            control={control}
            placeholder='이메일을 입력해 주세요'
            label='계정 이메일'
          />
          <Button
            type='submit'
            isLoading={isLoading}
            className='mt-[20px] w-full'
          >
            비밀번호 변경
          </Button>
        </form>
        {/* <div className='w-[375px] mt-[30px]'>
        <Input placeholder='인증번호를 입력해 주세요' label='인증번호' />

        <Button disabled className='mt-[20px] w-full'>
          인증 완료
        </Button>
      </div> */}
      </div>

      <Dialog
        isOpen={isOpen}
        withCloseButton={false}
        onClose={() => setIsOpen(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <CheckIcon />
          <p className='text-xl font-medium sm:text-2xl mt-[10px] text-center'>
            메일 발송 성공
          </p>
          <p className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
            비밀번호를 변경할 수 있는 링크를 보냈습니다. 메일을 학인해 주세요!
          </p>
          <div className='flex w-full justify-center mt-[20px] sm:mt-[50px]'>
            <Button
              onClick={() => setIsOpen(false)}
              type='button'
              className='w-[120px]'
            >
              확인
            </Button>
          </div>
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
              onClick={() => navigate('/')}
              type='button'
              className='w-full'
            >
              홈으로
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
