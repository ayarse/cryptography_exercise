/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */


import runCracker, {
    AttackMode
} from "../lib/PasswordCracker";

describe('The Password Cracker', () => {

    test('Can Bruteforce Short Passwords', async () => {
        expect(await runCracker("asdf", AttackMode.BruteForce)).toMatchObject({ success: true });
    });
    test('Cannot Bruteforce Long Passwords', async () => {
        expect(await runCracker("asdfg", AttackMode.BruteForce)).toMatchObject({ success: false });
    });

});
