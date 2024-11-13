import { useState } from "react";
import ChevronDownIcon from "@/assets/icons/chevron-up.svg?react";
import classNames from "classnames";
import useTranslate from "@/hooks/useTranslate";

const divideIntoColumns = (items, columns) => {
  const columnCount = Math.ceil(items.length / columns);
  const columnsArray = Array.from({ length: columns }, (_, columnIndex) =>
    items.slice(columnIndex * columnCount, (columnIndex + 1) * columnCount)
  );
  return columnsArray;
};

export const FacilityItem = ({ item }) => {
  const translatedItem = useTranslate(item);

  return (
    <>
      {translatedItem?.data?.data?.data?.translations?.[0]?.translatedText ||
        item}
    </>
  );
};

export function Facilities({ features, className, ...props }) {
  const [showMore, setShowMore] = useState(false);
  const _features = divideIntoColumns(
    showMore ? features : [...features]?.slice(0, 9),
    3
  );

  return (
    <div
      {...props}
      id="facilities"
      className={classNames(
        "border border-solid border-gray-100 rounded-[10px] sm:p-[30px] p-[12px] mt-[50px]",
        className
      )}
    >
      <p className="text-sm sm:text-[15px] font-medium">호텔 서비스</p>
      <div className="grid sm:grid-cols-3 grid-cols-3 gap-2 mt-4">
        {[..._features]?.map((feature, idx) => (
          <ul
            key={idx}
            className="col-span-1 flex flex-col gap-2 list-disc list-inside"
          >
            {feature.map((item) => (
              <li key={item} className="text-[11px] sm:text-sm text-[#5C5F79]">
                <FacilityItem item={item} />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {features?.length > 9 && (
        <div className="grid sm:grid-cols-3 grid-cols-3 gap-2 mt-4">
          <div />
          <div />
          <div className="w-full flex justify-start">
            {!showMore ? (
              <button
                className="flex items-center gap-3"
                onClick={() => setShowMore((prev) => !prev)}
              >
                <span>모두보기</span>{" "}
                <ChevronDownIcon
                  style={{
                    transform: "rotateZ(180deg)"
                  }}
                />
              </button>
            ) : (
              <button
                className="flex items-center gap-3"
                onClick={() => setShowMore((prev) => !prev)}
              >
                <span>숨기기</span> <ChevronDownIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
