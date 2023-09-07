require('dotenv').config();

const express = require('express');

const connectDB = require('./db/connectDB');

const app = require('../../app');

const { PORT, DB_URI } = process.env;

connectDB(DB_URI);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

const router = express.Router();

const contactsRouter = require("./contacts");

router.use("/contacts", contactsRouter);

module.exports = router;