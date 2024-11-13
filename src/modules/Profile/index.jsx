import { Button, Dialog, HFInput, HFSelect, Input } from '@/components/index'
import {
  useDeleteUser,
  useProfile,
  useUpdateProfile
} from '@/services/auth.service'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import warningGif from '@/assets/gifs/warning.gif'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/store/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '@/components/Header'
import { nationalities } from '@/consts/nationality'
import { useState } from 'react'
import CheckIcon from '@/assets/icons/check.svg?react'

const validationSchema = yup.object({
  user_first_name: yup.string().required('이 필드는 필수입니다'),
  user_last_name: yup.string().required('이 필드는 필수입니다')
})

export function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth } = useSelector((state) => state.auth)
  const { mutate: deleteUser, isLoading: isLoadingDelete } = useDeleteUser({
    queryProps: {
      onSuccess: () => {
        dispatch(authActions.logout())
        navigate('/')
        toast.success('계정이 삭제되었습니다')
      }
    }
  })

  const { data, refetch, isLoading } = useProfile({
    queryParams: {
      enabled: isAuth,
      onSuccess: (res) => {
        reset({
          user_first_name: res.user_first_name,
          user_last_name: res.user_last_name,
          user_language: res.user_language,
          user_nationality: nationalities.find(
            (item) => item.value === res.user_nationality
          ),
          user_mobile_phone: res?.user_mobile_phone
        })
      }
    }
  })

  const { mutate, isLoading: isLoadingUpdate } = useUpdateProfile()

  const resolver = yupResolver(validationSchema)

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

  const handleDeleteUser = () => setIsOpenDeleteModal((prev) => !prev)

  const { control, handleSubmit, reset, watch, register } = useForm({
    resolver
  })

  const onSubmit = (value) => {
    const items = { ...value }
    // if (data.user_first_name) delete items.user_first_name;
    // if (data.user_last_name) delete items.user_last_name;
    // if (data.user_nationality) delete items.user_nationality;
    // if (data.user_oauth_type === "kakao") delete items.user_mobile_phone;
    if (data.user_mobile_phone === items.user_mobile_phone)
      delete items.user_mobile_phone
    mutate(
      {
        ...items,
        user_nationality: items?.user_nationality?.value
      },
      {
        onSuccess: (res) => {
          refetch()
          setIsOpenUpdateModal(true)
          // toast.success('귀하의 계정 정보가 성공적으로 업데이트되었습니다')
        },
        onError: (err) => {
          toast.error(err?.data?.message)
        }
      }
    )
  }

  return (
    <>
      <Header />
      <div className='py-[20px] px-[16px] sm:px-0 flex items-center justify-center sm:py-[40px] flex-col'>
        <p className='text-xl sm:text-2xl font-medium text-left mb-[30px]  sm:mb-[40px]'>
          내 계정 정보
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:w-[375px]'>
          <Input
            value={data?.user_email}
            disabled
            placeholder='gildong@gmail.com'
            label='계정 이메일'
          />
          <HFInput
            name='user_last_name'
            placeholder='예) Hong'
            className='mt-5'
            label='성 (영문작성)'
            control={control}
            required={true}
          />
          <HFInput
            placeholder='예) Gildong'
            className='mt-5'
            name='user_first_name'
            label='이름 (영문사용)'
            control={control}
            required={true}
            // disabled={data?.user_last_name}
          />
          <HFInput
            placeholder='연락처를 입력해 주세요'
            className='mt-5'
            name='user_mobile_phone'
            label='핸드폰 (선택)'
            control={control}
            // disabled={data?.user_oauth_type === "kakao"}
          />

          <HFSelect
            label='국적 선택'
            className='mt-5'
            name='user_nationality'
            control={control}
            options={nationalities}
            // disabled={watch("user_nationality")}
            placeholder='국적을 선택하세요'
            getOptionLabel={(opt) => opt.name}
          />

          <Button
            isLoading={isLoadingUpdate || isLoading}
            className='mt-[30px] w-full'
            type='submit'
          >
            수정 완료
          </Button>
          <Button
            variant='unstyled'
            onClick={handleDeleteUser}
            className='w-full mt-[10px]'
            isLoading={isLoadingDelete}
          >
            회원탈퇴
          </Button>
        </form>
      </div>

      <Dialog
        isOpen={isOpenDeleteModal}
        withCloseButton={false}
        onClose={handleDeleteUser}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <img src={warningGif} width={80} height={80} />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>회원탈퇴</p>
          <ul className='list-disc flex flex-col items-center'>
            <li className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'>
              탈퇴 후 계정관련 정보는 복구 불가능 합니다.
            </li>
            <li className='text-sm sm:text-base text-center text-[#5C5F79]'>
              회원님의 모든 이용기록, 혜택은 소멸됩니다.
            </li>
            <li className='text-sm sm:text-base text-center text-[#5C5F79]'>
              탈퇴를 진행하시겠습니까?
            </li>
          </ul>

          <div className='grid grid-cols-2 mt-[68px] w-full gap-2'>
            <Button
              onClick={handleDeleteUser}
              type='button'
              variant='secondary'
              className='w-full'
            >
              취소
            </Button>
            <Button
              onClick={deleteUser}
              type='button'
              className='w-full'
              isLoading={isLoadingDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOpenUpdateModal}
        withCloseButton={false}
        onClose={() => setIsOpenUpdateModal(false)}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          <CheckIcon />
          <p className='text-xl sm:text-2xl mt-[10px] text-center'>수정 완료</p>
          <p className='mt-[15px] sm:mt-[30px] text-sm sm:text-base text-center text-[#5C5F79]'>
            고객님의 정보가 정상적으로 업데이트되었습니다.
          </p>
          <Button
            onClick={() => navigate('/')}
            type='button'
            className='w-full mt-[30px] sm:mt-[50px]'
          >
            계속 검색하기
          </Button>
        </div>
      </Dialog>
    </>
  )
}
