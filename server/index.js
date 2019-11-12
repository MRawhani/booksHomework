const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const bookRoutes = require("./routes/books");
const path = require("path");
mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
    //  const fakeDb = new FakeDb();
      //fakeDb.seedDb();
      console.log("sucsess");
    }
   
  })
  .catch(err => {
    console.log(err);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/books", bookRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Running");
});
