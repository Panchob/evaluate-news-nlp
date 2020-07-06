const { title } = require('../src/client/js/formHandler');
const { summary } = require('../src/client/js/formHandler');
const { mainConcepts } = require('../src/client/js/formHandler');
const { polarity } = require('../src/client/js/formHandler');

const url = 'https://www.nbcnews.com/business/business-news/uber-acquires-food-delivery-competitor-postmates-2-7-billion-n1232572';

test('All fetch function exist', async () => {
  expect(title).toBeDefined();
  expect(summary).toBeDefined();
  expect(mainConcepts).toBeDefined();
  expect(polarity).toBeDefined();
}); 

test('title is correct', async()=>{
    title('http://localhost:8000/extract', {article:url})
   .then(t => 
    expect(t).toBe('Uber acquires food delivery competitor Postmates for $2.7 billion'))
});
