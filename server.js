const app = require("./app");

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

const PORT = process.env.PORT || 8080;

mongoose.connect(DB_URI).then(() => { 
console.log("Connected to database");
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
}).catch((err) => { 
  console.log(err.message);
  process.exit(1);
})