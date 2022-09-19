/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { SparklesIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import PageHeading from "../components/PageHeading";
import { decodeMessage, encodeMessage } from "../lib/Steganocoder";

const Steganography = () => {
  const [{ hiddenMessage, publicMessage, encodedMessage }, setEncodingState] =
    useState({
      hiddenMessage: "",
      publicMessage: "",
      encodedMessage: "",
    });

  const [{ messageToDecode, decodedMessage }, setDecodingState] = useState({
    messageToDecode: "",
    decodedMessage: "",
  });

  const encode = () => {
    setEncodingState((prev) => ({
      ...prev,
      encodedMessage: encodeMessage(prev.hiddenMessage, prev.publicMessage),
    }));
  };

  const decode = () => {
    setDecodingState((prev) => ({
      ...prev,
      decodedMessage: decodeMessage(prev.messageToDecode),
    }));
  };

  const textAreaClasses =
    "text-base mt-1 appearance-none rounded bg-white inner-shadow resize-none border border-gray-400 py-2 px-4 w-full";
  return (
    <div className="relative flex flex-col h-full justify-center">
      <SparklesIcon className="-z-0 absolute opacity-10 w-full p-24 pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />

      <PageHeading title="Steganography" />
      <div className="flex flex-1 p-6 z-10">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-1">
            <h2 className="font-bold bg-indigo-400 text-white rounded-md p-4">
              Encode
            </h2>
            <div>
              <label htmlFor="hiddenMessage" className="text-sm mt-4 block">
                Hidden Message
              </label>
              <textarea
                onChange={(e) =>
                  setEncodingState((prev) => ({
                    ...prev,
                    hiddenMessage: e.target.value,
                  }))
                }
                value={hiddenMessage}
                id="hiddenMessage"
                name="hiddenMessage"
                className={textAreaClasses}
                placeholder="Write the message you want to hide"
              />
              <label htmlFor="publicMessage" className="text-sm mt-4 block">
                Public Message
              </label>
              <textarea
                onChange={(e) =>
                  setEncodingState((prev) => ({
                    ...prev,
                    publicMessage: e.target.value,
                  }))
                }
                id="publicMessage"
                name="publicMessage"
                className={textAreaClasses}
                placeholder="The message you want to be visible to the public"
              />
              <div className="text-center">
                <button
                  className="mx-auto mt-5 px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
                  onClick={encode}
                >
                  Encode
                </button>
              </div>
              <label htmlFor="encodedMessage" className="text-sm mt-4 block">
                Encoded Message
              </label>
              <textarea
                id="encodedMessage"
                name="encodedMessage"
                className={textAreaClasses}
                placeholder="The encoded message will appear here"
                readOnly
                value={encodedMessage}
              />
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold bg-indigo-400 text-white rounded-md p-4">
              Decode
            </h2>
            <div>
              <label htmlFor="messageToDecode" className="text-sm mt-4 block">
                Message to Decode
              </label>
              <textarea
                id="messageToDecode"
                name="messageToDecode"
                className={textAreaClasses}
                placeholder="Enter an encoded message to decode"
                onChange={(e) =>
                  setDecodingState((prev) => ({
                    ...prev,
                    messageToDecode: e.target.value,
                  }))
                }
                value={messageToDecode}
              />
              <label htmlFor="decodedMessage" className="text-sm mt-4 block">
                Decoded Message
              </label>
              <textarea
                id="decodedMessage"
                name="decodedMessage"
                className={textAreaClasses}
                placeholder="The decoded message will appear here"
                readOnly
                value={decodedMessage}
              />
              <div className="text-center">
                <button
                  className="mx-auto mt-5 px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
                  onClick={decode}
                >
                  Decode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steganography;
