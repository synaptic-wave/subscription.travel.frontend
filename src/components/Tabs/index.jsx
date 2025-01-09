import classNames from "classnames";

export default function Tabs({ elements, onChangeTab, activeIndex }) {
  return (
    <div className="flex items-center w-full justify-center">
      {elements.map((item, index) => (
        <div className="relative" onClick={() => onChangeTab(index)}>
          <button
            className={classNames(
              "py-[12px] px-[27px] text-lg font-medium",
              activeIndex === index ? "text-primary" : "text-grey"
            )}
          >
            {item.label}
          </button>
          {activeIndex === index && (
            <div className="absolute h-[1px] w-full bg-primary bottom-[-1px] left-0 right-0" />
          )}
        </div>
      ))}
    </div>
  );
}
