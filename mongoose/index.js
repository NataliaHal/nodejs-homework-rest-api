const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const { MONGODB_URI } = process.env;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

app.use(bodyParser.json());

const contactsRouter = require("./src/routes/contacts");
app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
