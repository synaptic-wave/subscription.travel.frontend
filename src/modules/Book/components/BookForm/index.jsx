import { HFInput, HFSelect } from "@/components/index";
import { Transition } from "@headlessui/react";
import ArrowTopIcon from "@/assets/icons/arrow-top.svg?react";
import { nationalities } from "@/consts/nationality";
import useTranslate from "@/hooks/useTranslate";
import { Checkbox } from "@/components/Checkbox";
import { commentsArray } from "@/consts/comments";
import { Controller } from "react-hook-form";

function formatCurrency(input) {
  // Regular expression to find currency amount patterns like ₩ 354500
  const regex = /₩ (\d+)/g;

  // Replace the matched pattern with formatted currency
  const formattedString = input.replace(regex, (match, p1) => {
    // Format the captured number with commas
    const formattedAmount = parseInt(p1, 10).toLocaleString();
    // Return the formatted string
    return `₩ ${formattedAmount}`;
  });

  return formattedString;
}

function transformString(input) {
  const regex =
    /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})부터 (\d{4}\/\d{2}\/)까지 취소시 (\d{2}) (\d{2}:\d{2}:\d{2}): ₩ (\d+)/;

  const regex1 =
    /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})부터 (\d{4}\/\d{2}\/)(\d{2}) (\d{2}:\d{2}:\d{2}): ₩ (\d+)/;

  const match = input.match(regex);

  if (match) {
    const startDateTime = match[1];
    const yearMonth = match[2];
    const day = match[3];
    const endTime = match[4];
    const amount = match[5].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${startDateTime}부터 ${yearMonth}${day} ${endTime}까지 취소시 : ₩ ${amount}`;
  } else {
    return formatCurrency(input); // Return the original string if it doesn't match the pattern
  }
}

const COMMENTS_LIMIT = 300;

export default function BookForm({
  control,
  onOpenAccordion,
  formIds,
  fields,
  description,
  comment,
  hotelIndex,
  useWatch,
  setValue
}) {
  // const { fields } = useFieldArray({
  //   control,
  //   name: 'roomPaxes'
  // })

  const commentSelects = useWatch({
    control,
    name: `hotelPaxes[${hotelIndex}].commentSelects`
  });
  const translatedRules = useTranslate(description);
  const translatedComments = useTranslate(comment);

  return (
    <>
      <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
        <div className="flex flex-col w-full">
          <h2 className="text-base sm:text-xl font-medium text-[#161A3F]">
            고객 예약 정보
          </h2>
          <p className="text-xs mt-2 text-[#FF3838]">
            동반 예약자 정보 입력은 선택사항이나, 일부 국가의 경우 모든 예약자
            정보 제공이 필수적입니다. 이점 유의하시기 바랍니다.
          </p>
          <div className="flex flex-col gap-6 mt-[30px]">
            {fields.map((item, i) => (
              <div className="flex flex-col gap-2" key={`${hotelIndex}${i}`}>
                {fields.length > 1 && (
                  <h4 className="text-base font-medium">방 {item.roomId}</h4>
                )}
                <div className="flex flex-col gap-[26px]">
                  {item.passangers.map((value, j) => (
                    <div
                      className="flex flex-col gap-3"
                      key={j + i + item.roodId + value.idPax}
                    >
                      {i !== 0 || j !== 0 ? (
                        <>
                          <button
                            onClick={() =>
                              onOpenAccordion(
                                `${hotelIndex}${item.roomId}${value.idPax}`
                              )
                            }
                            type="button"
                            className="flex w-full justify-between border-b border-gray-100 py-2 "
                          >
                            {item.passangers.length > 1 && (
                              <p className="text-base font-medium">
                                투숙객 {value.idPax}
                                {value.age < 18 && (
                                  <span className="font-[400]">
                                    {" "}
                                    ({value.age}세)
                                  </span>
                                )}
                              </p>
                            )}
                            <ArrowTopIcon
                              className={`${
                                !!formIds[
                                  `${hotelIndex}${item.roomId}${value.idPax}`
                                ]
                                  ? "rotate-360"
                                  : "rotate-180"
                              } h-5 w-5`}
                            />
                          </button>
                          <Transition
                            show={
                              !!formIds[
                                `${hotelIndex}${item.roomId}${value.idPax}`
                              ]
                            }
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <div
                              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                              key={item.roomId + value.idPax}
                            >
                              <HFInput
                                control={control}
                                name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].surname`}
                                label="성(영문사용)"
                                placeholder="예) Hong"
                              />
                              <HFInput
                                control={control}
                                name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].name`}
                                label="이름(영문사용)"
                                placeholder="예) Gildong"
                              />
                              {value.nationalityIsRequired && (
                                <HFSelect
                                  label="국적 선택"
                                  name="nationality"
                                  control={control}
                                  options={nationalities}
                                  placeholder="국적을 선택하세요"
                                  getOptionLabel={(opt) => opt.name}
                                />
                              )}
                            </div>
                          </Transition>
                        </>
                      ) : (
                        <>
                          {item.passangers.length > 1 && (
                            <p className="text-base font-medium">
                              투숙객 {value.idPax}
                              {value.age < 18 && (
                                <span className="font-[400]">
                                  {" "}
                                  ({value.age}세)
                                </span>
                              )}
                            </p>
                          )}
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                            key={item.roomId + value.idPax}
                          >
                            <HFInput
                              control={control}
                              name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].surname`}
                              label="성(영문사용)"
                              placeholder="예) Hong"
                            />

                            <HFInput
                              control={control}
                              name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].name`}
                              label="이름(영문사용)"
                              placeholder="예) Gildong"
                            />

                            {i === 0 && j === 0 && (
                              <>
                                <HFInput
                                  label="핸드폰"
                                  control={control}
                                  name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].phone`}
                                  placeholder="연락처를 입력해 주세요"
                                />

                                <HFInput
                                  label="이메일"
                                  control={control}
                                  rules={{
                                    onChange: (e) => {
                                      setValue(
                                        `hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].email`,
                                        e.target.value?.toLowerCase()
                                      );
                                    }
                                  }}
                                  name={`hotelPaxes[${hotelIndex}].roomPaxes[${i}].passangers[${j}].email`}
                                  placeholder="이메일을 입력해 주세요"
                                />
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px] mt-2">
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-medium text-[#161A3F]">특별 요청 사항</h3>
          <p className="text-sm text-[#5C5F79] font-normal mt-[6px]">
            모든 특별 요청 사항 반영 여부는 여건에 따라 달라질 수 있습니다. 예약
            완료 즉시 요청 사항을 숙소/호스트에게 전달하겠습니다.
          </p>

          <Controller
            name={`hotelPaxes[${hotelIndex}].commentSelects`}
            control={control}
            render={({ field }) => {
              const value = field.value;

              const handleChange = (_, val) => {
                if (!value) {
                  field.onChange([val]);
                } else if (value.includes(val))
                  field.onChange(value.filter((el) => el !== val));
                else field.onChange([...value, val]);
              };

              return (
                <div className="w-full flex flex-wrap mt-5">
                  {commentsArray.map((comment, idx) => (
                    <div
                      className="sm:w-1/4 w-1/2 flex justify-start mt-2"
                      key={idx}
                    >
                      <Checkbox
                        isChecked={value?.includes(comment.value)}
                        label={comment.label}
                        value={comment.value}
                        onChange={(val) => handleChange(val, comment.value)}
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          />

          <Controller
            name={`hotelPaxes[${hotelIndex}].commentText`}
            control={control}
            render={({ field }) => {
              return (
                <div className="w-full flex flex-col mt-8 gap-[11px]">
                  <label className="text-sm font-bold text-[#5C5F79]">
                    기타 추가 요청사항
                  </label>

                  <textarea
                    {...field}
                    maxLength={
                      COMMENTS_LIMIT - (commentSelects?.join("")?.length || 0)
                    }
                    className="w-full border border-[#EAEAF4] rounded-[5px] p-[18px] text-sm min-h-[189px] resize-none"
                    placeholder="내용을 입력해 주세요!"
                  />

                  <span className="text-xs text-gray-600 ml-1">
                    {field.value?.length || 0} /{" "}
                    {COMMENTS_LIMIT - (commentSelects?.join("")?.length || 0)}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </div>

      <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px] mt-2">
        <div className="flex flex-col w-full">
          <h2 className="text-base sm:text-[20px] font-medium text-[#161A3F]">
            중요한 정보
          </h2>

          <div className="flex flex-col mt-[26px]">
            <h3 className="text-[13px]  sm:text-[14px] text-[#5C5F79] font-bold">
              체크인 / 점검사항
            </h3>

            <p
              className="text-[#5C5F79] text-[13px] sm:text-[14px] font-normal"
              dangerouslySetInnerHTML={{
                __html: (
                  translatedComments?.data?.data?.data?.translations?.[0]
                    ?.translatedText || comment
                )
                  ?.replace("*", "<br/>")
                  .replace("세부", "세부사항")
              }}
            />
          </div>

          <div className="flex flex-col mt-[26px]">
            <h3 className="text-[13px]  sm:text-[14px] text-[#5C5F79] font-bold">
              취소 정책
            </h3>

            <p
              className="text-[#5C5F79] text-[13px] sm:text-[14px] font-normal"
              dangerouslySetInnerHTML={{
                __html: (
                  translatedRules?.data?.data?.data?.translations?.[0]
                    ?.translatedText || description
                )
                  ?.split("*")
                  ?.map((el) => transformString(el?.trimStart()?.trimEnd()))
                  .join("<br/> -")
              }}
            />
          </div>

          {/* <div className='flex flex-col'>
        <h2 className='text-[14px] font-medium text-[#161A3F]'>할인 쿠폰</h2>

        <div className='flex flex-col sm:flex-row items-center my-[15px] sm:my-[26px] gap-4'>
          <Input
            className='w-full sm:w-[300px]'
            label='쿠폰 번호'
            placeholder='쿠폰 번호를 입력해 주세요'
          />
          <Button className='sm:mt-[26px] w-full  sm:w-[auto]'>
            쿠폰 확인
          </Button>
        </div>

        <h2 className='text-[14px] font-medium text-[#161A3F]'>
          결제 수단 선택
        </h2>

        <div className='flex mt-[15px] sm:mt-[26px] gap-[10px]'>
          {paymentTypes.map((payment, pidx) => (
            <button
              key={pidx}
              type='button'
              onClick={() => onChangePaymentType(payment.value)}
              className={classNames(
                'w-[160px] h-[48px] border border-solid border-gray-100 rounded-[10px] text-[14px] text-[#161A3F]',
                {
                  ['border-[#2D40FF] bg-[#2D40FF] text-white']:
                    payment.value === selectedPaymentType
                }
              )}
            >
              {payment.label}
            </button>
          ))}
        </div>
      </div> */}
        </div>
      </div>
    </>
  );
}
