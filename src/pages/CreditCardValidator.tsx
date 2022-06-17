/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { CreditCardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import PageHeading from "../components/PageHeading";

export const CreditCardValidator = () => {
  const [ccNo, setCcNo] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers to be input
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setCcNo(event.target.value);
    }
  };

  const validateCreditCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: implement validation
  };

  return (
    <div className="relative flex flex-col justify-center h-full">
      <CreditCardIcon className="-z-0 absolute opacity-10 w-full pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Credit Card Validator" />
      <div className="z-10 p-6 pb-24 w-2/3 mx-auto flex-1 flex flex-col justify-center">
        <label htmlFor="creditCardNo" className="block my-2">
          Enter a credit card number
        </label>
        <input
          onChange={onChange}
          id="creditCardNo"
          type="text"
          defaultValue={ccNo}
          value={ccNo}
          maxLength={16}
          minLength={16}
          className="text-base appearance-none rounded bg-white inner-shadow border border-gray-400 py-2 px-4 w-full"
        />
        <div className="p-4 text-center">
          <button
            onClick={validateCreditCard}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
          >
            Validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardValidator;
