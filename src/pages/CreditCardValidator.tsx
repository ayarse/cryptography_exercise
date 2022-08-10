/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { CreditCardIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import {
  creditCardValidator,
  ValidationErrorType,
} from "../lib/CreditCardValidator";

import { VisaIcon, AmexIcon, MastercardIcon } from "../icons";
import MessageBox from "../components/MessageBox";

export const CreditCardValidator = () => {
  const [ccNo, setCcNo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [issuer, setIssuer] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers to be input
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setCcNo(event.target.value);
    }
  };

  useEffect(() => {
    if (ccNo.length < 5) {
      setErrorMessage("");
      setSuccess(false);
      setIssuer("");
      return;
    }
    setSuccess(false);
    setIssuer("");
    const validate = creditCardValidator(ccNo);
    if (!validate.valid && validate.error) {
      setErrorMessage(validate.error);
    }
    if (validate.valid && validate.issuer) {
      setSuccess(true);
      setIssuer(validate.issuer);
      setErrorMessage("");
    }
  }, [ccNo]);

  const getIssuerIcon = () => {
    const iconClasses = "-mx-1 -my-0.5 pointer-events-none w-12 inline-block";
    return (
      <>
        <VisaIcon
          className={`${iconClasses} ${issuer !== "Visa" ? "opacity-30" : ""}`}
        />
        <AmexIcon
          className={`${iconClasses} ${
            issuer !== "American Express" ? "opacity-30" : ""
          }`}
        />
        <MastercardIcon
          className={`${iconClasses} mr-1 ${
            issuer !== "Mastercard" ? "opacity-30" : ""
          }`}
        />
      </>
    );
  };

  return (
    <div className="relative flex flex-col justify-center h-full">
      <CreditCardIcon className="-z-0 absolute opacity-10 w-full pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Credit Card Validator" />
      {errorMessage && <MessageBox mode="error" message={errorMessage} />}

      {success && (
        <MessageBox
          mode="success"
          message={`This credit card number is valid. - ${issuer && issuer}`}
        />
      )}
      <div className="z-10 p-6 pb-24 w-2/3 mx-auto flex-1 flex flex-col justify-center">
        <label htmlFor="creditCardNo" className="block my-2">
          Enter a credit card number
        </label>

        <div className="relative">
          <input
            onChange={onChange}
            id="creditCardNo"
            type="text"
            value={ccNo}
            maxLength={16}
            minLength={15}
            className="relative text-base appearance-none rounded bg-white inner-shadow border border-gray-400 py-2 px-4 w-full"
          />
          <div className="absolute top-0 right-0">{getIssuerIcon()}</div>
        </div>
        <div className="p-4 text-center">
          {/* <button
            onClick={validateCreditCard}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
          >
            Validate
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CreditCardValidator;
