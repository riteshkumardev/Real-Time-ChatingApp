// const mongoose = require("mongoose");
// mongoose.connect(process.env.DB, () => {
//   console.log("Db connected...");
// });
// module.exports = mongoose;
const mongoose = require("mongoose");

// Set the DB environment variable with your MongoDB connection URL
const dbUrl =
  "mongodb+srv://riteshkumar:p3sL4dk19D5mnzsm@cluster0.oxtekcr.mongodb.net/?retryWrites=true&w=majority";
process.env.DB = dbUrl;

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected...");
    // Additional code here
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = mongoose;
