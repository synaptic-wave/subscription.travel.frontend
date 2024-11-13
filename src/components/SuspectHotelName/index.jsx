import { searchService } from "@/services/search.service";
import { useQuery } from "react-query";

export const SuspectHotelName = ({ jpCode, defaultName }) => {
  const { data, isLoading } = useQuery(
    ["GET_TRANSLATED_HOTEL_NAME", jpCode],
    () =>
      searchService.getTranslatedHotelPortfolio({
        jp_codes: [jpCode],
        "request.page_size": 10,
        "request.page": 1
      })
  );

  if (isLoading) return <></>;

  if (
    !data ||
    !data?.data?.hits ||
    !data?.data?.hits?.length ||
    data?.data?.hits?.length === 0
  )
    return <>{defaultName}</>;

  return <>{data?.data?.hits?.[0]?.source?.kr_name}</>;
};
