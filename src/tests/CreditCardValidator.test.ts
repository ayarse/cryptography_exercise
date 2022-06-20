/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { creditCardValidator } from '../lib/CreditCardValidator';

describe('The Credit Card Validator Can', () => {

  test('Validate Card Numbers', () => {
    const error = {
      valid: false
    }
    expect(creditCardValidator("453288208560561x")).toMatchObject(error);
    expect(creditCardValidator("4532882085605616x")).toMatchObject(error);
    expect(creditCardValidator("45328820856056xx")).toMatchObject(error);
  });

  test('Validate Card Number Lengths', () => {
    const error = {
      valid: false
    }
    expect(creditCardValidator("4532882085605616")).toMatchObject({ "valid": true });
    expect(creditCardValidator("45328820856056161")).toMatchObject(error);
    expect(creditCardValidator("45328820856056")).toMatchObject(error);
  });

  test('Identify Valid Visa Cards', () => {
    const cards = [
      "4532882085605616",
      "4929703400016142",
      "4532366047069608",
      "4598802931149479",
      "4929215874176898",
      "4521807679921304",
      "4916294536668738",
      "4929835009679860",
      "4024007165971580",
      "4300808248019759",
    ]

    cards.forEach(card => expect(creditCardValidator(card)).toStrictEqual({ "valid": true, "issuer": "Visa" }));
  });

  test('Identify Invalid Visa Cards', () => {
    const cards = [
      "4532882085605611",
      "4929703400016141",
      "4532366047069601",
      "4598802931149471",
      "4929215874176891",
      "4521807679921301",
      "4916294536668731",
      "4929835009679861",
      "4024007165971581",
      "4300808248019751",
    ]

    cards.forEach(card => expect(creditCardValidator(card)).toMatchObject({ "valid": false }));
  });


  test('Identify Valid Amex Cards', () => {
    const cards = [
      "375224260052223",
      "378280109697880",
      "379162245576013",
      "372361570378188",
      "373011718180140",
      "340801038681110",
      "378277567842115",
      "340488637439577",
      "342765645135240",
      "374284469034605",
    ];

    cards.forEach(card => expect(creditCardValidator(card)).toStrictEqual({ "valid": true, "issuer": "American Express" }));
  });


  test('Identify Invalid Amex Cards', () => {
    const cards = [
      "3752242600522211",
      "378280109697881",
      "379162245576011",
      "372361570378181",
      "373011718180141",
      "340801038681111",
      "3782775678421112",
      "340488637439571",
      "342765645135241",
      "3742844690346012",
    ];

    cards.forEach(card => expect(creditCardValidator(card)).toMatchObject({ "valid": false }));
  });

  test('Identify Valid Mastercard Cards', () => {
    const cards = [
      "5555269455364389",
      "5543575689388092",
      "5339180207475428",
      "5203102408065504",
      "5141865998760057",
      "5130457422181986",
      "5314939963371355",
      "5514692610074611",
      "5158627205907800",
      "5169817756989722",
    ];

    cards.forEach(card => expect(creditCardValidator(card)).toStrictEqual({ "valid": true, "issuer": "Mastercard" }));
  });


  test('Identify Invalid Mastercard Cards', () => {
    const cards = [
      "55552694553643891",
      "5543575689388099",
      "5339180207475429",
      "5203102408065509",
      "5141865998760059",
      "5130457422181989",
      "5314939963371359",
      "5514692610074619",
      "5158627205907809",
      "5169817756989729",
    ];

    cards.forEach(card => expect(creditCardValidator(card)).toMatchObject({ "valid": false }));
  });

})