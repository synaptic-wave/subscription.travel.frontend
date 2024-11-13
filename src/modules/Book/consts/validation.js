import * as yup from 'yup'

const nameRegex = /^[A-Za-z]+$/
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegex = /[0-9]/

export const schema = yup.object().shape({
  hotelPaxes: yup.array().of(
    yup.object().shape({
      roomPaxes: yup.array().of(
        yup.object().shape({
          passangers: yup.array().of(
            yup.object().shape({
              name: yup
                .string()
                .when([], (items, schema) => {
                  return schema.test({
                    test: (value, context) => {
                      if (
                        !value &&
                        context.parent.nameIsRequired &&
                        context.parent.nationalityIsRequired
                      ) {
                        return false
                      }

                      return true
                    },
                    message: '여권에 표기된 영문 "성" 입력'
                  })
                })
                .when([], (items, schema) => {
                  return schema.test({
                    test: (value, context) => {
                      if (value && nameRegex.test(value)) {
                        return true
                      }

                      if (
                        !value &&
                        context.parent.nameIsRequired &&
                        !context.parent.nationalityIsRequired
                      ) {
                        return true
                      }

                      return false
                    },
                    message: '이름은 영어로만 입력해야 합니다'
                  })
                }),
              // .matches(nameRegex, '이름은 영어로만 입력해야 합니다'),
              surname: yup
                .string()
                .when([], (items, schema) => {
                  return schema.test({
                    test: (value, context) => {
                      if (
                        !value &&
                        context.parent.surnameIsRequired &&
                        context.parent.nationalityIsRequired
                      ) {
                        return false
                      }
                      return true
                    },
                    message: '여권에 표기된 영문 "이름" 입력'
                  })
                })
                .when([], (items, schema) => {
                  return schema.test({
                    test: (value, context) => {
                      if (value && nameRegex.test(value)) {
                        return true
                      }
                      if (
                        !value &&
                        context.parent.surnameIsRequired &&
                        !context.parent.nationalityIsRequired
                      ) {
                        return true
                      }

                      return false
                    },
                    message: '성은 반드시 영문으로만 입력해야 합니다'
                  })
                }),
              // .matches(nameRegex, '성은 반드시 영문으로만 입력해야 합니다'),
              phone: yup.string().when([], (items, schema) => {
                return schema.test({
                  test: (value, context) => {
                    const isFirstChild = context.path.includes(
                      'roomPaxes[0].passangers[0].phone'
                    )
                    if (isFirstChild && !value) {
                      return false
                    }
                    return true
                  },
                  message: '전화번호를 입력해주세요'
                })
              }),
              email: yup
                .string()
                .matches(emailRegex, '잘못된 이메일 형식입니다')
                .when([], (items, schema) => {
                  return schema.test({
                    test: (value, context) => {
                      const isFirstChild = context.path.includes(
                        'roomPaxes[0].passangers[0].email'
                      )
                      if (isFirstChild && !value) {
                        return false
                      }
                      return true
                    },
                    message: '이메일을 입력해주세요'
                  })
                })
            })
          )
        })
      )
    })
  )
})
