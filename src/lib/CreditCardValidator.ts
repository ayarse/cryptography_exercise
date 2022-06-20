/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
export enum ValidationErrorType {
    NUMBER_LENGTH = 'Card number should be 16 digits for Visa & Mastercard, or 15 digits for AmEx cards.',
    INVALID_CARD_NUMBER = 'Invalid card number.',
    INVALID_AMEX_CARD_NUMBER = 'Invalid American Express card number.',
}

export enum CardIssuers {
    VISA = 'Visa',
    MASTERCARD = 'Mastercard',
    AMEX = 'American Express',
    UNKNOWN = 'Unknown',
}

interface ValidationResult {
    valid: boolean,
    error?: ValidationErrorType,
    issuer?: CardIssuers
}

export const creditCardValidator = (cardNumber: string): ValidationResult => {
    if (cardNumber.length !== 16 && cardNumber.length !== 15) {
        return {
            valid: false,
            error: ValidationErrorType.NUMBER_LENGTH,
        }
    }

    const digits = cardNumber.split('');
    const newDigits = digits
        .slice()
        .reverse()
        .map((digit, index) => (index + 1) % 2 === 0 ? double(digit) : digit);

    const total = newDigits.reduce((acc, digit) => Number(acc) + Number(digit), 0) as number;

    if (total % 10 === 0) {
        return {
            valid: true,
            issuer: getIssuer(cardNumber),
        }
    }

    return {
        valid: false,
        error: cardNumber.length === 15 ? ValidationErrorType.INVALID_AMEX_CARD_NUMBER : ValidationErrorType.INVALID_CARD_NUMBER,
    }
};

function double(number: string) {
    const doubledNumber = (parseInt(number, 10) * 2).toString();
    return doubledNumber.length > 1
        ? Number(doubledNumber[0]) + Number(doubledNumber[1])
        : Number(doubledNumber);
}

function getIssuer(number: string) {
    const issuers = new Map<CardIssuers, RegExp>([
        [CardIssuers.VISA, /^(?:4[0-9]{12}(?:[0-9]{3})?)$/g],
        [CardIssuers.MASTERCARD, /^5[1-5][0-9]{14}$/g],
        [CardIssuers.AMEX, /3[47][0-9]{13}$/g],
    ]);

    let issuer = CardIssuers.UNKNOWN;

    issuers.forEach((issuerRegex, issuerKey) => {
        if (issuerRegex.test(number)) {
            issuer = issuerKey;
        }
    });

    return issuer;
}
