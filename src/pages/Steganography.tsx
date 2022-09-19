/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { SparklesIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import PageHeading from "../components/PageHeading";
import { decodeMessage, encodeMessage, rc4 } from "../lib/Steganocoder";

const Steganography = () => {
  const [
    { hiddenMessage, publicMessage, encodedMessage, encryptionKey },
    setEncodingState,
  ] = useState({
    encryptionKey: "",
    hiddenMessage: "",
    publicMessage: "",
    encodedMessage: "",
  });

  const [
    { messageToDecode, decodedMessage, decodedSecret, decryptionKey },
    setDecodingState,
  ] = useState({
    decryptionKey: "",
    messageToDecode: "",
    decodedMessage: "",
    decodedSecret: "",
  });

  const updateStateValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStateFn: (arg: any) => void
  ) => {
    setStateFn((prev: Record<string, string>) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const updateEncodingValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => updateStateValue(event, setEncodingState);
  const updateDecodingValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => updateStateValue(event, setDecodingState);

  const encode = () => {
    setEncodingState((prev) => ({
      ...prev,
      encodedMessage: rc4(
        encryptionKey,
        encodeMessage(prev.hiddenMessage, prev.publicMessage)
      ),
    }));
  };

  const decode = () => {
    setDecodingState((prev) => ({
      ...prev,
      decodedSecret: decodeMessage(rc4(decryptionKey, prev.messageToDecode)),
      decodedMessage: rc4(decryptionKey, prev.messageToDecode),
    }));
  };

  const textAreaClasses =
    "text-base mt-1 appearance-none rounded bg-white inner-shadow resize-none border border-gray-400 py-2 px-4 w-full";
  return (
    <div className="relative flex flex-col h-full justify-center">
      <SparklesIcon className="-z-0 absolute opacity-10 w-full p-24 pointer-events-none stroke-indigo-300 scale-75 -rotate-12 translate-x-80" />

      <PageHeading title="Steganography" />
      <div className="flex flex-1 p-6 z-10">
        <div className="grid grid-cols-2 gap-x-16 w-full">
          <div className="col-span-1">
            <h2 className="font-bold bg-indigo-400 text-white rounded-md p-4">
              Encrypt
            </h2>
            <div>
              <label htmlFor="encryptionkey" className="text-sm mt-4 block">
                Encryption Key
              </label>
              <input
                type="text"
                className={textAreaClasses}
                value={encryptionKey}
                onChange={updateEncodingValue}
                name="encryptionkey"
                id="encryptionKey"
              />
              <label htmlFor="hiddenMessage" className="text-sm mt-4 block">
                Hidden Message
              </label>
              <textarea
                onChange={updateEncodingValue}
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
                onChange={updateEncodingValue}
                id="publicMessage"
                name="publicMessage"
                className={textAreaClasses}
                placeholder="The message you want to be visible to the public"
                value={publicMessage}
              />
              <div className="text-center">
                <button
                  className="mx-auto mt-5 px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
                  onClick={encode}
                >
                  Encrypt
                </button>
              </div>
              <label htmlFor="encodedMessage" className="text-sm mt-4 block">
                Encrypted Message
              </label>
              <textarea
                id="encodedMessage"
                name="encodedMessage"
                className={textAreaClasses}
                placeholder="The encrypted message will appear here"
                readOnly
                value={encodedMessage}
              />
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold bg-indigo-400 text-white rounded-md p-4">
              Decrypt
            </h2>
            <div>
              <label htmlFor="decryptionkey" className="text-sm mt-4 block">
                Decryption Key
              </label>
              <input
                type="text"
                className={textAreaClasses}
                name="decryptionKey"
                id="decryptionKey"
                value={decryptionKey}
                onChange={updateDecodingValue}
              />
              <label htmlFor="messageToDecode" className="text-sm mt-4 block">
                Message to Decrypt
              </label>
              <textarea
                id="messageToDecode"
                name="messageToDecode"
                className={textAreaClasses}
                placeholder="Enter an encrypted ciphertext to decrypt"
                onChange={updateDecodingValue}
                value={messageToDecode}
              />
              <div className="text-center">
                <button
                  className="mx-auto mt-5 px-6 py-3 bg-indigo-500 hover:bg-indigo-800 transition-colors rounded-md text-white"
                  onClick={decode}
                >
                  Decrypt
                </button>
              </div>
              <label htmlFor="decodedMessage" className="text-sm mt-4 block">
                Decoded Public Message
              </label>
              <textarea
                id="decodedMessage"
                name="decodedMessage"
                className={textAreaClasses}
                placeholder="The decoded public message will appear here"
                readOnly
                value={decodedMessage}
              />
              <label htmlFor="decodedSecret" className="text-sm mt-4 block">
                Decoded Hidden Message
              </label>
              <textarea
                id="decodedSecret"
                name="decodedSecret"
                className={textAreaClasses}
                placeholder="The decoded hidden message will appear here"
                readOnly
                value={decodedSecret}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steganography;
