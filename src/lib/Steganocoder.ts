/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

enum Unicodes {
    ZeroWidthSpace = "\u200B",
    ZeroWidthNonJoiner = "\u200C",
    ZeroWidthJoiner = "\u200D",
    ZeroWidthNoBreakSpace = "\uFEFF"
}

/**
 * Convert text to the binary values of their
 * character codes
 */
const text2Binary = (text: string) =>
    text
        .split("")
        .map((char: string) => char
            .charCodeAt(0)
            .toString(2))
        .join(" ");

/**
 * Convert binary strings into characters
 */
const binary2Text = (binary: string) =>
    binary
        .split(" ")
        .map((str: string) => String
            .fromCharCode(parseInt(str, 2)))
        .join("");


/**
 * Converts characters to binary and then replaces the
 * ones, zeroes, and spaces with ZeroWidth characters
 */
const text2ZeroWidth = (text: string): string => {
    return text2Binary(text)
        .split("")
        .map((binaryNum: string) => {
            const num = parseInt(binaryNum, 10);
            if (num === 1) return Unicodes.ZeroWidthSpace;
            if (num === 0) return Unicodes.ZeroWidthNonJoiner;
            return "";
        })
        .join(Unicodes.ZeroWidthNoBreakSpace);
};

/**
 * Replace ZeroWidth characters with ones, zeroes, and spaces
 * and convert the resulting binary to text
 */
const zeroWidth2Text = (hiddenString: string): string => {
    return binary2Text(hiddenString.split(Unicodes.ZeroWidthNoBreakSpace)
        .map((char: string) => {
            if (char === Unicodes.ZeroWidthSpace) return "1";
            if (char === Unicodes.ZeroWidthNonJoiner) return "0";
            return " ";
        })
        .join(""));
};

/**
 * Hides the hiddenMessage within the publicMessage
 * after converting the hiddenMessage to zero width characters
*/
export const encodeMessage = (hiddenMessage: string, publicMessage: string): string => {
    const arr = publicMessage.split(" ");
    const secret = text2ZeroWidth(hiddenMessage);
    const encodedMessage = arr[0] +
        Unicodes.ZeroWidthNoBreakSpace +
        secret + " " +
        arr.slice(1)
            .join(" ");

    return encodedMessage;
}

/**
 * Extracts the hidden message by reversing the steps from encode
 * to obtain the first word of the public message then converting
 * the zero width characters back to binary and then to text
 */
export const decodeMessage = (message: string): string => {
    const firstWord = message.split(" ")[0];
    const secret = firstWord
        .split(Unicodes.ZeroWidthNoBreakSpace)
        .slice(1)
        .join(Unicodes.ZeroWidthNoBreakSpace);

    return zeroWidth2Text(secret);
}