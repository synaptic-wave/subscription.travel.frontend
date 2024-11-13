import food from "@/assets/images/food.png";

export function FoodCard({ name, address, img, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="h-[175px] sm:h-[220px] rounded-[10px] overflow-hidden">
        <img className="w-full h-full object-cover" src={img} />
      </div>
      <div className="mt-3 sm:mt-[31px]">
        <p className="text-[15px] sm:text-lg text-center">{name}</p>
        <p className="hidden sm:block text-[13px] text-[#5C5F79] text-center">
          {address}
        </p>
      </div>
    </div>
  );
}
