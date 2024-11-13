import useHotelAvail from "@/hooks/useHotelAvail";
import { useGetHotelPreviews } from "@/services/target.service";
import { useMemo, useState } from "react";
import { TermsAndConditionsDialog } from "../TermsAndConditionsDialog";
import { Tabs } from "../Tabs";
import { useDispatch } from "react-redux";
import { commonActions } from "@/store/common/common.slice";
import { getDecodedHtml } from "@/utils/decodeString";
import { HotelsPreview } from "../HotelsPreview";

export function PreviewHotels({ section, isShowPrivacy }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [tab1, setTab1] = useState({});
  const onChangeTab1 = (value) => {
    setTab1(value);
  };

  const title = section.kr_title.split("#");

  const upTargetDestinations = useGetHotelPreviews({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: "order:asc",
      sectionId: section.id,
      populate: "markUpId"
    },

    queryParams: {
      enabled: true,
      onSuccess: (res) => {
        dispatch(commonActions.toggleUpdateServerModal(false));
        setTab1(res.results[0]);
      },
      onError: () => {
        dispatch(commonActions.toggleUpdateServerModal(true));
      }
    }
  });

  const hotelCodes = useMemo(() => {
    return (
      tab1?.hotel?.map((item) => ({
        JPCode: item.hotelCode,
        ...item.metaData
      })) || []
    );
  }, [tab1]);

  const {
    isSearching,
    isNotFound,
    closeSearchingModal,
    closeNotFoundModal,
    onChooseHotel
  } = useHotelAvail({ hotelCodes: [] });

  return (
    <>
      <HotelsPreview
        items={hotelCodes}
        hotels={upTargetDestinations?.data?.results?.[0]?.hotel}
        isSearching={isSearching}
        isOpenNotFound={isNotFound}
        setIsOpenNotFound={closeNotFoundModal}
        setIsSearching={closeSearchingModal}
        onChooseHotel={onChooseHotel}
        isLoading={upTargetDestinations.isLoading}
        markupImageUrl={tab1?.markUpId?.imageURL?.browser}
        mockHotels={tab1?.hotel}
        title2={title}
        tab={tab1}
        title={
          <div className="flex items-center justify-center gap-4">
            <h5
              className="text-lg sm:text-[28px] sm:leading-[36px] font-bold"
              dangerouslySetInnerHTML={{
                __html: getDecodedHtml(section.kr_title)
              }}
            ></h5>
            {isShowPrivacy && (
              <button
                onClick={() => setOpen(true)}
                className="text-sm border border-gray-100 rounded-[10px] py-[10px] px-[20px] whitespace-nowrap"
              >
                약관보기
              </button>
            )}
          </div>
        }
        tabs={
          <Tabs
            value={tab1}
            items={upTargetDestinations?.data?.results}
            onChange={onChangeTab1}
          />
        }
      />
      <TermsAndConditionsDialog isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
