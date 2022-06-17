import { KeyIcon } from "@heroicons/react/outline";
import React from "react";

import PageHeading from "../components/PageHeading";

export const PasswordCracker = () => {
  return (
    <div className="relative flex flex-col h-full justify-center">
      <KeyIcon className="-z-0 absolute opacity-10 w-full p-24 pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Hamming Code" />
      <div className="flex flex-1 p-6">Password Cracker Stuff</div>
    </div>
  );
};

export default PasswordCracker;
