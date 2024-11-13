export const sortTypes = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none"
};

export const viewTypes = {
  GRID: "grid",
  ROW: "row",
  MAP: "map"
};

export const types = [viewTypes.ROW, viewTypes.GRID, viewTypes.MAP];

export const sorts = [
  {
    label: "By decrease",
    value: sortTypes.DESC
  },
  {
    label: "By increase",
    value: sortTypes.ASC
  },
  {
    label: "Sort",
    value: sortTypes.NONE
  }
];

export const paymentType = {
  CARD: "CARD",
  CULTURE_CASH: "GIFT_CULT"
};

export const paymentTypes = [
  {
    label: "신용카드/간편결제",
    value: paymentType.CARD
  },
  {
    label: "컬쳐캐쉬",
    value: paymentType.CULTURE_CASH
  }
];

export const promocodeTypeId = "67284dfcaa08813b79de2db0";
