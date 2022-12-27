import keyIndexFromChar from '..';
  
describe('keyIndexFromChar', () => {
    test('returns the correct index between 0 and 15, when given a valid character', () => {
        validChars.forEach((char, i) =>
            expect(keyIndexFromChar(char)).toEqual(i))
    });

    test('returns the boolean value false when given a invalid character', () => {
        invalidChars.forEach((char) =>
            expect(keyIndexFromChar(char)).toEqual(false));
    });
});

const validChars = [
    'A', 'W', 'S', 'E', 'D', 'F', 'T', 'G',
    'Y', 'H', 'U', 'J', 'K', 'O', 'L', 'P'
];
const invalidChars = [
    'a', 'w', 's', 'e', 'd', 'f', 't', 'g',
    'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p',
];