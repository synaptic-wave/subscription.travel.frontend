import classNames from "classnames";
import { Select } from "../Select";
import LocationIcon from "@/assets/icons/location.svg?react";

const customFilterOption = () => true;

export function AutoComplete({
  icon = <LocationIcon />,
  placeholder = "목적지를 입력해 주세요",
  name = "select",
  label = "목적지",
  components = {},
  isSearchable = true,
  dropDownIndicator = null,
  ...props
}) {
  const onFocus = () => {
    const element = document.getElementById("input-select");

    if (element) {
      // element.focus();
    }
  };

  return (
    <Select
      isClearable={true}
      {...props}
      className={classNames("w-full ", props.className)}
      name={name}
      inputProps={{
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: "off"
      }}
      label={label}
      isSearchable={isSearchable}
      onFocus={onFocus}
      filterOption={customFilterOption}
      components={{
        ...components,
        DropdownIndicator: dropDownIndicator
      }}
      placeholder={placeholder}
      leftIcon={icon}
      fullWidth
    />
  );
}
