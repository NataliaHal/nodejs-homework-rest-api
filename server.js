// const dotenv = require("dotenv").config();
// const db = require("./routes/api/db");
const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
