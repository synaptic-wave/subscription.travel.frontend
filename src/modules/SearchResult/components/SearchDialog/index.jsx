import { Dialog } from "@/components/index";
import SearchGif from "@/assets/gifs/search.gif";

export function SearchDialog({ isOpen, onClose }) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      withCloseButton={false}
      className="w-[90%] sm:w-[500px] flex flex-col items-center justify-center py-[20px] sm:py-[50px] sm:px-[130px] px-[24px]"
    >
      <img
        className="w-[60px] h-[110px] sm:w-[110px] sm:h-[110px] object-contain"
        src={SearchGif}
      />

      <p className="text-[16px] leading-[22px] sm:text-[20px] sm:leading-[30px] mt-[20px] text-center">
        잠시만 기다려주세요.
        <br />
        최저가를 검색하고 있습니다.
      </p>
    </Dialog>
  );
}
