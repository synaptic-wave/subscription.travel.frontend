export function HotelDescription({ description }) {
  return (
    <div className="border border-solid border-gray-100 rounded-[10px] sm:p-[30px] p-[12px] mt-[20px]">
      <p className="sm:text-xl text-base font-medium">호텔 설명</p>
      <p
        className="sm:text-sm text-xs  text-[#5C5F79] mt-4"
        dangerouslySetInnerHTML={{
          __html: description
        }}
      />
    </div>
  );
}
