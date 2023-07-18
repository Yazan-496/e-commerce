import React, { useEffect, useState } from "react";
import ContactInformation from "../components/ContactInformation";
import ShippingMethod from "../components/ShippingMethod";
import PaymentType from "../components/PaymentType";
import Coupon from "../components/Coupon";
import ShoppingBag from "../components/ShoppingBag";

const Body = ({ shippingCart, itemsInCart }) => {
  return (
    <section className="payment-method-info w-full">
      <div className="payment-method-info-left w-[50%]">
        <ContactInformation />
        <ShippingMethod />
        <PaymentType />
      </div>
      <div className="payment-method-info-right w-[50%]">
        <Coupon />
        <ShoppingBag />
      </div>
    </section>
  );
};
export default Body;
