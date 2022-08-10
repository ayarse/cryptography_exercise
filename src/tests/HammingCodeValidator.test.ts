/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import * as Validator from '../lib/HammingCodeValidator';

describe('The Hamming Code Validator Can', () => {


    test('Identify Invalid Codes', () => {

        expect(Validator.validateHamming("1011011")).toMatchObject({ valid: false });
        expect(Validator.validateHamming("1011011", Validator.ParityType.ODD)).toMatchObject({ valid: false });

        expect(Validator.validateHamming("1111001")).toMatchObject({ valid: false });
        expect(Validator.validateHamming("1111001", Validator.ParityType.ODD)).toMatchObject({ valid: false });

    });

    test('Identify Valid Codes', () => {

        expect(Validator.validateHamming("1001011")).toMatchObject({ valid: true });
        expect(Validator.validateHamming("1011001", Validator.ParityType.ODD)).toMatchObject({ valid: true });

        expect(Validator.validateHamming("1111000")).toMatchObject({ valid: true });
        expect(Validator.validateHamming("1011001", Validator.ParityType.ODD)).toMatchObject({ valid: true });

    });


    test('Identify Error Positions', () => {

        expect(Validator.validateHamming("1011011")).toMatchObject({ errorPosition: "5" });
        expect(Validator.validateHamming("1011011", Validator.ParityType.ODD)).toMatchObject({ errorPosition: "2" });

        expect(Validator.validateHamming("1111001")).toMatchObject({ errorPosition: "1" });
        expect(Validator.validateHamming("1111001", Validator.ParityType.ODD)).toMatchObject({ errorPosition: "6" });

    });

    test('Generate Correct Codes', () => {

        expect(Validator.validateHamming("1011011")).toMatchObject({ correctCode: "1001011" });
        expect(Validator.validateHamming("1011011", Validator.ParityType.ODD)).toMatchObject({ correctCode: "1011001" });

        expect(Validator.validateHamming("1111001")).toMatchObject({ correctCode: "1111000" });
        expect(Validator.validateHamming("1111001", Validator.ParityType.ODD)).toMatchObject({ correctCode: "1011001" });

    });

})