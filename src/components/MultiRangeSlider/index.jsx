import useDebounce from "@/hooks/useDebouce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";

export function MultiRangeSlider({
  min,
  max,
  onChange,
  label,
  valMin,
  valMax
}) {
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const [newMinVal, setNewMinVal] = useState();
  const [newMaxVal, setNewMaxVal] = useState();

  const debouncedMinVal = useDebounce(newMinVal, 600);
  const debouncedMaxVal = useDebounce(newMaxVal, 600);

  useEffect(() => {
    if (!debouncedMinVal) return;
    onChange(debouncedMinVal, valMax);
  }, [debouncedMinVal]);

  useEffect(() => {
    if (!debouncedMaxVal) return;
    onChange(valMin, debouncedMaxVal);
  }, [debouncedMaxVal]);

  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(newMinVal);
    const maxPercent = getPercent(maxValRef.current || newMaxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [newMinVal, getPercent, newMaxVal, min, max]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current || newMinVal);
    const maxPercent = getPercent(newMaxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [newMaxVal, getPercent, newMinVal]);

  useEffect(() => {
    setNewMinVal(valMin || min);
    setNewMaxVal(valMax || max);
  }, [min, valMin, valMax, max]);

  return (
    <div className="w-full flex flex-col gap-5 overflow-hidden h-[160px] sm:px-3">
      <span className="text-sm sm:text-base text-[#161A3F] font-medium">
        {label}
      </span>
      <div className="w-full relative">
        <input
          type="range"
          min={min}
          max={max}
          value={newMinVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), valMax - 1);

            minValRef.current = value;
            setNewMinVal(value);
          }}
          className="thumb thumb--left"
          style={{ zIndex: valMin > max - 100 && "5" }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={Number(newMaxVal)}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), valMin + 1);
            setNewMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8D8FA2] mb-2">최소</span>
              <NumericFormat
                displayType="input"
                thousandSeparator
                value={newMinVal}
                min={min}
                max={max}
                suffix="원"
                className="w-[120px] h-[40px] border border-solid border-gray-100 rounded-[10px] p-[10px]"
                onChange={(e) => {
                  const newVal = Number(
                    e.target.value.replace("원", "").replaceAll(",", "")
                  );

                  if (!(newVal >= min)) return setNewMinVal(min);

                  setNewMinVal(newVal);
                }}
              />
            </div>
          </div>
          <div className="slider__right-value">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8D8FA2] mb-2">최대</span>
              <NumericFormat
                displayType="input"
                thousandSeparator
                value={newMaxVal}
                min={min - 1}
                max={max + 1}
                minLength={min - 1}
                maxLength={max + 1}
                suffix="원"
                className="w-[120px] h-[40px] border border-solid border-gray-100 rounded-[10px] p-[10px]"
                onChange={(e) => {
                  const newVal = Number(
                    e.target.value.replace("원", "").replaceAll(",", "")
                  );

                  if (!(newVal <= max)) return setNewMaxVal(max);

                  setNewMaxVal(newVal);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
