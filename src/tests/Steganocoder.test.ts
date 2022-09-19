/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import { decodeMessage, encodeMessage, rc4 } from "../lib/Steganocoder";

describe('The Steganocoder', () => {

    test('Can Encode Messages', async () => {
        expect(await encodeMessage("secret1", "public1")).toMatch("public1﻿​﻿​﻿​﻿‌﻿‌﻿​﻿​﻿﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿​﻿﻿​﻿​﻿‌﻿‌﻿‌﻿​﻿​﻿﻿​﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿​﻿﻿​﻿​﻿​﻿‌﻿​﻿‌﻿‌﻿﻿​﻿​﻿‌﻿‌﻿‌﻿​ ");
    });

    test('Cannot Decode Messages', async () => {
        expect(await decodeMessage("public1﻿​﻿​﻿​﻿‌﻿‌﻿​﻿​﻿﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿​﻿﻿​﻿​﻿‌﻿‌﻿‌﻿​﻿​﻿﻿​﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿﻿​﻿​﻿‌﻿‌﻿​﻿‌﻿​﻿﻿​﻿​﻿​﻿‌﻿​﻿‌﻿‌﻿﻿​﻿​﻿‌﻿‌﻿‌﻿​ ")).toMatch("secret1");
    });

    test('Can Encrypt to RC4', async () => {
        expect(await rc4("secret", encodeMessage("", "asd"))).toMatch("E¶ﻣ¢");
    });

    test('Can Decrypt from RC4', async () => {
        expect(await rc4("secret", "E¶ﻣ¢")).toMatch(encodeMessage("", "asd"));
    });

});
