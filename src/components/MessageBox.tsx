/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import React from "react";

interface MessageBoxProps {
  message: string;
  mode: "error" | "success";
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, mode }) => {
  return (
    <div
      className={`text-md ${
        mode === "error"
          ? "bg-red-200 p-4 text-red-900"
          : "bg-green-200 p-4 text-green-900"
      }`}
    >
      {message}
    </div>
  );
};

export default MessageBox;
