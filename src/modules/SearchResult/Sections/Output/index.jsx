import NotAvailableHotelCard from "@/components/HotelCards/NotAvailable";
import { HeaderHotelsResult } from "./Header";
import { ViewHotelsResult } from "./View";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useWishlistItem } from "@/hooks/useWishlist";

export function OutputHotels({
  view,
  hotels,
  paxes,
  isLoading,
  passengers,
  checkIn,
  setView,
  checkOut,
  sessionId,
  notAvailableHotel,
  onCheckRatePlanCode,
  useMeridianToView,
  isLoadingCheckRate,
  toggleMobileSearch,
  checkingRate,
  sort,
  locations,
  setSort,
  destinationName,
  onChooseHotel,
  totalHotelsCount,
  onNextLoadHotels,
  hasMore,
  isVisibleSort,
  isLastPage,
  nationality,
  toggleFilter,
  isVisibleSearchBox = true,
  isVisibleFilter = true,
  children
}) {
  const [wishlist, handleToggleWishlist] = useWishlistItem();
  return (
    <div className="w-full flex flex-col">
      {isVisibleSearchBox && (
        <button
          className="w-full sm:hidden bg-[#F3F3FB] p-4 rounded-[10px] flex gap-4 mb-[30px]"
          onClick={toggleMobileSearch}
        >
          <div className="svgStrokeGray mt-1">
            <SearchIcon />
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm text-[#161A3F] font-medium text-left">
              {destinationName}
            </h3>
            <div className="flex text-[13px] text-[#5C5F79]">
              <p>
                {checkIn} ~ {checkOut}
              </p>{" "}
              |{" "}
              <p>
                객실{paxes?.length}, 인원 {passengers}
              </p>
            </div>
          </div>
        </button>
      )}

      {notAvailableHotel && (
        <>
          <NotAvailableHotelCard
            hotelContent={notAvailableHotel}
            hotelCode={notAvailableHotel?.attributes?.JPCode}
            onChooseHotel={onChooseHotel}
            wishlist={wishlist}
            handleToggleWishlist={handleToggleWishlist}
          />

          <div className="w-full h-[1px] bg-[#EAEAF4] mt-7 mb-5"></div>

          <div className="w-full h-[60px] bg-[#F8F8FC] border border-[#EAEAF4] rounded-[5px] flex items-center px-[17px] gap-[11px] mb-4">
            <p className="text-xl font-medium ">이 호텔은 어떠세요?</p>
            <span className="text-base font-normal text-[#2D40FF]">
              예약 가능한 비슷한 숙박시설을 추천합니다.
            </span>
          </div>
        </>
      )}

      <HeaderHotelsResult
        sort={sort}
        view={view}
        setView={setView}
        setSort={setSort}
        isVisibleSort={isVisibleSort}
        toggleFilter={toggleFilter}
        isVisibleFilter={isVisibleFilter}
      />
      {children}
      <ViewHotelsResult
        onChooseHotel={onChooseHotel}
        isLoading={isLoading}
        view={view}
        hotels={hotels}
        checkIn={checkIn}
        isLastPage={isLastPage}
        checkOut={checkOut}
        locations={locations}
        sessionId={sessionId}
        onCheckRatePlanCode={onCheckRatePlanCode}
        isLoadingCheckRate={isLoadingCheckRate}
        checkingRate={checkingRate}
        totalHotelsCount={totalHotelsCount}
        onNextLoadHotels={onNextLoadHotels}
        hasMore={hasMore}
        paxes={paxes}
        nationality={nationality}
        useMeridianToView={useMeridianToView}
      />
    </div>
  );
}
