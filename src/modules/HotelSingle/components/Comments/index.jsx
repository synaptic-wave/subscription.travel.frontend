import image from "@/assets/images/comment.png";
import review1 from "@/assets/images/review1.png";
import review2 from "@/assets/images/review2.png";
import HBIcon from "@/assets/icons/hb.svg?react";
import ArrowMoreIcon from "@/assets/icons/arrow-more.svg?react";
import { useState } from "react";
import moment from "moment";

export function Comments({ data }) {
  const firstSlice = data?.[0];
  const otherSlices = data?.slice(1);

  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className="flex flex-col gap-3 mt-[20px]">
      <div className="rounded-[10px] border border-gray-100 border-solid">
        <Comment
          onToggleMore={() => setSeeMore((prev) => !prev)}
          data={firstSlice}
          commentsAmount={data?.length}
        />

        {seeMore &&
          otherSlices.map((review, idx) => <Comment key={idx} data={review} />)}
      </div>
    </div>
  );
}

const Comment = ({ data, onToggleMore, commentsAmount }) => {
  if (!data) return <></>;
  return (
    <div className="flex flex-col w-full">
      <div className="py-[21px] sm:p-[30px] p-[12px] flex items-center gap-[10px]">
        <img
          className="w-[40px] h-[40px] object-contain rounded-[20px]"
          src={data?.user?.avatar?.thumbnail || image}
        />
        <div className="">
          <p className="text-sm">
            {data?.user?.username}
            <span className="text-[#5C5F79]">
              이 리뷰를 작성했습니다.{" "}
              {moment(data.published_date).format("yyyy-MM-DD")}
            </span>
          </p>
          <p className="text-xs text-[#8D8FA2] mt-1">
            {/* 서울, 대한민국 · 294 포스팅 · 41개의 유용한 리뷰 평가 */}
            {data.user?.user_location?.name}
          </p>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-1">
        <img src={review1} className="w-full h-[128px] object-cover" />
        <img src={review2} className="w-full h-[128px] object-cover" />
        <img src={review1} className="w-full h-[128px] object-cover" />
      </div> */}
      <div className="py-[20px] sm:p-[30px] p-[12px]">
        <div className="flex items-center gap-[6px]">
          <HBIcon />
          <div className="flex items-center gap-[2px]">
            {Array.from(Array(data.rating).keys()).map((value) => (
              <div
                className="rounded-full w-[12px] h-[12px] bg-[#00AA6C] border border-[#00AA6C]"
                key={value}
              ></div>
            ))}

            {Array.from(Array(5 - data.rating).keys()).map((value) => (
              <div
                className="rounded-full w-[12px] h-[12px] bg-[#fff] border border-gray-100"
                key={value}
              ></div>
            ))}
          </div>
        </div>

        <p className="text-base font-[500] mt-[20px]">{data?.title}</p>
        <p className="text-sm mt-[10px]">{data?.text}</p>

        {onToggleMore && commentsAmount > 1 && (
          <button
            className="text-sm mt-[10px] flex items-center gap-1"
            onClick={onToggleMore}
          >
            리뷰 더보기
            <ArrowMoreIcon />
          </button>
        )}
      </div>
    </div>
  );
};
