import CartGif from "@/assets/gifs/cart.gif";
import { Button, Dialog } from "..";

export function AddMultipleRoomModal({
  onAdd,
  isOpen,
  onClose,
  quantity,
  onChangeQuantity
}) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      withCloseButton={false}
      className="w-[90%] sm:w-[340px] py-[30px] sm:py-[40px] px-[25px] sm:px-[35px]"
    >
      <img
        src={CartGif}
        className="w-[110px] h-[110px] object-contain mx-auto"
      />
      <p className="text-center text-lg mt-[10px]">
        선택하신 상품을
        <br />
        장바구니에 담았습니다
      </p>
      <div className="flex items-center justify-between mt-[9px]">
        <p className="text-lg">객실 수량</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeQuantity()}
            className="flex min-w-[30px] h-[30px] border border-[#EAEAF4] rounded-full"
          >
            <MinusIcon />
          </button>
          <div className="border-[#EAEAF4] border rounded-[10px] py-[6px] w-[67px] px-[7px] text-sm text-[#A3A5B8] text-right">
            {quantity}
          </div>
          <button
            onClick={() => onChangeQuantity("+")}
            className="flex min-w-[30px] h-[30px] border border-[#EAEAF4] rounded-full"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-[20px]" onClick={onAdd} size="sm">
          장바구니 담기
        </Button>
      </div>
    </Dialog>
  );
}

function MinusIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7.70001"
        y="14.2998"
        width="14.6"
        height="1.4"
        rx="0.5"
        fill="black"
        stroke="#EAEAF4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7.7"
        y="14.2998"
        width="14.6"
        height="1.4"
        rx="0.5"
        fill="black"
        stroke="#EAEAF4"
      />
      <rect
        x="15.7"
        y="7.7002"
        width="14.6"
        height="1.4"
        rx="0.5"
        transform="rotate(90 15.7 7.7002)"
        fill="black"
        stroke="#EAEAF4"
      />
    </svg>
  );
}
