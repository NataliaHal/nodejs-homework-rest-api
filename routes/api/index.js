const express = require('express');

require('dotenv').config();

const connectDB = require('./db/connectDB');

const app = require('../../app');

const { PORT, DB_URI } = process.env;

connectDB(DB_URI);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});


const router = Router();

const contactsRouter = require("./contacts");

router.use("/contacts", contactsRouter);

module.exports = router;