/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import React from "react";

const PageHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="z-10 p-6 flex font-semibold text-gray-600 bg-gray-50">
      {title}
    </h1>
  );
};

export default PageHeading;
