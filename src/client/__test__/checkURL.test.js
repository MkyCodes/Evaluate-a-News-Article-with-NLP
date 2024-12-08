const { checkUrlValidity } = require("../views/js/validateURL");

describe('URL Validation Tests', () => {
    test('should return false for non-URL strings', () => {
        expect(checkUrlValidity("read")).toBe(false);
    });
    
    test('should return false for email addresses', () => {
        expect(checkUrlValidity("mailto:ahmed@gmail.com")).toBe(false);
    });
    
    test('should return true for valid URLs', () => {
        expect(checkUrlValidity("https://www.google.com")).toBe(true);
    });

    test('should return false for empty strings', () => {
        expect(checkUrlValidity("")).toBe(false);
    });
});
