export const commentsKeys = {
  highFloorRoom: "I want a high floor room", //: "고층 객실을 원합니다.",
  quietRoom: "I want a quiet room", //: "조용한 객실을 원합니다.",
  twinBeds: "I want twin beds", // "트윈베드를 원합니다.",
  needACot: "Need a cot", //: "간이 침대 필요",
  nonSmokingRooms: "Non-smoking rooms", //: "금연 객실",
  smokingAllowedRooms: "Smoking allowed rooms", //: "흡연 가능 객실",
  lateCheckin: "Late check-in" //: "늦은 체크인"
};
export const commentsLabels = {
  [commentsKeys.highFloorRoom]: "고층 객실을 원합니다",
  [commentsKeys.quietRoom]: "조용한 객실을 원합니다",
  [commentsKeys.twinBeds]: "트윈베드를 원합니다",
  [commentsKeys.needACot]: "간이 침대 필요",
  [commentsKeys.nonSmokingRooms]: "금연 객실",
  [commentsKeys.smokingAllowedRooms]: "흡연 가능 객실",
  [commentsKeys.lateCheckin]: "늦은 체크인"
};

export const commentsArray = [
  {
    label: commentsLabels[commentsKeys.highFloorRoom],
    value: commentsKeys.highFloorRoom
  },
  {
    label: commentsLabels[commentsKeys.quietRoom],
    value: commentsKeys.quietRoom
  },
  {
    label: commentsLabels[commentsKeys.twinBeds],
    value: commentsKeys.twinBeds
  },
  {
    label: commentsLabels[commentsKeys.needACot],
    value: commentsKeys.needACot
  },
  {
    label: commentsLabels[commentsKeys.nonSmokingRooms],
    value: commentsKeys.nonSmokingRooms
  },
  {
    label: commentsLabels[commentsKeys.smokingAllowedRooms],
    value: commentsKeys.smokingAllowedRooms
  },
  {
    label: commentsLabels[commentsKeys.lateCheckin],
    value: commentsKeys.lateCheckin
  }
];
