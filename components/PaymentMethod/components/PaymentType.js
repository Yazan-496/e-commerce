import ShippingMethod from "./ShippingMethod";
import React from "react";

const PaymentType = () => {
  return (
    <div id="payment__list__wrapper" className="indexstyle-sc-1x1njrq-0 OlrHu">
      <div className="indexstyle-sc-172cmbz-0 kmQwZW">
        <div className="pay-title">
          <div className="pay-title-left">
            <span className="pay-panpal-step notranslate">3</span>
            <p className="pay-name">Payment type</p>
          </div>
          <div className="pay-title-right" />
        </div>
        <div className="pay-panpel-content">
          <div className="content-info-pc disabled">
            <div className="indexstyle-sc-1dhgsks-0 hyYLQV">
              <div className="indexstylepc-xeg0r6-0 guQywE">
                <div className="payment-radio-list">
                  <div className="no-combined-payment ">
                    <label className="">
                      <input
                        data-collect-click='{"event_id":"change-pay-method","payment_method":"Credit / Debit Card","combinepay":""}'
                        data-statis='{"ec":"change-pay-method","co":"Credit / Debit Card"}'
                        type="radio"
                        defaultValue="creditcard"
                      />
                      <div className="main-info">
                        <div className="main-info-content">
                          <div className="main-info-price">
                            <img
                              alt="creditcard"
                              src="/checkout-static/images/pc_icon_card.png"
                            />
                          </div>
                          <div className="main-info-title">
                            <span className="first">Credit / Debit Card</span>
                          </div>
                        </div>
                        <div className="main-info-creditcard">
                          <span className="card-img">
                            <img
                              alt=""
                              src="/image/catalog/activity/s4AQRk7keQg1PL8z6basUcXfrWo3FTTPLoADK8zQ.png"
                            />
                          </span>
                          <span className="card-img">
                            <img
                              alt=""
                              src="/image/catalog/activity/CFSmeEi9CnuQj0Nzawwx34UBJ0IauGezE0eMPbbE.png"
                            />
                          </span>
                          <span className="card-img">
                            <img
                              alt=""
                              src="/image/catalog/activity/GY54JpUUeoNdwJthb4lwKhOmM0BGPArBRnMuqBBt.png"
                            />
                          </span>
                          <span className="card-img">
                            <img
                              alt=""
                              src="/image/catalog/activity/r61jbmFv4GzJKO727HLVoERwMj2aaINIrVxPT8hK.png"
                            />
                          </span>
                          <span className="card-img">
                            <img
                              alt=""
                              src="/image/catalog/activity/LYx30ZWHHSFHucQXFeKSs4gigEAQ5diX4WgKaijH.png"
                            />
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="no-combined-payment ">
                    <label className="">
                      <input
                        data-collect-click='{"event_id":"change-pay-method","payment_method":"PayPal","combinepay":""}'
                        data-statis='{"ec":"change-pay-method","co":"PayPal"}'
                        type="radio"
                        defaultValue="paypal"
                      />
                      <div className="main-info">
                        <div className="main-info-content">
                          <div className="main-info-price">
                            <span className="card-img">
                              <img
                                alt=""
                                src="/image/catalog/activity/EpzeDfnhOHEuSiwe5JGSMn7AOr4PACWfCOPvdpnK.png"
                              />
                            </span>
                          </div>
                          <div className="main-info-title">
                            <span className="first">PayPal</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="no-combined-payment ">
                    <label className="">
                      <input
                        data-collect-click='{"event_id":"change-pay-method","payment_method":"Google Pay","combinepay":""}'
                        data-statis='{"ec":"change-pay-method","co":"Google Pay"}'
                        type="radio"
                        defaultValue="paywithgoogle"
                      />
                      <div className="main-info">
                        <div className="main-info-content">
                          <div className="main-info-price">
                            <span className="card-img">
                              <img
                                alt=""
                                src="/image/catalog/activity/o7WntEy9UAhmILksY3i6e4TxAov2Ly06JhwNS5Rm.png"
                              />
                            </span>
                          </div>
                          <div className="main-info-title">
                            <span className="first">Google Pay</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentType;
