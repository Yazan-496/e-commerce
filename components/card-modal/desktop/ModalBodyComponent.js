import React, { useEffect, useState } from "react";
import CarouselItemsCard from "./CarouselItems";
import ItemDetailCard from "./ItemDetailCard";
import { store } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalBodyComponent = ({
  setLoading,
  onClose,
  product,
  addToCart,
  showToast,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
}) => {
  const handleAddToCart = () => {
    setLoading(true);
    addToCart(product);
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="flex flex-col px-2 pb-[10px]  w-full max-h-[-webkit-fill-available] overflow-hidden">
      <div className="flex justify-between w-full h-full gap-6">
        <CarouselItemsCard product={product} />

        <div className="flex-1 w-[432px] max-h-[496px] relative">
          <ItemDetailCard
            product={product}
            showToast={showToast}
            selectedSize={selectedSize}
            setSelectedSize={(selectedSize) => setSelectedSize(selectedSize)}
            setIsSizeRequired={(isSizeRequired) =>
              setIsSizeRequired(isSizeRequired)
            }
          />
          <div className="flex justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-end">
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
            >
              <div className="inline-block truncate opacity-1 group-active:opacity-90">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-bold">
                  {t("user.add_to_cart")}
                </p>
              </div>
            </button>
            <button className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border h-12 px-3">
              <div className="inline-block truncate opacity-1 group-active:opacity-90">
                {t("user.buy_now")}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalBodyComponent;
