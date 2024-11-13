import IncIcon from "@/assets/icons/inc.svg?react";
import DecIcon from "@/assets/icons/dec.svg?react";

export function Counter({ value, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center w-[100px] justify-between">
      <button
        type="button"
        className="border-solid h-[30px] w-[30px] rounded-full border border-gray-100 flex items-center justify-center"
        onClick={onDecrement}
      >
        <DecIcon />
      </button>
      <p className="text-sm">{value}</p>
      <button
        type="button"
        className="border-solid h-[30px] w-[30px] rounded-full border border-gray-100 flex items-center justify-center"
        onClick={onIncrement}
      >
        <IncIcon />
      </button>
    </div>
  );
}
