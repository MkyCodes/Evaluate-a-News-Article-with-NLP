/**
 * @jest-environment jsdom
 */

const { submitHandler } = require("../views/js/submitHandler");

describe('Submit Handler Tests', () => {
    it('should be defined', () => {
        expect(submitHandler).toBeDefined();
    });
});
