const errorHandler = (err, req, res, next) => {
  console.log(err);

  // Mongoose bad object id
  if (err.name === 'CastError')
    return res.status(400).send({ error: 'malformed id' });

  // Mongoose duplicate key
  // if (err.code === 11000) {
  //   console.log(err);
  //   return res.status(400).send({ error: 'Duplicate field value' });
  // }

  // Mongoose validaton errors
  if (err.name === 'ValidationError') {
    // console.log(err);
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(' ');
    return res.status(400).json({ error: message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  }

  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
