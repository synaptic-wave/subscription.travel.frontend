import _img from "@/assets/images/defaultRoom.jpg";

export const defaultImg = _img;

export const handleErrorOnImageLoad = ({ currentTarget }) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = defaultImg;
};
