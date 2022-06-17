/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { PuzzleIcon } from "@heroicons/react/outline";
import React from "react";

import PageHeading from "../components/PageHeading";

export const HammingCode = () => {
  return (
    <div className="relative flex flex-col h-full justify-center">
      <PuzzleIcon className="-z-0 absolute p-24 top-0 opacity-10 w-full pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />
      <PageHeading title="Hamming Code" />
      <div className="flex flex-1 p-6">Hamming Code Stuff</div>
    </div>
  );
};

export default HammingCode;
