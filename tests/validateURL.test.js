const { validURL } = require('../src/client/js/validateURL')

test('Invalid URL', () => {
    expect(validURL("")).toBe(false);
});

test('Valid URL', () => {
    expect(validURL("http://validURL.com")).toBe(true);
});