const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bookRoutes = require("./src/routes/book.routes")
const todosRoutes = require("./src/routes/todos.routes")

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL;

// middleware
app.use(express.json());

const corsOptions = {
  origin: ["http://127.0.0.1:5500","http://127.0.0.1:5500"],  // The front-end URL
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
  credentials: true  // If you need to handle cookies or sessions
};

app.use(cors(corsOptions));
app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api/books", bookRoutes);
app.use("/api/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
