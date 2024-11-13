import country from "@/assets/images/country.png";
import { handleErrorOnImageLoad } from "@/consts/img";
import { useNavigate } from "react-router-dom";

export function Card({ item, itemId }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/recommended-travel-details?id=${itemId}`)}
    >
      <div className="sm:h-[200px] h-[167px]">
        <img
          className="h-full w-full object-cover rounded-[10px]"
          src={item.imageURL}
          onError={handleErrorOnImageLoad}
        />
      </div>
      <div className="mt-[11px] sm:mt-5 flex flex-col gap-[3px]">
        <p className="text-[15px] sm:text-lg font-medium">{item.kr_title}</p>
        <p className="hidden sm:block text-[13px] text-[#5C5F79]">
          {item.kr_address}
        </p>
        <p className="hidden sm:block text-[13px]">{item.kr_content}</p>
      </div>
    </div>
  );
}
