import { Dialog } from "@/components/index";
import NoRoomGif from "@/assets/gifs/no-room.gif";

export function NoRoomDialog({ isOpen, onClose }) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-[90%] sm:w-[500px] flex flex-col items-center justify-center py-[20px] sm:py-[50px] sm:px-[130px] px-[24px]"
    >
      <img
        className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
        src={NoRoomGif}
      />

      <p className="text-[16px] leading-[22px] sm:text-[20px] sm:leading-[30px] mt-[20px] text-center">
        검색한 조건에 맞는
        <br />
        객실을 찾지 못했습니다
      </p>
    </Dialog>
  );
}
