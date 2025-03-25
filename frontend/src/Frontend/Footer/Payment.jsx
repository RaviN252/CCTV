import React from 'react';
import { FaCreditCard, FaWallet, FaHandHoldingUsd, FaHeadset } from 'react-icons/fa';
import './pay.css';

const PaymentOptions = () => {
  return (
    <div className="payment-options">
      <div className="option">
        <FaCreditCard className="icon" />
        <span>Credit/Debit Card</span>
      </div>
      <div className="option">
        <FaHandHoldingUsd className="icon" />
        <span>NetBanking</span>
      </div>
      <div className="option">
        <FaWallet className="icon" />
        <span>Wallet</span>
      </div>
      <div className="option">
        <FaHeadset className="icon" />
        <span>Get Support From OnePlus</span>
      </div>
    </div>
  );
};

export default PaymentOptions;