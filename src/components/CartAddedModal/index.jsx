import { commonActions } from "@/store/common/common.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dialog } from "..";
import CartGif from "@/assets/gifs/cart.gif";

export function CartAddedModal() {
  const isOpen = useSelector((state) => state.common.isOpenCartModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleModal = (value) => {
    dispatch(
      commonActions.toggleCartModal({
        isOpen: value
      })
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => toggleModal(false)}
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

      <div className="grid grid-cols-2 gap-[10px] mt-[20px] sm:mt-[38px]">
        <Button
          onClick={() => toggleModal(false)}
          size="sm"
          variant="secondary"
        >
          계속 구경하기
        </Button>
        <Button
          onClick={() => {
            navigate("/cart");
            toggleModal(false);
          }}
          size="sm"
        >
          장바구니 가기
        </Button>
      </div>
    </Dialog>
  );
}
