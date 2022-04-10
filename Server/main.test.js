const testMain = require('./tests');

test('GIVE ME TEST', () => {
    expect(testMain()).toBe("Test");
});