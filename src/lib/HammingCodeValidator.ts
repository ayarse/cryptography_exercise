/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

export interface HammingValidationResult {
    error: string,
    errorPosition: string,
    correctCode: string,
    valid: boolean
}

export enum ParityType {
    EVEN = "even",
    ODD = "odd"
}

export const validateHamming = (binaryString: string, type: ParityType = ParityType.EVEN): HammingValidationResult => {

    const retVal = {
        error: "",
        errorPosition: "",
        correctCode: "",
        valid: false,
    }

    // Check if the string has only 0s and 1s
    if (!/^[0-1]+$/.test(binaryString)) {
        retVal.error = "Please enter a valid binary string consisting of 0s and 1s only.";
        return retVal;
    }

    // Limit to 7 bit strings only
    if (binaryString.length !== 7) {
        retVal.error = "This app currently only supports 7 bit binary strings.";
        return retVal;
    }

    const errorPosition = getErrorPosition(binaryString, type);

    if (errorPosition === 0) {
        retVal.valid = true;
        return retVal;
    }

    retVal.errorPosition = `${errorPosition}`;
    retVal.correctCode = toggleBit(binaryString, errorPosition);

    return retVal;
};

/**
 * getErrorPosition
 * Find the error position from the 7-bit binary string.
 */
const getErrorPosition = (binaryString: string, type: ParityType) => {

    // Split binary string into bit array
    const bits = binaryString.split("");

    // Identify bit positions
    const P1 = bits[6];
    const P2 = bits[5];
    const D3 = bits[4];
    const P4 = bits[3];
    const D5 = bits[2];
    const D6 = bits[1];
    const D7 = bits[0];


    const p4Bits = `${P4}${D5}${D6}${D7}`;
    const p2Bits = `${P2}${D3}${D6}${D7}`;
    const p1Bits = `${P1}${D3}${D5}${D7}`;

    const finalString =
        getParity(p4Bits, type) + getParity(p2Bits, type) + getParity(p1Bits, type);

    // Get number from the new binary string
    return parseInt(finalString, 2);
};

/**
 * getParity
 * 
 * Even parity − If number of 1s is even, parity bit value is 0. 
 *               If number of 1s is odd, parity bit value is 1.
 * 
 * Odd parity − If number of 1s is even, parity bit value is 1.
 *              If number of 1s is odd, parity bit value is 0. 
 */
const getParity = (str: string, type: ParityType) => {
    const count = str.split("").reduce((acc, current) => {
        if (current === "1") return acc + 1;
        return acc;
    }, 0);

    if (type === ParityType.ODD)
        return evenOrOdd(count) === ParityType.EVEN ? "1" : "0";

    return evenOrOdd(count) === ParityType.EVEN ? "0" : "1";
};

/**
 * evenOrOdd
 * Checks if a given number is even or odd
 */
const evenOrOdd = (num: number) => num % 2 === 0 ? ParityType.EVEN : ParityType.ODD;

/**
 * toggleBit
 * Toggles the bit value at a given position
 */
const toggleBit = (str: string, position: number) => {
    const arr = str.split("");
    const incorrectBit = arr[7 - position];
    const correctBit = Number(incorrectBit) === 1 ? 0 : 1;

    arr[7 - position] = `${correctBit}`;

    return arr.join("");
};
