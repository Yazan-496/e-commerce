import React from "react";
import { SvgCheckbox } from "../../../svgs";
import { useTranslation } from "react-i18next";
import Link from "../../../../helpers/Link";

const ButtonCheckout = ({
  total,
  selected,
  setSelectAll,
  selectAll,
  items,
  saved,
  shippingCart,
  isMobile,
}) => {
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="flex flex-col justify-start items-center bottom-0 gap-4 px-4  bg-white relative z-10 border-t border-[#00000014]">
      <div className="p-2 w-full justify-center items-center flex flex-col gap-2">
        <div className=" flex justify-end">
          <span className="text-[14px] leading-[18px] text-[#5d626a]">
            {t("user.save")}:{" "}
            <span className="notranslate">
              {shippingCart?.total_discount_on_product || 0}{" "}
              {t("header.language.aed")}
            </span>
          </span>
        </div>
        <div className="  flex-grow-0 flex-shrink-0 relative">
          <div className="hidden flex justify-start items-center h-8 relative gap-2">
            <div
              onClick={() => setSelectAll(!selectAll)}
              className="w-[20px] h-[20px]"
            >
              <SvgCheckbox click={selected === items?.length} />
            </div>
            <p className="flex-grow text-[16px] leading-[18px] text-left text-[#31353c]">
              Selected&nbsp;
              <span className="notranslate">({selected || 0})</span>
            </p>
          </div>
          <div className="flex-1 overflow-hidden flex justify-end gap-1">
            <span className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#31353c]">
              {t("user.total")}:
            </span>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-red-600 notranslate">
                {shippingCart?.total || 0} {t("header.language.aed")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-2">
        <Link href="/payment-method">
          <button className="cm-btn-primary flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-11 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-[#F2F2F3] disabled:text-[#CED0D3] disabled:cursor-not-allowed">
            <p className="text-[18px] leading-[21px] font-bold">
              {t("user.checkout")}
            </p>
          </button>
        </Link>
        {isMobile ? null : (
          <Link href="/shipping-bag">
            <button className="cm-btn-primary border border-[var(--cm-color-primary-btn-bg)] text-[var(--cm-color-primary-btn-bg)] bg-white flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-11 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-white disabled:text-[#CED0D3] disabled:cursor-not-allowed">
              <p className="text-[18px] leading-[21px] font-bold">
                {t("user.view_cart")}
              </p>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default ButtonCheckout;
