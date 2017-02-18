import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import validateData from './utils/ValidateData';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());

app.get('/links', (req, res) => {
  db.listLinks().then(data => res.send(data));
});

app.post('/link', (req, res) => {
  const { errors, isValid } = validateData(req.body);
  if (isValid) {
    db.createLink(req.body).then(data => res.send(data));
  } else {
    res.status(400).json({ errors });
  }
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
