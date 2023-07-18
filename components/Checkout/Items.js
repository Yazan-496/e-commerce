import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SvgCheckbox } from "../svgs";
import CountFlashSale from "../Body/desktop/CountFlashSale";
import { Swiper } from "swiper/react";
import { useTranslation } from "react-i18next";

const Items = ({ items, shippingCart }) => {
  const checkRef = useRef([]);
  const [check, setCheck] = useState(true);
  const [limitFree, setLimitFree] = useState(shippingCart?.limitFree || 0);
  let checkedItems = useSelector((store) => store.CartReducer.items);
  const dispatch = useDispatch();
  const handleCheck = (i, item) => {
    if (checkRef?.current) {
      checkRef.current[i] = !checkRef.current[i];
      // Get checked items
      const checkedItems = items.filter(
        (item, index) => checkRef.current[index]
      );
    }
    setCheck(!check);
    handleCheckedItems(item);
  };

  const handleCheckedItems = (item) => {
    if (checkedItems?.indexOf(item) !== -1) {
      checkedItems?.splice(checkedItems.indexOf(item), 1);
    } else {
      checkedItems.push(item);
    }
  };

  const handleDeleteFromCart = (item, i) => {
    // if (typeof window !== "undefined") {
    //   items.splice(items.indexOf(item), 1);
    //   localStorage.setItem("ADD_TO_CART", JSON.stringify(items));
    // }
    dispatch({ type: "DELETE_FROM_CART", payload: { id: item.id } });
  };

  const [totalPrices, setTotalPrices] = useState({});
  const [totalSaved, setTotalSaved] = useState({});
  const [Quantities, setQuantities] = useState({});
  const handleQuantityChange = useCallback((quant, item) => {
    if (quant > 0) {
      dispatch({
        type: "UPDATE_ITEM_IN_CART",
        payload: { id: item.id, quantity: quant },
      });
      const quantity = parseInt(quant);
      const price = item.offer_price;
      const oldPrice = item.price_num - item.offer_price;
      const newTotalPrice = (quantity * price).toFixed(1);
      const newOldPrice = (quantity * oldPrice).toFixed(1);

      setTotalPrices((prevState) => ({
        ...prevState,
        [item.id]: newTotalPrice,
      }));
      setTotalSaved((prevState) => ({
        ...prevState,
        [item.id]: newOldPrice,
      }));
      setQuantities((prevState) => ({
        ...prevState,
        [item.id]: quantity,
      }));
    }
  }, []);
  useEffect(() => {
    if (items) {
      const defaultTotalPrices = {};
      const defaultQuantities = {};
      const defaultOldPrice = {};

      items.forEach((item, i) => {
        handleCheck(i, item);
        const quantity = item.quantity || 1;
        const price = item.offer_price;
        const oldPrice = item.price_num - item.offer_price;
        const newTotalPrice = (quantity * price).toFixed(1);
        const newOldPrice = (quantity * oldPrice).toFixed(1);
        const newQuantities = quantity;

        defaultTotalPrices[item.id] = newTotalPrice;
        defaultOldPrice[item.id] = newOldPrice;
        defaultQuantities[item.id] = newQuantities;
      });

      setTotalPrices(defaultTotalPrices);
      setTotalSaved(defaultOldPrice);
      setQuantities(defaultQuantities);
    }
  }, []);
  useEffect(() => {
    items?.map((item) => {
      const quantity = Quantities[item.id];
      // handleQuantityChange(quantity, item);
    });
  }, [items, handleQuantityChange]);
  useEffect(() => {
    const totalPriceSum = Object.values(totalPrices).reduce(
      (sum, price) => sum + parseFloat(price),
      0
    );
    const totalSavedSum = Object.values(totalSaved).reduce(
      (sum, price) => sum + parseFloat(price),
      0
    );
    const totalFormatted = totalPriceSum.toFixed(1);
    const savedFormatted = totalSavedSum.toFixed(1);
    // setTotal(totalFormatted);
    // setSaved(savedFormatted);

    const limit =
      limitFree - totalFormatted < 0 ? 0.0 : limitFree - totalFormatted;
    // setPriceForFree(limit.toFixed(1));
  }, [totalPrices]);

  const { t, i18n } = useTranslation("translation");
  const getQuantityById = (id) => {
    const item = items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };
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
    <div className="slider-cart-item bg-white w-full relative">
      {items?.length > 0 &&
        items.map((item, i) => {
          return (
            <div
              key={i}
              className={`
               ${
                 i === items?.length - 1 ? "pb-[40px]" : ""
               } w-full py-10 border-y-2 border-t-0 flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4
              `}
            >
              <div
                onClick={() => handleCheck(i, item)}
                ref={checkRef}
                key={i}
                className="hidden flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-[5%] relative"
              >
                <div key={i}>
                  <SvgCheckbox
                    click={checkRef?.current && checkRef?.current[`${i}`]}
                  />
                </div>
              </div>
              <div className="flex w-full flex-wrap gap-x-4">
                <div className="w-full flex gap-3 justify-center">
                  <div className=" flex-wrap flex-shrink-0 w-[102px] h-[136px] relative bg-[#ebebeb]">
                    {
                      <div
                        className={`style_discountTag__LG3NB_small z-10 ${getColor(
                          item.offer_price,
                          item.price_num
                        )} `}
                      >
                        <span
                          className={`style_discountTagInner__xrve6_small notranslate`}
                        >
                          -{parseInt((item.offer_price * 100) / item.price_num)}
                          %
                        </span>
                      </div>
                    }
                    <a target="_blank">
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "block",
                          overflow: "hidden",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: "absolute",
                          inset: 0,
                        }}
                      >
                        <img
                          alt="Plain Crew Neck Loose Elegant Dress"
                          sizes="100vw"
                          src={item.thumbnail ?? ""}
                          decoding="async"
                          data-nimg="fill"
                          style={{
                            position: "absolute",
                            inset: 0,
                            boxSizing: "border-box",
                            padding: 0,
                            border: "none",
                            margin: "auto",
                            display: "block",
                            width: 0,
                            height: 0,
                            minWidth: "100%",
                            maxWidth: "100%",
                            minHeight: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                        {item?.flash_deal_details && (
                          <CountFlashSale Upper={true} pro={item} />
                        )}
                      </span>
                    </a>
                  </div>
                  <div className="w-full flex-wrap flex justify-between ">
                    <div className="flex gap-x-10 w-full h-full justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                      <div className="w-[62%] flex-col h-full flex w-full justify-between items-start self-stretch gap-3">
                        <a
                          target="_blank"
                          title="Plain Crew Neck Loose Elegant Dress"
                          className="w-full flex-grow text-[12px] font-normal leading-[20px] whitespace-normal  text-left text-[#31353C]"
                        >
                          {item.name ?? ""}
                        </a>

                        <p className="flex-grow-0 flex-shrink-0 text-base leading-[24px] font-bold text-left text-[#31353C]">
                          {item.variations?.Size ?? ""}
                        </p>
                        <div className="h-[50%] w-full bottom-0 flex justify-between items-end flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                          <div className="truncate w-[50%] flex space-x-1">
                            <span className="flex items-center text-[12px] text-red-600 cm-list-price notranslate text-[#868C93]">
                              {item.offer_price_formatted}
                            </span>
                            <span className="flex items-center line-through text-[10px] text-[#868C93]">
                              {item?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[25%]  flex">
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="flex w-full justify-between items-center relative notranslate">
                            <div className="flex w-full flex-grow-0 flex-shrink-0 relative rounded-l-[5px] h-[28px]">
                              <div
                                onClick={(e) =>
                                  handleQuantityChange(
                                    Quantities[item.id] > 1
                                      ? Quantities[item.id] - 1
                                      : Quantities[item.id],
                                    item
                                  )
                                }
                                className="flex w-[33%] justify-center items-center bg-white border-[1.25px] border-[#868c93] cursor-pointer rounded-l-[5px]"
                              >
                                <svg
                                  viewBox="0 0 31 30"
                                  fill="#222222"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={15}
                                  height={15}
                                >
                                  <path d="M23 15.938h.938v-1.876H23v1.876ZM8 14.062h-.938v1.876H8v-1.876Zm15 0H8v1.876h15v-1.876Z" />
                                </svg>
                              </div>
                              <div className="flex w-[50%] justify-center items-center bg-white border-[1.25px] border-[#868c93] border-x-0 overflow-hidden">
                                <input
                                  className="pl-3 text-center text-[#31353c] leading-none border-none outline-none h-full rounded-l-[5px] text-base"
                                  type="number"
                                  id="quantity"
                                  min={1}
                                  max={199}
                                  disabled
                                  value={getQuantityById(item.id)}
                                  onChange={(e) =>
                                    handleQuantityChange(e?.target?.value, item)
                                  } // Pass the item object to the handler
                                />
                              </div>
                              <div
                                onClick={(e) =>
                                  handleQuantityChange(
                                    Quantities[item.id] + 1,
                                    item
                                  )
                                }
                                className="flex w-[33%] justify-center items-center bg-white border-[1.25px] border-[#868c93] cursor-pointer rounded-r-[5px]"
                              >
                                <svg
                                  viewBox="0 0 31 30"
                                  fill="#222222"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={12}
                                  height={12}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.438 7.5v-.938h-1.875V14.063H7.062v1.874H14.563V23.438h1.874V15.937H23.938v-1.874H16.437V7.5Z"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteFromCart(item, i)}
                            className="p-0 mr-3 flex items-center"
                          >
                            <svg
                              width={28}
                              height={28}
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width={28}
                                height={28}
                                rx={4}
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.0417 8.66593C10.0417 7.40028 11.0677 6.37427 12.3333 6.37427H15.6667C16.9323 6.37427 17.9583 7.40028 17.9583 8.66593V9.41626H20.875C21.2202 9.41626 21.5 9.69608 21.5 10.0413C21.5 10.3864 21.2202 10.6663 20.875 10.6663H7.125C6.77982 10.6663 6.5 10.3864 6.5 10.0413C6.5 9.69608 6.77982 9.41626 7.125 9.41626H10.0417V8.66593ZM16.7083 8.66593V9.41626H11.2917V8.66593C11.2917 8.09064 11.758 7.62427 12.3333 7.62427H15.6667C16.242 7.62427 16.7083 8.09064 16.7083 8.66593ZM9.625 11.8324C9.625 11.4873 9.34518 11.2074 9 11.2074C8.65482 11.2074 8.375 11.4873 8.375 11.8324V19.3324C8.375 20.5981 9.40101 21.6241 10.6667 21.6241H17.3333C18.599 21.6241 19.625 20.5981 19.625 19.3324V11.8324C19.625 11.4873 19.3452 11.2074 19 11.2074C18.6548 11.2074 18.375 11.4873 18.375 11.8324V19.3324C18.375 19.9077 17.9086 20.3741 17.3333 20.3741H10.6667C10.0914 20.3741 9.625 19.9077 9.625 19.3324V11.8324ZM12.2917 13.1663C12.6369 13.1663 12.9167 13.4461 12.9167 13.7913V18.3746C12.9167 18.7198 12.6369 18.9996 12.2917 18.9996C11.9465 18.9996 11.6667 18.7198 11.6667 18.3746V13.7913C11.6667 13.4461 11.9465 13.1663 12.2917 13.1663ZM15.0833 13.7913C15.0833 13.4461 15.3631 13.1663 15.7083 13.1663C16.0535 13.1663 16.3333 13.4461 16.3333 13.7913V18.3746C16.3333 18.7198 16.0535 18.9996 15.7083 18.9996C15.3631 18.9996 15.0833 18.7198 15.0833 18.3746V13.7913Z"
                                fill="#31353C"
                              />
                            </svg>
                            <p className="underline">{t("user.remove")}</p>
                          </button>
                        </div>
                      </div>
                      <div className="w-[20%] flex items-end justify-end">
                        <div className="text-[12px] leading-[16px] text-[#31353c]">
                          <span className="text-[14px] leading-[18px] font-bold">
                            {item?.offer_price * getQuantityById(item.id)} AED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Items;
