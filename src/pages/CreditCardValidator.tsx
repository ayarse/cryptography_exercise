import React from "react";

export const CreditCardValidator = () => {
  return (
    <div>
      <label htmlFor="creditCardNo">Credit Card Number </label>
      <input
        id="creditCardNo"
        type="text"
        className="text-base rounded border border-gray-400 py-2 px-4"
      />
    </div>
  );
};

export default CreditCardValidator;
