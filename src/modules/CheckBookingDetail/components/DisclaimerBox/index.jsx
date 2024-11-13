export default function DisclaimerBox({
  comments,
  cancellationPolicyComments
}) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[20px] font-medium text-[#161A3F]">중요한 정보</h2>

      <div className="flex flex-col mt-[26px]">
        <h3 className="text-[14px] text-[#5C5F79] font-bold">체크인 / 점검</h3>

        <p
          className="text-[#5C5F79] font-normal"
          dangerouslySetInnerHTML={{
            __html: comments
          }}
        />
      </div>

      <div className="flex flex-col mt-[26px]">
        <h3 className="text-[14px] text-[#5C5F79] font-bold">취소 정책</h3>

        <p
          className="text-[#5C5F79] font-normal"
          dangerouslySetInnerHTML={{ __html: cancellationPolicyComments }}
        />
      </div>
    </div>
  );
}
