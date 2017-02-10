import express from 'express';

const app = express();

app.get('/', (req, res) => {
  
});

const server = app.listen(8080, () =>
  console.log(`Server is up and running on port localhost:8080`)
);
