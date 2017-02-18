import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import validateData from './utils/ValidateData';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());

app.get('/api/links', (req, res) => {
  db.listLinks().then(data => res.send(data));
});

app.post('/api/link', (req, res) => {
  const { errors, isValid } = validateData(req.body);
  if (isValid) {
    db.createLink(req.body)
    .then(data => res.send(data))
    .catch(() => {
      res.status(500).json({
        errors: {
          global: 'Something is wrong here',
        },
      });
    });
  } else {
    res.status(400).json({ errors });
  }
});

app.get('/:id', (req, res) => {
  db.redirectUrl(req.params.id)
  .then((data) => {
    res.redirect(data.url);
  })
  .catch(() => {
    res.status(404).json({
      errors: {
        global: 'Something is wrong here',
      },
    });
  });
});

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: 'Api method not found',
    },
  });
});


const server = app.listen(8080, () =>
  console.log('Server is up and running on port localhost:8080'),
);
