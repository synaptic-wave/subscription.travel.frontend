import classNames from "classnames";
import { forwardRef } from "react";

export const Input = forwardRef(
  (
    { label, name, onChange, value, htmlFor, errors, inputRef, ...props },
    ref
  ) => {
    return (
      <label htmlFor={htmlFor} className="flex flex-col w-full gap-[6px]">
        <span className="text-[14px] text-[#5C5F79]">{label}</span>
        <input
          id={htmlFor}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
          className={classNames(
            "h-[45px] rounded-[5px] border border-solid border-[#e7e7ee] bg-[transparent] text-[14px] font-normal px-2",
            props.className
          )}
        />
        {errors && errors[name] && (
          <span className="text-[12px] text-[#ff3838]">
            {errors[name].message}
          </span>
        )}
      </label>
    );
  }
);
