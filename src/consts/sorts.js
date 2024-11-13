export const sortKeys = {
  PRICE_ASC: "priceAscending",
  PRICE_DESC: "priceDescending",
  CATEGORY_ASC: "categoryAsc",
  CATEGORY_DESC: "categoryDesc",
  NAME_AZ: "nameAZ",
  NAME_ZA: "nameZA",
  RECOMMENDATION: "Recomended"
};

export const sortLabels = {
  [sortKeys.PRICE_ASC]: "가격 낮은 순",
  [sortKeys.PRICE_DESC]: "가격 높은 순",
  [sortKeys.CATEGORY_ASC]: "평점 높은 순",
  [sortKeys.RECOMMENDATION]: "추천 호텔 순",
  // [sortKeys.CATEGORY_DESC]: "평점 높은 순 DESC",
  [sortKeys.NAME_AZ]: "호텔 이름 오름차순",
  [sortKeys.NAME_ZA]: "호텔 이름 내림차순"
};

export const sortArrays = [
  {
    key: sortKeys.RECOMMENDATION,
    label: sortLabels[sortKeys.RECOMMENDATION]
  },
  {
    key: sortKeys.PRICE_ASC,
    label: sortLabels[sortKeys.PRICE_ASC]
  },
  {
    key: sortKeys.PRICE_DESC,
    label: sortLabels[sortKeys.PRICE_DESC]
  },

  // {
  //   key: sortKeys.CATEGORY_ASC,
  //   label: sortLabels[sortKeys.CATEGORY_ASC]
  // },
  // {
  //   key: sortKeys.CATEGORY_DESC,
  //   label: sortLabels[sortKeys.CATEGORY_DESC]
  // },
  {
    key: sortKeys.NAME_AZ,
    label: sortLabels[sortKeys.NAME_AZ]
  },
  {
    key: sortKeys.NAME_ZA,
    label: sortLabels[sortKeys.NAME_ZA]
  }
];
