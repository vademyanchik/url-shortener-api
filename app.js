import express from 'express';
import * as db from './utils/DataBaseUtils';

const app = express();

db.setUpConnection();

app.get('/links', (req, res) => {
  db.listLinks().then(data => res.send(data));
});

const server = app.listen(8080, () =>
  console.log('Server is up and running on port localhost:8080'),
);
