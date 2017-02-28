import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../etc/config.json';

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.status(401).json({
          errors: { global: 'Failed to authenticate' },
        });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      errors: { global: 'No token auth' },
    });
  }
};
