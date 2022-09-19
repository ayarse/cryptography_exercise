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

/**
 * RC4 Cipher
 * Symmetric key encryption algorithm
 * Derived from: https://gist.github.com/mvcbox/be7a03358a48b345aeff8a501a46a806
 */
export const rc4 = (key: string, str: string): string => {
    const state: number[] = [];
    let result = "";

    // helper function to swap two values in an array
    const swap = (a: number, b: number) => {
        const temp = state[a];
        state[a] = state[b];
        state[b] = temp;
    }

    // initialize the state array
    for (let i = 0; i < 256; i++) {
        state[i] = i;
    }

    // shuffle the state array using the key scheduling algorithm
    for (let i = 0, j = 0; i < 256; i++) {
        j = (j + state[i] + key.charCodeAt(i % key.length)) % 256;
        swap(i, j);
    }

    // generate the keystream using pseudo-random generation algorithm
    for (let y = 0, i = 0, j = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + state[i]) % 256;
        swap(i, j);

        // xor the keystream with the data string
        result += String.fromCharCode(str.charCodeAt(y) ^ state[(state[i] + state[j]) % 256]);
    }

    return result;
};