const express = require('express');
const morgan = require('morgan');
const app = express();

const apps = require('./play-store.js');


app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  const {
    sort,
    genres
  } = req.query;

  let results = [...apps];

  if (sort) {
    if (!(sort === 'Rating') && !(sort === 'App')) {
      res.status(400).send('You got it wrong');
    } else if (sort) {
      results.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });

    }
  }

  if (genres) {
    const validGenres = [
      'Action', 
      'Puzzle',
      'Stategy',
      'Casual',
      'Arcade' ,
      'Card',
    ];
    if (!validGenres.includes(genres)) {
      res.status(400).send('must list genre');
    } else {
      results = results.filter(app => {
        return app['Genres'].includes(genres);
      });
    }
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});