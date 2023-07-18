import React, { useEffect } from "react";
import Sizes from "../../Body/mobile/Sizes";
import HTMLRenderer from "../../../helpers/HTMLRenderer";

const ItemDetailCard = ({
  details,
  product,
  setSelectedSize,
  selectedSize,
  setIsSizeRequired,
  showToast,
}) => {
  function getColor(offer_price, price) {
    const num = parseInt((offer_price * 100) / price);
    switch (true) {
      case 0 < num && num < 39:
        return "bg-green-600";
      case 38 < num && num < 74:
        return "bg-yellow-400";
      case 73 < num && num < 89:
        return "bg-orange-600";
      case 88 < num && num < 101:
        return "bg-red-600";
      default:
        return "";
    }
  }
  return (
    <div className="flex flex-col w-full min-h-[100%] relative gap-6">
      <div>
        <div className="py-5 flex items-center flex-shrink-0 flex-grow-0">
          <h1
            className="break-words w-full cm-goods-detail-title-1 leading-6 line-clamp-2"
            title="Faux Denim Shirt Collar Casual Loose Denim Dress"
          >
            {product?.name}
          </h1>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <span
                  className="text-red-600 font-[600] text-2xl"
                  id="custom-product-detail-price"
                >
                  {product?.offer_price_formatted}
                </span>
                <p className="flex justify-center items-center component__product-price-origin notranslate cm-goods-detail-price">
                  {product?.price_formatted}
                </p>{" "}
              </div>
              {(product?.offer_price * 100) / product?.price > 0 && (
                <div
                  className={`relative top-0 style_discountTag__LG3NB_mobile z-5 ${getColor(
                    product?.offer_price,
                    product?.price
                  )} `}
                >
                  <span
                    className={`style_discountTagInner__xrve6_mobile notranslate`}
                  >
                    -{parseInt((product?.offer_price * 100) / product?.price)} %
                  </span>
                </div>
              )}
            </div>
            <div className="empty:hidden">
              <div className="max-w-full flex relative justify-start items-center">
                <div className="max-w-full flex items-center"></div>
              </div>
              <Sizes
                showToast={showToast}
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={(selectedSize) =>
                  setSelectedSize(selectedSize)
                }
                setIsSizeRequired={(isSizeRequired) =>
                  setIsSizeRequired(isSizeRequired)
                }
              />
              <div className="max-w-full flex relative justify-start items-center">
                <div className="max-w-full flex items-center">
                  {details && <HTMLRenderer htmlContent={product?.details} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetailCard;
