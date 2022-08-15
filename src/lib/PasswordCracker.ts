/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

// Maximum Length of Password That Can Be Tested. 
// Longer strings will take a very long time to test.
const maxLength = 4;

const alphanumerics = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let dictionary: string[];

export interface CrackerValidationResult {
    success: boolean;
    input: string;
    test: string;
    timeElapsed: string;
    attackMode: AttackMode;
}

export enum AttackMode {
    BruteForce = "BruteForce",
    Dictionary = "Dictionary"
}

/**
 * Go through the alphanumeric character list and try each one as the next character in the password.
 * 
 */
const bruteforcer = async (input: string, result: CrackerValidationResult, test: string = ""): Promise<void> => {
    if (!result.input) {
        result.input = input;
    }
    result.test = test;

    for (let i = 0; i < alphanumerics.length; i++) {
        if (input !== test && test.length < maxLength && !result.success) {
            bruteforcer(input, result, test + alphanumerics[i]);
        } else if (test === input) {
            result.success = true;
            break;
        }
    }
}

/**
 * Load a dictionary from a file containing 10,000 most commonly used passwords
 * and go through each one to find a match.
 */
const dictionaryAttack = async (input: string, result: CrackerValidationResult): Promise<void> => {
    if (!dictionary) {
        const response = await fetch("/dictionary.json");
        dictionary = await response.json();
    }
    for (let i = 0; i < dictionary.length; i++) {
        const word = dictionary[i];
        if (input === word) {
            result.success = true;
            result.test = word;
            break;
        }
    }
}

/**
 * Returns a promise that resolves to a CrackerValidationResult object.
 * 
 * @param password The input string to crack. Must be maximum 4 characters long.
 * @param attackMode The attack mode to use. Can be BruteForce or Dictionary.
 * 
 */
const runCracker = async (password: string, attackMode: AttackMode = AttackMode.BruteForce): Promise<CrackerValidationResult> => {
    const obj = {
        success: false,
        input: password,
        test: "",
        timeElapsed: "",
        attackMode,
    };
    const attackFn = attackMode === AttackMode.BruteForce ? bruteforcer : dictionaryAttack;
    const startTime = performance.now()
    await attackFn(password, obj);
    const endTime = performance.now()
    obj.timeElapsed = (endTime - startTime).toFixed(2) + "ms";
    return obj;
}

export default runCracker;