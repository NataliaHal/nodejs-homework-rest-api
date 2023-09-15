const express = require('express');
const logger = require('morgan');
const cors = require('cors');
  



const { PORT, DB_URI } = process.env;

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

// const routes = require("./routes/api/index");

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});




module.exports = app;


