import { SuspectHotelName } from "@/components/SuspectHotelName";
import { commentsLabels } from "@/consts/comments";

export default function BookInfo({ hotelPaxes }) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[20px] font-medium mb-[30px]">예약 정보</h2>
      <div className="flex flex-col gap-5">
        {hotelPaxes?.map((item, index) => (
          <div key={`${item.hotelName}-${index}`}>
            <h2 className="text-base font-medium">
              <SuspectHotelName
                jpCode={item?.paxes?.roomPaxes?.[0]?.hotelCode}
                defaultName={item.hotelName}
              />{" "}
            </h2>
            <div className="flex flex-wrap w-full gap-5 mt-[10px]">
              <div className="w-[48%]">
                <p className="text-[13px] text-[#5C5F79]">성(영문사용)</p>
                <p className="text-sm mt-[10px]">
                  {item.paxes.roomPaxes[0].passangers[0].surname}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="text-[13px] text-[#5C5F79]">이름(영문사용)</p>
                <p className="text-sm mt-[10px]">
                  {item.paxes.roomPaxes[0].passangers[0].name}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="text-[13px] text-[#5C5F79]">핸드폰</p>
                <p className="text-sm mt-[10px]">
                  {item.paxes.roomPaxes[0].passangers[0].phone}
                </p>
              </div>
              <div className="w-[48%]">
                <p className="text-[13px] text-[#5C5F79]">이메일</p>
                <p className="text-sm mt-[10px]">
                  {item.paxes.roomPaxes[0].passangers[0].email}
                </p>
              </div>

              <div className="w-[98%]">
                <p className="text-[13px] text-[#5C5F79]">특별 요청 사항</p>
                <p className="text-sm mt-[10px]">
                  {item.paxes.roomPaxes[0].comment
                    ?.split(". ")
                    ?.map((comm) => commentsLabels[comm] || comm)
                    ?.join(". ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
