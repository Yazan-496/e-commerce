import React, { useEffect, useState } from "react";
import ContactInformation from "../components/ContactInformation";
import ShippingMethod from "../components/ShippingMethod";
import PaymentType from "../components/PaymentType";
import Coupon from "../components/Coupon";
import ShoppingBag from "../components/ShoppingBag";
import { ArrowSvgUp, SearchSVG } from "../../svgs";

const Body = ({ shippingCart, itemsInCart }) => {
  const [isOpenShoppingBag, setIsOpenShoppingBag] = useState(false);
  const [isOpenCoupon, setIsOpenCoupon] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(true);
  const handleClickShoppingBag = () => {
    setIsOpenShoppingBag(!isOpenShoppingBag);
  };
  const handleClickCoupon = () => {
    setIsOpenCoupon(!isOpenCoupon);
  };
  const handleClickAddress = () => {
    setIsOpenAddress(!isOpenAddress);
  };
  return (
    <section className="w-full">
      <div className="cursor-pointer flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200">
        <p
          className="flex items-center   font-[600]  justify-center"
          onClick={handleClickShoppingBag}
        >
          {!isOpenShoppingBag ? "Show Order Summary" : "Hide Order Summary"}
          <div>
            <ArrowSvgUp rotate={isOpenShoppingBag ? 0 : 180} />
          </div>
        </p>
        <div className="flex flex-col w-[50%]">
          <div className=" w-full flex flex justify-end space-x-2">
            <span className="">Total{/* */}:</span>
            <p className="">$141.31</p>
          </div>
          <div className="w-full flex flex justify-end space-x-2">
            <span className="">Save{/* */}:</span>
            <p className="e">$77.62</p>
          </div>
        </div>
      </div>
      <div
        className={` transition-height duration-300 ${
          isOpenShoppingBag
            ? "h-[350px] overflow-y-auto"
            : "h-0 overflow-hidden"
        }`}
      >
        <ShoppingBag />
      </div>
      <p
        className="cursor-pointer text-xl font-[600] flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200"
        onClick={handleClickAddress}
      >
        Add Address
        <div />
        <div>
          <ArrowSvgUp rotate={isOpenAddress ? 0 : 180} />
        </div>
      </p>
      <div
        className={` transition-height duration-300 ${
          isOpenAddress ? "h-[650px] overflow-y-auto" : "h-0 overflow-hidden"
        }`}
      >
        <ContactInformation />
      </div>
      <ShippingMethod />
      <p
        className="cursor-pointer text-2xl font-[700] flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200"
        onClick={handleClickCoupon}
      >
        Apply Coupon
        <div />
        <div>
          <ArrowSvgUp rotate={isOpenCoupon ? 0 : 180} />
        </div>
      </p>
      <div
        className={` transition-all duration-200 ${
          isOpenCoupon ? "h-[120px] opacity-1" : "h-0 opacity-0"
        }`}
      >
        <Coupon />
      </div>
      <PaymentType />
    </section>
  );
};
export default Body;
