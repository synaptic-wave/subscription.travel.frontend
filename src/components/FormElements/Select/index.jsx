import ReactSelect from "react-select";
import classNames from "classnames";

const getStyleSelectBySize = ({ size, leftIcon }) => {
  if (size === "md") {
    return {
      controlStyle: {
        minHeight: "24px",
        borderRadius: "10px",
        height: "48px"
      },
      valueContainerStyle: {
        padding: leftIcon ? "14px 12px 14px 44px" : "14px 12px 14px 12px"
      }
    };
  }
  if (size === "sm") {
    return {
      controlStyle: {
        minHeight: "24px",
        borderRadius: "10px",
        height: "40px"
      },
      valueContainerStyle: {
        padding: leftIcon ? "8px 16px 8px 44px" : "9px 16px 9px 16px"
      }
    };
  }
  return {};
};

export function Select({
  className = "",
  name,
  required = false,
  onChange,
  value,
  components,
  placeholder,
  leftIcon,
  fullWidth = false,
  error,
  onFocus,
  label,
  disabled,
  size = "md",
  isSearchable,
  containerProps = {},
  ...restProps
}) {
  const { controlStyle, valueContainerStyle } = getStyleSelectBySize({
    size,
    leftIcon
  });

  return (
    <div className={className}>
      {!!label && (
        <label className="text-[13px] text-[#5C5F79] mb-[6px] block">
          {label}
        </label>
      )}
      <div
        {...containerProps}
        className={classNames(
          "relative transition-all ease-in-out rounded-[10px] w-full outline outline-1 outline-gray-100",
          !disabled && "hover:outline-primary-600",
          containerProps.className
        )}
      >
        {!!leftIcon && (
          <span
            onClick={onFocus}
            className="absolute left-[12px] top-[13px] z-10"
          >
            {leftIcon}
          </span>
        )}
        <ReactSelect
          {...restProps}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          isSearchable={isSearchable}
          components={{
            IndicatorSeparator: () => null,
            ...components
          }}
          isDisabled={disabled}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              borderRadius: "10px"
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "none",
              boxShadow: "none",
              minHeight: "24px",
              width: "100%",
              borderRadius: "10px",
              height: "48px",
              background: state.isDisabled ? "#fafafa" : "#fff",
              ...controlStyle
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: leftIcon ? "14px 12px 14px 44px" : "13px 12px 13px 12px",
              ...valueContainerStyle,
              input: {
                margin: 0,
                padding: 0,
                fontSize: "14px",
                lineHeight: "20px"
              }
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "#A3A5B8",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "400",
              margin: 0,
              opacity: 1
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
              borderRadius: "10px",
              overflow: "hidden"
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
              fontSize: "14px",
              lineHeight: "20px"
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              fontWeight: 400,
              color: "#161a3f",
              fontSize: "14px",
              lineHeight: "20px"
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              fontWeight: 400,
              color: "#161a3f",
              fontSize: "14px",
              lineHeight: "20px",
              background: state.isSelected ? "#dbeafe" : "#fff"
            }),
            indicatorsContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0!important"
            })
          }}
        />
      </div>
      {error && (
        <span className="text-xs mt-[5px] text-[#ff0000] block">
          {error.message}
        </span>
      )}
    </div>
  );
}
