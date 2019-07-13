import validate from 'validate.js';
import authentication from '../helpers/Authenticator';

export const isSignedIn = (req, res, next) => {
  const token = req.body.token || req.headers.token;

  if (validate.isEmpty(token)) return res.status(401).send({ status: 'error', error: 'Unauthorized: Please login!' });
  try {
    const decodedToken = authentication.decode(token);
    const { id, isAdmin } = decodedToken;


    if (id) {
      const data = {
        id,
        isAdmin,
      };
      req.data = data;

      return next();
    }
  } catch (err) {
    return res.status(401).send({
      status: 'error',
      error: 'Unauthorized',
    });
  }

  return res.status(401).send({
    status: 'error',
    error: 'Unauthorized',
  });
};

export const isAdmin = (req, res, next) => {
  const { isAdmin: admin } = req.data;
  if (admin) return next();
  return res.status(401).send({
    status: 'error',
    error: "Unauthorized: You don't have the permission to perform this operation",
  });
};
