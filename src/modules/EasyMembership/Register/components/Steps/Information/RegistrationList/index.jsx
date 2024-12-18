export const RegistrationList = ({ items, onSelect }) => {
  return (
    <div className="w-full flex items-center mt-[110px] gap-4 flex-col min-h-[60vh]">
      {items.map((item, idx) => (
        <button
          key={idx}
          className="w-100% w-[375px] px-4 py-3 border border-[#EAEAF4] flex items-center justify-center relative"
          onClick={() => onSelect(item.value)}
        >
          <span className="absolute left-4">{item.icon}</span>
          <span className="text-[15px] font-normal">{item.name}</span>
        </button>
      ))}
    </div>
  );
};
