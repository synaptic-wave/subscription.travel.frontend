import { handleErrorOnImageLoad } from "@/consts/img";
import { SearchDialog } from "@/modules/SearchResult/components/SearchDialog";
import { useCreateSession } from "@/services/search.service";
import { useGetGroupDestinations } from "@/services/target.service";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { DateObject } from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const paxes = [
  {
    roomId: 1,
    passangers: [
      {
        idPax: 1,
        age: 35
      },
      {
        idPax: 2,
        age: 35
      }
    ]
  }
];

export function CashbackHotels({ section }) {
  const { data, isLoading } = useGetGroupDestinations({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: "order:asc",
      sectionId: section.id,
      populate: "markUpId"
    },
    queryParams: {
      enabled: true
    }
  });

  const title = section.kr_title.split("#");
  const navigate = useNavigate();
  const createSession = useCreateSession();

  const onNavigateToSearchResult = async (item) => {
    const payload = {
      paxes: paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: "KR",
      checkInDate: moment().add(30, "days").format("yyyy-MM-DD"),
      checkOutDate: moment().add(31, "days").format("yyyy-MM-DD"),
      hotelCodes: item.hotelCode,
      destination: item.kr_location
    };

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/search?sessionId=${res.search_session_id}`);
      },
      onError: (err) => {
        toast.error("Error on checking hotel");
      }
    });
  };

  return (
    <>
      <div className="mt-[40px] sm:mt-[80px]">
        <h5 className="text-lg sm:text-[26px] font-medium mb-[20px] sm:mb-[30px]">
          {title[0]} <span className="text-primary-600">{title[1]}</span>
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-[27px]">
          {!isLoading &&
            data?.results?.map((item, index) => (
              <div
                className="relative sm:h-[300px] h-[182px] overflow-hidden rounded-[10px]"
                key={index}
                onClick={() => onNavigateToSearchResult(item)}
              >
                <img
                  className="sm:h-[300px] h-[182px] top-0 left-0 bottom-0 w-full object-cover right-0 absolute"
                  src={item.imageURL}
                  onError={handleErrorOnImageLoad}
                  alt={item.kr_location}
                />
                {item?.markUpId && (
                  <img
                    src={item.markUpId.imageURL.browser}
                    className="absolute left-0 top-0 w-[56px] h-[54px] object-contain"
                  />
                )}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%)"
                  }}
                  className="bottom-0 left-0 right-0 h-[150px] absolute"
                ></div>
                <div className="flex flex-col gap-[5px] absolute left-[10px] sm:left-[20px] sm:bottom-[30px] text-white bottom-[20px]">
                  <p className="text-base sm:text-[20px] font-[500]">
                    {item.kr_location}
                  </p>
                  <p className="text-[12px] sm:text-sm">{item.kr_content}</p>
                </div>
              </div>
            ))}
          {isLoading && (
            <>
              <Skeleton className="sm:h-[300px] h-[182px] rounded-[10px]" />
              <Skeleton className="sm:h-[300px] h-[182px] rounded-[10px]" />
              <Skeleton className="sm:h-[300px] h-[182px] rounded-[10px]" />
              <Skeleton className="sm:h-[300px] h-[182px] rounded-[10px]" />
            </>
          )}
        </div>
      </div>
      <SearchDialog isOpen={createSession.isLoading} />
    </>
  );
}
