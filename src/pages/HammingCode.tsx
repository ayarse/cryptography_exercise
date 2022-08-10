/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { PuzzleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import MessageBox from "../components/MessageBox";

import PageHeading from "../components/PageHeading";
import {
  HammingValidationResult,
  validateHamming,
} from "../lib/HammingCodeValidator";

export const HammingCode = () => {
  const [binaryInput, setBinaryInput] = useState("");
  const [validate, setValidate] = useState<HammingValidationResult>(
    {} as HammingValidationResult
  );

  const handleClick = () => {
    setValidate(validateHamming(binaryInput));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only 0 and 1 to be input
    const re = /^[0-1]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setBinaryInput(event.target.value);
    }
  };

  return (
    <div className="relative flex flex-col h-full justify-center">
      <PuzzleIcon className="-z-0 absolute p-24 top-0 opacity-10 w-full pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Hamming Code" />
      {validate.correctCode && validate.errorPosition && (
        <MessageBox
          mode="success"
          message={`An error was found at position ${validate.errorPosition}, the
        correct code is : ${validate.correctCode}`}
        />
      )}
      {validate.error && (
        <MessageBox mode="error" message={`${validate.error}`} />
      )}
      {validate.valid && (
        <MessageBox
          mode="success"
          message={`Looks like this code has no errors`}
        />
      )}
      <div className="flex flex-1 p-6">
        <div className="z-10 p-6 pb-24 w-2/3 mx-auto flex flex-col justify-center">
          <label htmlFor="hammingCodeInput" className="block my-2">
            Enter a 7-bit binary string
          </label>

          <div className="relative">
            <input
              onChange={onChange}
              value={binaryInput}
              maxLength={7}
              minLength={7}
              id="hammingCodeInput"
              type="text"
              className="relative text-base appearance-none rounded bg-white inner-shadow border border-gray-400 py-2 px-4 w-full"
            />
          </div>
          <div className="p-4 text-center">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HammingCode;
