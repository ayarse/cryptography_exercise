/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

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