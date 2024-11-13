import classNames from "classnames";
import Skeleton from "react-loading-skeleton";

export function HotelHorizontalSkletonCard({ className }) {
  return (
    <>
      <div className={classNames("flex text-left gap-[37px]", className)}>
        <div className="h-[142px] sm:h-[137px] sm:w-[245px] relative">
          <Skeleton width="100%" height={137} />
        </div>

        <div className="sm:mt-5 mt-[10px] flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <p className="text-sm sm:text-lg font-bold more-dots-1 h-[32px] max-h-[32px] sm:h-auto sm:max-h-auto">
                <Skeleton width={200} height={20} />
              </p>

              <p className="text-lg text-[#333333]">
                <Skeleton width={100} height={20} />
              </p>
            </div>

            <p className="text-sm sm:text-base font-medium more-dots-1 h-[22px] max-h-[22px] sm:h-auto sm:max-h-auto">
              <Skeleton width={200} height={20} />
            </p>

            <p className="text-xs sm:text-base text-[#5C5F79] mt-1 leading-[18px] more-dots-1 max-h-[22px]">
              <Skeleton width={130} height={16} />
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <p className="text-lg">
                <Skeleton width={100} height={20} />
              </p>
              <p className="text-lg font-bold sm:text-[22px] sm:leading-[31px]">
                <Skeleton width={100} height={20} />
              </p>
            </div>

            <p className="text-lg">{">"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
