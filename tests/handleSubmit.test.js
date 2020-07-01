const { handleSubmit } = require('../src/client/js/formHandler')


test('Invalid URL', () => {
    expect(handleSubmit('').toBe(null));
});
