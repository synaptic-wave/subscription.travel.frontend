import { createPortal } from "react-dom";
import CloseIcon from "@/assets/icons/close.svg?react";
import classNames from "classnames";

export function Modal({
  open,
  onClose,
  title,
  className,
  children,
  disableCloseButton
}) {
  if (!open) return <></>;

  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#161A3F33] flex justify-center items-center z-20">
      <div className="px-5 py-[30px] sm:p-[30px] sm:min-w-[400px] max-w-[94%] flex flex-col bg-white rounded-[10px] gap-[26px]">
        <div className="w-full flex justify-between">
          <h2
            className="text-base sm:text-[20px] text-[#161A3F] font-medium"
            dangerouslySetInnerHTML={{
              __html: title
            }}
          />

          {!disableCloseButton && (
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </div>

        <div className={classNames("w-full max-w-[640px]", className)}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
