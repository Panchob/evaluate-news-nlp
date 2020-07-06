# Evaluate news with natural language processing

This simple page take an URL as is only input. The URL must be a link to an article or a blog. After submitting, the following information will be extracted:

1. The title of the article
2. A summary of the article or blog
3. The polarity (negative, positive or neutral tone)
4. All present concepts

## Hosting

This application is currently being hosted on Heroku at this [location](https://evaluate-news-article.herokuapp.com).

## Dependencies

To run locally you must first have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) installed.

Then, in the root directory run:

```bash
npm install
```

```bash
npm run build prod
```

```bash
npm start
```

The application will then run on port [8000](http://localhost:8000/) 

## Testing

Some tests have been written with Jest. To run then simply input the following command in the root folder:

```bash
npm test
```

To test the endpoints a file is provided in the *test* folder to import to [postman](https://www.postman.com/).
