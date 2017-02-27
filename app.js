import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from './utils/DataBaseUtils';
import validateLinksData from './utils/validations/validateLinksData';
import validateUsersData from './utils/validations/validateUsersData';
import { jwtSecret } from './etc/config.json';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
  validateUsersData(req.body).then(({ errors, isValid }) => {
    if (isValid) {
      db.createUser(req.body)
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
});

app.post('/api/auth', (req, res) => {
  db.authUser(req.body)
    .then((user) => {
      if (user.length) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          const token = jwt.sign({
            id: user[0]._id,
            username: user[0].username,
          }, jwtSecret);
          res.json({ token });
        } else {
          res.status(401).json({ errors: { global: 'Invalid Credentials' } });
        }
      } else {
        res.status(401).json({ errors: { global: 'Invalid Credentials' } });
      }
    })
    .catch(() => {
      res.status(500).json({
        errors: {
          global: 'Something is wrong here',
        },
      });
    });
});

app.get('/api/links', (req, res) => {
  db.listLinks()
  .then(data => res.send(data))
  .catch(() => {
    res.status(404).json({
      errors: {
        global: 'Something is wrong here',
      },
    });
  });
});

app.get('/api/links/:id', (req, res) => {
  db.getLink(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch(() => {
    res.status(404).json({
      errors: {
        global: 'Something is wrong here',
      },
    });
  });
});

app.post('/api/link', (req, res) => {
  const { errors, isValid } = validateLinksData(req.body);
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

app.put('/api/links/:id', (req, res) => {
  const { errors, isValid } = validateLinksData(req.body);
  if (isValid) {
    db.updateLink(req.body, req.params.id)
    .then((data) => {
      res.send(data);
    })
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

app.delete('/api/links/:id', (req, res) => {
  db.deleteLink(req.params.id)
  .then(() => res.send({}))
  .catch(() => {
    res.status(500).json({
      errors: {
        global: 'Something is wrong here',
      },
    });
  });
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
