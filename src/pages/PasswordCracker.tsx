/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { KeyIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import MessageBox from "../components/MessageBox";

import PageHeading from "../components/PageHeading";
import runCracker, {
  AttackMode,
  CrackerValidationResult,
} from "../lib/PasswordCracker";

export const PasswordCracker = () => {
  const [pwd, setPwd] = useState("");
  const [result, setResult] = useState<CrackerValidationResult>();
  const [attackMode, setAttackMode] = useState<AttackMode>(
    AttackMode.BruteForce
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  };

  const handleClick = async () => {
    runCracker(pwd, attackMode).then((result) => {
      setResult(result);
    });
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === AttackMode.BruteForce)
      setAttackMode(AttackMode.BruteForce);
    if (event.target.value === AttackMode.Dictionary)
      setAttackMode(AttackMode.Dictionary);
  };
  return (
    <div className="relative flex flex-col h-full justify-center">
      <KeyIcon className="-z-0 absolute opacity-10 w-full p-24 pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Password Cracker" />
      {result?.success && (
        <MessageBox
          mode="success"
          message={`Password (${result.test}) was successfully cracked using ${result.attackMode} method in ${result.timeElapsed}`}
        />
      )}
      {result && !result?.success && (
        <MessageBox
          mode="error"
          message={`Failed to crack password using ${result?.attackMode} method. [Time : ${result?.timeElapsed}]`}
        />
      )}
      <div className="flex flex-1 p-6">
        <div className="z-10 p-6 pb-24 w-2/3 mx-auto flex flex-col justify-center">
          {/* <div>{JSON.stringify(result)}</div> */}

          <div className="relative">
            <div
              className="flex gap-x-4 my-4 justify items-center"
              onChange={onChangeValue}
            >
              <p className="font-bold">Select Attack Mode</p>
              <div>
                <input
                  type="radio"
                  id="bruteforce"
                  name="attackMode"
                  value={AttackMode.BruteForce}
                  checked={attackMode === AttackMode.BruteForce}
                />
                <label htmlFor="bruteforce" className="mx-2 cursor-pointer">
                  BruteForce
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="dictionary"
                  name="attackMode"
                  value={AttackMode.Dictionary}
                  checked={attackMode === AttackMode.Dictionary}
                />
                <label htmlFor="dictionary" className="mx-2 cursor-pointer">
                  Dictionary
                </label>
              </div>
            </div>
            <label htmlFor="password" className="block my-2">
              Enter a password to crack
            </label>
            <input
              onChange={onChange}
              value={pwd}
              id="password"
              type="password"
              className="relative text-base appearance-none rounded bg-white inner-shadow border border-gray-400 py-2 px-4 w-full"
            />
          </div>

          <div className="p-4 text-center">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
            >
              Attempt Crack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCracker;
