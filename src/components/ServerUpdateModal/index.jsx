import { useDispatch, useSelector } from "react-redux";
import { Modal } from "..";
import updateImg from "@/assets/images/update.png";
import { commonActions } from "@/store/common/common.slice";

export const ServerUpdateModal = () => {
  const dispatch = useDispatch();

  const { isOpenUpdateServerModal } = useSelector((store) => store.common);

  const onClose = () => {
    dispatch(commonActions.toggleUpdateServerModal(false));
  };

  return (
    <Modal
      open={isOpenUpdateServerModal}
      onClose={onClose}
      title={`<span class="sm:text-[34px] text-[26px] sm:leading-[49px] leading-[37px] font-bold">Server Update</span><br /><span class="sm:text-[34px] text-[26px] sm:leading-[49px] leading-[37px] font-medium">서버업데이트</span>`}
      disableCloseButton={true}
    >
      <div className="w-full flex flex-col">
        <p className="text-[#161A3F] text-[13px] font-normal">
          현재 새로운 기능을 제공해 드리기 위해 서버 업데이트 중입니다. 몇 분
          후에 웹사이트를 다시 확인해 주시기 바랍니다. 이용에 불편을 드려
          죄송합니다!
        </p>

        <p className="text-[#9193A6] font-normal mt-[10px]">
          Our server is currently updating to bring you exciting new features.
          Please check our website again in a few minutes.
        </p>

        <div className="w-full flex justify-center mt-[35px]">
          <img
            src={updateImg}
            alt="update server"
            className="sm:w-[420px] w-full sm:h-[292px] h-[222px] object-contain"
          />
        </div>
      </div>
    </Modal>
  );
};
